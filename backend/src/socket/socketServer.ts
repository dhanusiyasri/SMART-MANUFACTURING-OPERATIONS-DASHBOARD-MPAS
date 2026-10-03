import { Server as HTTPServer } from 'http';
import { logger } from '../config/logger.config.js';

export class SocketServer {
  private static instance: SocketServer;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): SocketServer {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer();
    }
    return SocketServer.instance;
  }

  /**
   * Prepared initialization hook to attach Socket.IO server to HTTP Server when enabled in future
   */
  public initialize(_server: HTTPServer): void {
    if (this.isInitialized) {
      return;
    }
    this.isInitialized = true;
    logger.info(`🔌 SocketServer container initialized with HTTP Server instance (Ready for future Socket.IO attachment).`);
  }

  /**
   * Generic event broadcast interface prepared for future WebSocket integration
   */
  public broadcast<T>(event: string, payload: T): void {
    if (!this.isInitialized) {
      return;
    }
    logger.debug(`[SocketServer Hook] Broadcast event '${event}':`, payload);
  }
}

export const socketServer = SocketServer.getInstance();
