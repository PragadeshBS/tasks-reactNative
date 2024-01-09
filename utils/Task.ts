import { TaskType } from "../types/TaskType";

export class Task implements TaskType {
    id: string;
    taskContent: string;
    isCompleted: boolean;

    constructor(id: string, taskContent: string, isCompleted = false) {
        this.id = id;
        this.taskContent = taskContent;
        this.isCompleted = isCompleted;
    }

    updateTaskContent(newContent: string) {
        this.taskContent = newContent;
    }

    getTaskContent() {
        return this.taskContent;
    }

    markCompleted(status: boolean) {
        this.isCompleted = status;
    }
}