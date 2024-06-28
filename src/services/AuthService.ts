import { Op } from "sequelize";
import { User } from "../lib/models/User";
import AppError from "../lib/errorHandling/AppError";
import TokenService from "./TokenService";

// Authentication Service
class AuthService {
  // Get user either with username or by email
  static async loginUser(usernameOrEmail: string) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
        ],
      },
    });

    return user;
  }

  /**
 * Logging out by Removing Refresh token from DB
 */
  static async logoutUser(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError(`You are not authorized`, 401);
    }

    const tokenRemoved = await TokenService.remove(refreshToken);

    return tokenRemoved;
  }

  /**
 * Generate new AccessToken and RefreshToken
 * !(typeof userData === 'object') condition is added because ts says .verify may return string
 */
  static async refreshUserToken(refreshToken: string) {    
    if (!refreshToken) {      
      throw new AppError(`You are not authorized`, 401);
    }

    const userData = await TokenService.validateRefreshToken(refreshToken);
    const existingToken = await TokenService.getToken(refreshToken);

    // Validate refresh token, check for it's existence in DB
    if (!userData || !existingToken || !(typeof userData === 'object')) {
      console.log("userData:", userData);
      
      throw new AppError(`You are not authorized`, 401);
    }

    // In case user data have bee changed
    const user = await User.findByPk(userData.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
    // return new UserDto(user);
  }
}

export default AuthService;
