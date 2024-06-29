import AppError from "../lib/errorHandling/AppError";
import { User } from "../lib/models/User";
import UserRepository from "../repositories/UserRepository";

/**
 * Insert user into DB
 * Throw error on duplicate email or username
 */
class UserService {
  static async createOne(username: string, email: string, password: string) {
    try {
      const userCreationData = {
        username,
        email,
        password
      };

      const user = await UserRepository.create(userCreationData);
  
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

  static async getOneByUsernameOrEmail(usernameOrEmail: string) {
    const user = await UserRepository.getByUsernameOrEmail(usernameOrEmail);

    return user;
  }

  static async getOne(id: number) {
    const user = await UserRepository.get(id);

    return user;
  }
}

export default UserService;
