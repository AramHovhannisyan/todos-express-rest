import UserDataDTO from '../lib/dto/UserDataDTO';
import { Token } from '../lib/models/Token';


/**
 * Repository to interact with the DB for Model Token
 */
class TokenRepository {
  static async upsert(user: UserDataDTO, refreshToken: string) {
    const oldToken = await Token.findOne({ where: { userId: user.id} });

    if (oldToken) {
      return oldToken.update({ refreshToken });
    }
  
    return await Token.create({ userId: user.id, refreshToken });
  }

  static async get(refreshToken: string) {
    return await Token.findOne({ where: { refreshToken } });
  }

  static async delete(refreshToken: string) {
    return await Token.destroy({ where: { refreshToken  } });
  }
}

export default TokenRepository;