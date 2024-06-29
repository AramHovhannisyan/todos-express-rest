import { Op } from "sequelize";
import { User } from "../lib/models/User";
import { UserCreationAttributes } from "../lib/types/UserTypes";


/**
 * Repository to interact with the DB for Model Token
 */
class UserRepository {
  static async get(id: number) {
    const user = await User.findByPk(id)

    return user;
  }

  static async getByUsernameOrEmail(usernameOrEmail: string) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
        ],
      },
    });

    return user
  }

  static async create(user: UserCreationAttributes) {
    const newUser = await User.create(user);

    return newUser;
  }
}

export default UserRepository;