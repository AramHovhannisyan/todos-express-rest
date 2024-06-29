import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';

/**
 * Authentication controller
 */
class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    const { usernameOrEmail, password } = res.locals;

    try {
      // Check if user exists
      const user = await AuthService.loginUser(usernameOrEmail, password);

      // Generate token
      const tokens = await TokenService.generateAndSave(user);

      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true });
      
      return res.status(200).json({
        status: 'success',
        data: {
          user,
          ...tokens,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;
  
      await AuthService.logoutUser(refreshToken);
      res.clearCookie('refreshToken');
  
      return res.status(205).send();
    } catch (error) {
      next(error);
    }
  }

  static refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Getting new tokens
      const refreshToken = req.cookies.refreshToken;
      const user = await AuthService.refreshUserToken(refreshToken);
  
      // Generate tokens and save to cookie
      const tokens = await TokenService.generateAndSave(user);
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true });
  
      return res.status(200).json({
        status: 'success',
        data: {
          user,
          ...tokens,
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
