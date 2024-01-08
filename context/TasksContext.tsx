import {
  PropsWithChildren,
  createContext,
  useReducer,
  Dispatch,
  useContext,
} from "react";
import { Task } from "../utils/Task";
import { TaskType } from "../types/TaskType";

const TasksContext = createContext<TaskType[] | null>(null);
const TasksDispatchContext = createContext<Dispatch<TasksAction> | null>(null);

export const TasksProvider = ({ children }: PropsWithChildren<{}>) => {
  const [tasks, dispatch] = useReducer(tasksReducer, [
    new Task(1, "Task 1"),
    new Task(2, "Task 2"),
    new Task(3, "Task 3"),
  ]);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export const useTasksDispatch = () => {
  const context = useContext(TasksDispatchContext);
  if (context === null) {
    throw new Error("useTasksDispatch must be used within a TasksProvider");
  }
  return context;
};

export enum TasksActionKind {
  ADD_TASK = "ADD_TASK",
  TOGGLE_TASK = "TOGGLE_TASK",
  DELETE_TASK = "DELETE_TASK",
  DELETE_TASKS = "DELETE_TASKS",
  UPDATE_TASK = "UPDATE_TASK",
}

interface TasksAction {
  type: TasksActionKind;
  payload: any;
}

const tasksReducer = (state: TaskType[], action: TasksAction) => {
  switch (action.type) {
    case "ADD_TASK": {
      return [...state, new Task(Date.now(), action.payload)];
    }
    case "TOGGLE_TASK": {
      return state.map((task) => {
        if (task.id === action.payload) {
          task.isCompleted
            ? task.markCompleted(false)
            : task.markCompleted(true);
        }
        return task;
      });
    }
    case "UPDATE_TASK": {
      return state.map((task) => {
        if (task.id === action.payload.id) {
          task.taskContent = action.payload.taskContent;
        }
        return task;
      });
    }
    case "DELETE_TASK": {
      return state.filter((task) => task.id !== action.payload);
    }
    case "DELETE_TASKS": {
      return state.filter((task) => !action.payload.includes(task.id));
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
