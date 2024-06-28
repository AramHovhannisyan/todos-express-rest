import AppError from "../lib/errorHandling/AppError";
import { Task, TaskStatus } from "../lib/models/Task";

class TaskService {
  static async getAll() {
    const tasks = await Task.findAll();

    return tasks;
  }

  static async getAllByUserId(userId: number) {
    const tasks = await Task.findAll({ where: { userId } });

    return tasks;
  }

  /**
   * Create author
   * Check for duplicate name
   */
  static async createOne(title: string, content: string, status: TaskStatus, userId: number) {
    try {
      const task = await Task.create({
        title,
        content,
        status,
        userId,
      });
  
      return task;
    } catch (error: any) {
      let errMsg = '';
      let errCode = 500;

      if (error?.original?.errno === 1062) {
        errMsg = 'Author with provided name already exists';
        errCode = 400;
      } else {
        console.error("error:", error);
      }
      
      throw new AppError(errMsg, errCode);
    }
  }

  static async getOne(id: number, userId: number) {
    const task = await Task.findOne({
      where: {
        id,
        userId,
      }
    });

    return task;
  }

  /**
   * Update author
   * Full or partly update
   * Check for unique book title
   * Check if wrong author provided
   */
  static async updateOne(id: number, title: string, content: string, status: TaskStatus, userId: number) {
    try {
      const task = await Task.findOne({
        where: {
          id,
          userId,
        }
      });

      if (!task) {
        return null;
      }
      
      if (title) {
        task.title = title;
      }

      if (content) {
        task.content = content;
      }

      if (status) {
        task.status = status;
      }

      await task.save();

      return task;
    } catch (error: any) {
      let errMsg = 'Internal Server Error';
      let errCode = 500;

      if (error?.original?.errno === 1452) {
        errMsg = 'Author with provided id not found';
        errCode = 404;
      } else if (error?.original?.errno === 1062) {
        errMsg = 'Author with provided name already exists';
        errCode = 400;
      } else {
        console.error("error:", error);
      }
      
      throw new AppError(errMsg, errCode);
    }
  }

  static async deleteOne(id: number, userId: number) {
    const task = await Task.findOne({
      where: {
        id,
        userId,
      }
    });

    if (!task) {
      return null;
    }

    const deleted = await task.destroy();

    return deleted;
  }
}

export default TaskService;
