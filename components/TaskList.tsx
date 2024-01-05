import { ScrollView } from "react-native";
import React from "react";
import TaskItem from "./TaskItem";
import {
  TasksActionKind,
  useTasks,
  useTasksDispatch,
} from "../context/TasksContext";

const TaskList = () => {
  const tasks = useTasks();
  const tasksDispatch = useTasksDispatch();
  const handleOnComplete = (taskId: number) => {
    tasksDispatch({
      type: TasksActionKind.TOGGLE_TASK,
      payload: taskId,
    });
  };
  const handleOnDelete = (taskId: number) => {
    tasksDispatch({
      type: TasksActionKind.DELETE_TASK,
      payload: taskId,
    });
  };
  return (
    <ScrollView>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={handleOnComplete}
          onDelete={handleOnDelete}
        />
      ))}
    </ScrollView>
  );
};

export default TaskList;
