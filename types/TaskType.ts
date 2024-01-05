export type TaskType = {
    id: number;
    taskContent: string;
    isCompleted: boolean;
    updateTaskContent(newContent: string): void;
    getTaskContent(): string;
    markCompleted(status: boolean): void;
  };