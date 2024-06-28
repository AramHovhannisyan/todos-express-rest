import jwt from 'jsonwebtoken';
import { User } from "../lib/models/User";
import config from '../lib/config/config';
import { Token } from '../lib/models/Token';

/**
 * Service to generate and verify JWT token
 */
class TokenService {
  static async generateAndSave(user: User) {
    const { id, username, email } = user;

    const accessToken = await jwt.sign({ id, username, email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn} );
    const refreshToken = await jwt.sign({ id, username, email }, config.jwt.refresh, { expiresIn: config.jwt.refreshExpiresIn} );

     // Save RefreshToken For User 
    await this.saveToDB(user, refreshToken);

    return { accessToken, refreshToken };
  }

  static async saveToDB(user: User, refreshToken: string) {
    const oldToken = await Token.findOne({ where: { userId: user.id} });

    if (oldToken) {
      return oldToken.update({ refreshToken });
    }
  
    return await Token.create({ userId: user.id, refreshToken });
  }

  static async remove(refreshToken: string) {
    return await Token.destroy({ where: { refreshToken  } });
  }

  static async validateAccessToken(token: string) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      return null;
    }
  }

  static async validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, config.jwt.refresh);
    } catch (error) {
      console.log("NOT VERIFIED:");
      
      return null;
    }
  }

  static async getToken(refreshToken: string) {
    return await Token.findOne({ where: { refreshToken } });
  }
}

export default TokenService;
