import { Request, Response, NextFunction } from 'express';
import { AppErrorType } from '../types/ErrorTypes';

/**
 * Custom Error handling Middleware
 * provides message, statusCode
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: AppErrorType, req: Request, res: Response, next: NextFunction) => {
  const { message, statusCode } = err;

  if(!statusCode) {
    res.status(500).json({
      status: 'Fail',
      message: 'Internal server error',
    });
  }
  
  console.error(err);

  res.status(statusCode);
  res.json({
    status: 'Fail',
    message,
  });
};
