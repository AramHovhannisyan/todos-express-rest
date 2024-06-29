import AppError from "../lib/errorHandling/AppError";
import { TaskStatus } from "../lib/types/TaskTypes";
import TaskRepository from "../repositories/TaskRepository";

class TaskService {
  /**
   * Get all user's tasks
   */
  static async getAllByUserId(userId: number) {
    const tasks = await TaskRepository.getAll(userId);

    return tasks;
  }

  /**
   * Create task
   * Check for duplicate name
   */
  static async createOne(title: string, content: string, status: TaskStatus, userId: number) {
    try {
      const task = await TaskRepository.create(title, content, status, userId);
  
      return task;
    } catch (error: any) {
      let errMsg = '';
      let errCode = 500;

      if (error?.original?.errno === 1062) {
        errMsg = 'Task with provided name already exists';
        errCode = 400;
      } else {
        console.error("error:", error);
      }
      
      throw new AppError(errMsg, errCode);
    }
  }

  static async getOne(id: number, userId: number) {
    const task = await TaskRepository.get(id, userId);

    return task;
  }

  /**
   * Update task
   * Full or partly update
   * Check for unique task title
   * Check if wrong task provided
   */
  static async updateOne(id: number, title: string, content: string, status: TaskStatus, userId: number) {
    try {
      const task = await TaskRepository.get(id, userId);

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

      const updatedTask = await TaskRepository.update(task)

      return updatedTask;
    } catch (error: any) {
      let errMsg = 'Internal Server Error';
      let errCode = 500;

      if (error?.original?.errno === 1452) {
        errMsg = 'Task with provided id not found';
        errCode = 404;
      } else if (error?.original?.errno === 1062) {
        errMsg = 'Task with provided name already exists';
        errCode = 400;
      } else {
        console.error("error:", error);
      }
      
      throw new AppError(errMsg, errCode);
    }
  }

  static async deleteOne(id: number, userId: number) {
    const task = await TaskRepository.get(id, userId);

    if (!task) {
      return null;
    }

    const deleted = await TaskRepository.delete(task);

    return deleted;
  }
}

export default TaskService;
