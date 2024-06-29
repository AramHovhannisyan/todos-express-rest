import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import UserService from '../services/UserService';
import TokenService from '../services/TokenService';

/**
 * Save user to DB
 */
class UserController {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = res.locals;
    try {
      // Hash password
      const salt = bcrypt.genSaltSync(5);
      const hashPass = bcrypt.hashSync(password, salt);

      // Insert user
      const user = await UserService.createOne(username, email, hashPass);

      // Generate JWT tokens ans save refresh token
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
}

export default UserController;