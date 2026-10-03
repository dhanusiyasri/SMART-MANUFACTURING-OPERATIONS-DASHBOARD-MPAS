import React, { memo, useState } from 'react';
import { AnalyticsCard } from './AnalyticsCard.js';
import { Badge } from '../../../../components/common/Badge.js';
import { useRealtimeSocket } from '../../../../hooks/useRealtimeSocket.js';

export interface FeedItem {
  id: string;
  category: 'ORDER' | 'ERROR' | 'SYNC' | 'FG';
  title: string;
  detail: string;
  timestamp: string;
  badgeText: string;
  badgeVariant: 'green' | 'red' | 'amber' | 'blue';
}

const initialFeedItems: FeedItem[] = [
  {
    id: 'f-1',
    category: 'ORDER',
    title: 'Order PL-94820 Assigned to Line 1',
    detail: 'Material MAT-AL-8820 (Engine Assembly) released to plant HSR-01',
    timestamp: '12:44:12 PM',
    badgeText: 'ZPP_SEQ',
    badgeVariant: 'green'
  },
  {
    id: 'f-2',
    category: 'ERROR',
    title: 'API Timeout on /api/v1/sap/sync_bom',
    detail: 'HTTP 504 Gateway Timeout on Line 2 chassis station',
    timestamp: '12:42:08 PM',
    badgeText: 'ERR_TIMEOUT',
    badgeVariant: 'red'
  },
  {
    id: 'f-3',
    category: 'SYNC',
    title: 'Batch Sync #8492 Complete',
    detail: 'Processed 10,426 sequence plan records in 142ms',
    timestamp: '12:40:00 PM',
    badgeText: 'DATA_FOUND',
    badgeVariant: 'blue'
  },
  {
    id: 'f-4',
    category: 'FG',
    title: 'VIN MB1-AL-4820 Completed',
    detail: 'Movement 101 Goods Receipt posted to SAP_FG',
    timestamp: '12:38:55 PM',
    badgeText: 'FG_RECEIPT',
    badgeVariant: 'green'
  }
];

export interface LiveOperationsFeedProps {
  feedItems?: FeedItem[];
}

export const LiveOperationsFeed: React.FC<LiveOperationsFeedProps> = memo(({ feedItems }) => {
  const [feed, setFeed] = useState<FeedItem[]>(feedItems || initialFeedItems);

  React.useEffect(() => {
    if (feedItems && feedItems.length > 0) {
      setFeed(feedItems);
    }
  }, [feedItems]);

  const { isConnected } = useRealtimeSocket('sap:live_feed_event', (eventData: unknown) => {
    // Append real-time live events to the top of feed dynamically
    if (eventData && typeof eventData === 'object' && 'title' in eventData) {
      const newFeedItem = eventData as FeedItem;
      setFeed((prev) => [newFeedItem, ...prev.slice(0, 9)]);
    }
  });

  return (
    <AnalyticsCard
      title="Live Operations Feed"
      subtitle="Real-time Socket.IO stream across SAP database tables"
      actions={<Badge variant={isConnected ? 'green' : 'blue'}>{isConnected ? 'Live Telemetry' : 'Standby'}</Badge>}
    >
      <div className="space-y-2.5 max-h-[240px] overflow-y-auto pr-1">
        {feed.map((item) => (
          <div key={item.id} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start justify-between text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <Badge variant={item.badgeVariant}>{item.badgeText}</Badge>
                <span className="font-bold text-slate-800">{item.title}</span>
              </div>
              <p className="text-3xs text-slate-500 pl-0.5">{item.detail}</p>
            </div>
            <span className="text-3xs text-slate-400 font-mono shrink-0 ml-2">{item.timestamp}</span>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
});

LiveOperationsFeed.displayName = 'LiveOperationsFeed';
