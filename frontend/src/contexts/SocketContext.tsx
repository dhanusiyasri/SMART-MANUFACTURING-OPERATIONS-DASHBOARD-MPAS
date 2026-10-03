import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { APP_CONFIG } from '../config/app.config.js';

export interface ISocketContext {
  socket: Socket | null;
  isConnected: boolean;
  subscribeToRoom: (room: string) => void;
  unsubscribeFromRoom: (room: string) => void;
}

export const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Disabled autoConnect until Socket.IO server is initialized on backend
    const socketInstance = io(APP_CONFIG.SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 0
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const subscribeToRoom = (room: string) => {
    if (socket && isConnected) {
      socket.emit('subscribe:line', room);
    }
  };

  const unsubscribeFromRoom = (room: string) => {
    if (socket && isConnected) {
      socket.emit('unsubscribe:line', room);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        subscribeToRoom,
        unsubscribeFromRoom
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
