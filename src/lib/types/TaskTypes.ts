export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export interface TaskAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
  status: TaskStatus;
}

