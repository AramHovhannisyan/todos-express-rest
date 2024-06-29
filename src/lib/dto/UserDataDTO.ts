import { User } from "../models/User";

class UserDataDTO {
  public id: number;
  public username: string;
  public email: string;
  
  constructor (task: User) {
    this.id = task.id;
    this.username = task.username;
    this.email = task.email;
  }
}

export default UserDataDTO;