import AppError from "../lib/errorHandling/AppError";
import { User } from "../lib/models/User";

/**
 * Insert user into DB
 * Throw error on duplicate email or username
 */
class UserService {
  static async createOne(username: string, email: string, password: string) {
    try {
      const user = await User.create({
        username,
        email,
        password
      });
  
      return user;
    } catch (error: any) {
      let errMsg = '';
      let errCode = 500;

      if (error?.original?.errno === 1062) {
        errMsg = 'User with provided username or email already exists';
        errCode = 409;
      } else {
        console.error("error:", error);
      }
      
      throw new AppError(errMsg, errCode);
    }
  }

  static async getAll() {
    const users = await User.findAll();

    return users;
  }
}

export default UserService;
