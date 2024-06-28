import { Request, Response, NextFunction } from 'express';
import AppError from '../errorHandling/AppError';
import TokenService from '../../services/TokenService';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check for authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError('Unauthorized', 401);
    }

    const authType = authHeader.split(' ')[0];
    const accessToken = authHeader.split(' ')[1];

    // Check for authorization type
    if (authType != 'Bearer') {
      throw new AppError('Wrong authorization type', 401);
    }

    // Check for authorization token existence
    if (!accessToken) {
      throw new AppError('Missing authorization header', 401);
    }

    // Validate JWT token
    const userPayload = await TokenService.validateAccessToken(accessToken);
    if (!userPayload) {
      throw new AppError('Invalid authorization token', 401);
    }

    // Save logged in user payload
    res.locals.user = userPayload;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
