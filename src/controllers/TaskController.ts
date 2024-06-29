import { NextFunction, Request, Response } from 'express';
import AppError from '../lib/errorHandling/AppError';
import TaskService from '../services/TaskService';
import TaskDataDTO from '../lib/dto/TaskDataDTO';

class TaskController {
  /**
   * Get all tasks for specified user
   * Return DTO
   */
  
  static getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = res.locals.user;
      const tasks = await TaskService.getAllByUserId(id);
      if (!tasks.length) {
        throw new AppError('Nothing was found.', 404);
      }

      const taskDTOs = tasks.map(task => new TaskDataDTO(task));

      return res.status(200).json({
        status: 'success',
        data: {
          tasks: taskDTOs,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get users task by id
   * Return DTO
   */
  static get = async (req: Request, res: Response,  next: NextFunction) => {
    const { id, user } = res.locals;
  
    try {
      const task = await TaskService.getOne(id, user.id);
      if (!task) {
        throw new AppError('Task with the specified ID was not found for current user', 404);
      }

      const taskDTO = new TaskDataDTO(task);

      return res.status(200).json({
        status: 'success',
        data: {
          task: taskDTO,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create task
   * Return DTO
   */
  static create = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, status, user } = res.locals;
    

    try {
      const task = await TaskService.createOne(title, content, status, user.id);
      const taskDTO = new TaskDataDTO(task);
      
      return res.status(200).json({
        status: 'success',
        data: {
          task: taskDTO,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update task by id
   * Return DTO
   */
  static update = async (req: Request, res: Response, next: NextFunction) => {
    const { id, title, content, status, user } = res.locals;

    try {
      const task = await TaskService.updateOne(id, title, content, status, user.id);
      if (!task) {
        throw new AppError('Task with the specified ID was not found for current user', 404);
      }

      const taskDTO = new TaskDataDTO(task);

      return res.status(200).json({
        status: 'success',
        data: {
          task: taskDTO,
        },
      });
    } catch (error) {
      console.error("error:", error);
      next(error);
    }
  };

  /**
   * Delete task by id
   * Return 204 no content
   */
  static delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id, user } = res.locals;
    
    try {
      const deleted = await TaskService.deleteOne(id, user.id);
      if (!deleted) {
        throw new AppError('Task with the specified ID was not found for current user', 404);
      }

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  /**
   * Mark task as completed or pending
   * Endpoint for convenient use, update task endpoint works fine
   */
  static markAs = async (req: Request, res: Response, next: NextFunction) => {
    const { id, status, user } = res.locals;    

    try {
      const task = await TaskService.markOneAs(id, status, user.id);
      if (!task) {
        throw new AppError('Task with the specified ID was not found for current user', 404);
      }

      const taskDTO = new TaskDataDTO(task);

      return res.status(200).json({
        status: 'success',
        data: {
          task: taskDTO,
        },
      });
    } catch (error) {
      console.error("error:", error);
      next(error);
    }
  };
}

export default TaskController;