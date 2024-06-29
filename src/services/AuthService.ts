import bcrypt from 'bcryptjs';
import AppError from "../lib/errorHandling/AppError";
import TokenService from "./TokenService";
import UserService from "./UserService";

// Authentication Service
class AuthService {
  // Get user either with username or by email
  static async loginUser(usernameOrEmail: string, password: string) {
    const user = await UserService.getOneByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw new AppError('User with the provided data was not found.', 404);
    }

    // Validate password
    const isPassCorrect = bcrypt.compareSync(password, user.password);
    if (!isPassCorrect) {
      throw new AppError('Wrong Password', 401);
    }

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
    const existingToken = await TokenService.get(refreshToken);

    // Validate refresh token, check for it's existence in DB
    if (!userData || !existingToken || !(typeof userData === 'object')) {      
      throw new AppError(`You are not authorized`, 401);
    }

    // In case user data have bee changed
    const user = await UserService.getOne(userData.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
    // return new UserDto(user);
  }
}

export default AuthService;
