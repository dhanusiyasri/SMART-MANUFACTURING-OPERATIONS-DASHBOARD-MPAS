import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export class SocketManager {
  private static instance: SocketManager;
  private io: SocketIOServer | null = null;

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  /**
   * Initializes Socket.IO with the HTTP Server
   */
  public initialize(server: HTTPServer): SocketIOServer {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: env.CORS_ORIGIN,
        methods: ['GET', 'POST']
      },
      pingInterval: env.SOCKET_PING_INTERVAL_MS,
      pingTimeout: env.SOCKET_PING_TIMEOUT_MS
    });

    this.io.on('connection', (socket: Socket) => {
      logger.info(`🔌 Client connected [Socket ID: ${socket.id}]`);

      // Default join general dashboard room
      socket.join('dashboard:global');

      socket.on('subscribe:line', (lineId: string) => {
        logger.info(`Socket [${socket.id}] joined room: line:${lineId}`);
        socket.join(`line:${lineId}`);
      });

      socket.on('unsubscribe:line', (lineId: string) => {
        logger.info(`Socket [${socket.id}] left room: line:${lineId}`);
        socket.leave(`line:${lineId}`);
      });

      socket.on('ping:client', () => {
        socket.emit('pong:server', { timestamp: new Date().toISOString() });
      });

      socket.on('disconnect', (reason) => {
        logger.info(`🔌 Client disconnected [Socket ID: ${socket.id}] Reason: ${reason}`);
      });
    });

    logger.info('🚀 Socket.IO engine initialized and listening for real-time events');
    return this.io;
  }

  /**
   * Broadcast real-time events to all clients or specific room
   */
  public emitEvent(event: string, payload: any, room?: string): void {
    if (!this.io) {
      logger.warn(`Attempted to emit event '${event}' before Socket.IO was initialized.`);
      return;
    }

    if (room) {
      this.io.to(room).emit(event, payload);
    } else {
      this.io.emit(event, payload);
    }
  }

  /**
   * Broadcast real-time manufacturing metrics update
   */
  public broadcastDashboardUpdate(metrics: any): void {
    this.emitEvent('dashboard:update', {
      timestamp: new Date().toISOString(),
      metrics
    }, 'dashboard:global');
  }

  public getIO(): SocketIOServer | null {
    return this.io;
  }
}

export const socketManager = SocketManager.getInstance();
