import { View } from "react-native";
import React from "react";
import { TaskType } from "../types/TaskType";
import { Checkbox, Text, useTheme } from "react-native-paper";
import { SIZES } from "../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";

interface TaskItemProps {
  task: TaskType;
  onComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: SIZES.medium,
        margin: SIZES.xSmall,
        borderRadius: SIZES.small,
        backgroundColor: theme.colors.secondaryContainer,
      }}
      onTouchEnd={() => {
        onComplete(task.id);
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox status={task.isCompleted ? "checked" : "unchecked"} />
        <Text
          style={{
            fontSize: SIZES.medium,
            textDecorationLine: task.isCompleted ? "line-through" : "none",
          }}
        >
          {task.getTaskContent()}
        </Text>
      </View>
      <View
        onTouchEnd={() => {
          onDelete(task.id);
        }}
      >
        <MaterialIcons name="delete" size={20} color={theme.colors.error} />
      </View>
    </View>
  );
};

export default TaskItem;
