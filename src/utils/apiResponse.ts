import { Response } from 'express';

export class ApiResponse {
  public static success<T>(res: Response, data: T, statusCode: number = 200): void {
    res.status(statusCode).json({
      success: true,
      data
    });
  }

  public static error(
    res: Response,
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_SERVER_ERROR',
    details?: unknown
  ): void {
    res.status(statusCode).json({
      success: false,
      error: {
        code,
        message,
        ...(details ? { details } : {})
      }
    });
  }
}
