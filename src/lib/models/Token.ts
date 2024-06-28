import { Association, DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';
import { User } from './User';

interface TokenAttributes {
    id: number;
    refreshToken: string;
    userId: number;
}

type TokenCreationAttributes = Optional<TokenAttributes, 'id'>

export class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
    public id!: number;
    public refreshToken!: string;
    public userId!: number;

    public readonly user?: User;

    public static associations: {
        user: Association<Token, User>;
    };
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
      tableName: 'token',
      sequelize,
  }
);

User.hasOne(Token, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'token',
});

Token.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});
