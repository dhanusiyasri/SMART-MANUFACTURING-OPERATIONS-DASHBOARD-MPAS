import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../contexts/ThemeContext.js';
import { NotificationProvider } from '../contexts/NotificationContext.js';
import { SocketProvider } from '../contexts/SocketContext.js';
import { PlantProvider } from '../contexts/PlantContext.js';
import { FilterProvider } from '../contexts/FilterContext.js';
import { DrilldownProvider } from '../contexts/DrilldownContext.js';
import { APP_CONFIG } from '../config/app.config.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: APP_CONFIG.DEFAULT_QUERY_STALE_TIME,
      retry: APP_CONFIG.DEFAULT_QUERY_RETRY_COUNT,
      refetchOnWindowFocus: false
    }
  }
});

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PlantProvider>
          <FilterProvider>
            <DrilldownProvider>
              <NotificationProvider>
                <SocketProvider>{children}</SocketProvider>
              </NotificationProvider>
            </DrilldownProvider>
          </FilterProvider>
        </PlantProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
