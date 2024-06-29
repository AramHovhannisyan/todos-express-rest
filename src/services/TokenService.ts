import jwt from 'jsonwebtoken';
import { User } from "../lib/models/User";
import config from '../lib/config/config';
import TokenRepository from '../repositories/TokenRepository';

/**
 * Service to generate and verify JWT token
 */
class TokenService {
  static async generateAndSave(user: User) {
    const { id, username, email } = user;

    const accessToken = await jwt.sign({ id, username, email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn} );
    const refreshToken = await jwt.sign({ id, username, email }, config.jwt.refresh, { expiresIn: config.jwt.refreshExpiresIn} );

     // Save RefreshToken For User 
    await TokenRepository.upsert(user, refreshToken);

    return { accessToken, refreshToken };
  }

  static async remove(refreshToken: string) {
    const removed = await TokenRepository.delete(refreshToken);
    
    return removed;
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
      console.info("NOT VERIFIED:");
      
      return null;
    }
  }

  static async get(refreshToken: string) {
    const token = TokenRepository.get(refreshToken);
    
    return token;
  }
}

export default TokenService;
