import { Task } from "../models/Task";
import { TaskStatus } from "../types/TaskTypes";

class TaskDataDTO {
  public id: number;
  public title: string;
  public content: string;
  public status: TaskStatus;
  
  constructor (task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.content = task.content;
    this.status = task.status;
  }
}

export default TaskDataDTO;