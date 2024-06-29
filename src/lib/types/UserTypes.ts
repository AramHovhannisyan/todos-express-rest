import { Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>