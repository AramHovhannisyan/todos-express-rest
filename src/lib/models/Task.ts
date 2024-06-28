
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';
import { User } from './User';

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

interface TaskAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
  status: TaskStatus;
}

type TaskCreationAttributes = Optional<TaskAttributes, 'id'>

export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
  public status!: TaskStatus; 
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: [TaskStatus.PENDING, TaskStatus.COMPLETED],
      defaultValue: TaskStatus.PENDING, // Default value
      allowNull: false,
    },
  },
  {
    tableName: 'task',
    sequelize,
  }
);

Task.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'userId',
  as: 'user',
});

User.hasMany(Task, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'tasks',
});
