export type TaskType = {
    id: string;
    taskContent: string;
    isCompleted: boolean;
    updateTaskContent(newContent: string): void;
    getTaskContent(): string;
    markCompleted(status: boolean): void;
  };