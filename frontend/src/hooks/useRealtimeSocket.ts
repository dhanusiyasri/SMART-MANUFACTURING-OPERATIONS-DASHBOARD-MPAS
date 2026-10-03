import { useContext, useEffect } from 'react';
import { SocketContext, ISocketContext } from '../contexts/SocketContext.js';

export const useRealtimeSocket = (event?: string, callback?: (data: unknown) => void): ISocketContext => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useRealtimeSocket must be used within a SocketProvider');
  }

  const { socket } = context;

  useEffect(() => {
    if (!socket || !event || !callback) return;

    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [socket, event, callback]);

  return context;
};
