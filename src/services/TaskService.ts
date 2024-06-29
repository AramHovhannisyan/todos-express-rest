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
   */
  static async createOne(title: string, content: string, status: TaskStatus, userId: number) {
    try {
      const task = await TaskRepository.create(title, content, status, userId);
  
      return task;
    } catch (error: any) {
      console.error("error:", error);
      
      throw new AppError('Internal Server Error', 500);
    }
  }

  static async getOne(id: number, userId: number) {
    const task = await TaskRepository.get(id, userId);

    return task;
  }

  /**
   * Update task
   * Full or partly update
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
      } else {
        console.error("error:", error);
      }
      
      throw new AppError(errMsg, errCode);
    }
  }

  /**
   * Delete task by pk
   */
  static async deleteOne(id: number, userId: number) {
    const task = await TaskRepository.get(id, userId);

    if (!task) {
      return null;
    }

    const deleted = await TaskRepository.delete(task);

    return deleted;
  }

  /**
   * Update task status only
   * Check if the author is the current user
   */
  static async markOneAs(id: number, status: TaskStatus, userId: number) {
    try {
      const task = await TaskRepository.get(id, userId);

      if (!task) {
        return null;
      }

      if (status) {
        task.status = status;
      }

      const updatedTask = await TaskRepository.update(task)

      return updatedTask;
    } catch (error: any) {
      console.error("error:", error);
          
      throw new AppError('Internal Server Error', 500);
    }
  }
}

export default TaskService;
