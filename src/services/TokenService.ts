import jwt from 'jsonwebtoken';
import config from '../lib/config/config';
import TokenRepository from '../repositories/TokenRepository';
import UserDataDTO from '../lib/dto/UserDataDTO';

/**
 * Service to interact with JWT token
 */
class TokenService {
  /**
   * Generate tokens and save refreshToken to DB
   */
  static async generateAndSave(user: UserDataDTO) {
    const { id, username, email } = user;

    const accessToken = await jwt.sign({ id, username, email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn} );
    const refreshToken = await jwt.sign({ id, username, email }, config.jwt.refresh, { expiresIn: config.jwt.refreshExpiresIn} );

     // Save RefreshToken For User 
    await TokenRepository.upsert(user, refreshToken);

    return { accessToken, refreshToken };
  }

  /**
   * Remove refreshToken from DB
   */
  static async remove(refreshToken: string) {
    const removed = await TokenRepository.delete(refreshToken);
    
    return removed;
  }

  /**
   * Validate accessToken
   */
  static async validateAccessToken(token: string) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      return null;
    }
  }

  /**
   * Validate refreshToken
   */
  static async validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, config.jwt.refresh);
    } catch (error) {
      return null;
    }
  }

  /**
   * Get token data by refreshToken
   */
  static async get(refreshToken: string) {
    const token = TokenRepository.get(refreshToken);
    
    return token;
  }
}

export default TokenService;
