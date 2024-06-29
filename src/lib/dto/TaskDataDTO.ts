import { Task } from "../models/Task";
import { TaskStatus } from "../types/TaskTypes";

class TaskDataDTO {
  public title: string;
  public content: string;
  public status: TaskStatus;
  
  constructor (task: Task) {
    this.title = task.title;
    this.content = task.content;
    this.status = task.status;
  }
}

export default TaskDataDTO;