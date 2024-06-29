import { Task } from "../lib/models/Task";
import { TaskStatus } from "../lib/types/TaskTypes";

/**
 * Repository to interact with the DB for Model Task
 */
class TaskRepository {
  static async getAll(userId: number) {
    return await Task.findAll({ where: { userId } })
  }

  static async create(title: string, content: string, status: TaskStatus, userId: number) {
    const task = await Task.create({
      title,
      content,
      status,
      userId,
    });

    return task;
  }

  static async get(id: number, userId: number) {
    const task = await Task.findOne({
      where: {
        id,
        userId,
      }
    });

    return task;
  }

  static async update(task: Task) {
    return await task.save();
  }

  static async delete(task: Task) {
    return await task.destroy();
  }
}

export default TaskRepository;