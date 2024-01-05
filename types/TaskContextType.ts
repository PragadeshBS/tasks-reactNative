import { TaskType } from "./TaskType";

export type TaskContextType = {
    todos: TaskType[];
    saveTodo: (todo: TaskType) => void;
    updateTodo: (id: number) => void;
  };