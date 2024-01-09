import { View } from "react-native";
import React from "react";
import { TaskType } from "../types/TaskType";
import { Checkbox, Text } from "react-native-paper";
import { SIZES } from "../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TaskItemProps {
  task: TaskType;
  backgroundColor: string;
  onPress: (taskId: string) => void;
  onLongPress: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onPress,
  onLongPress,
  backgroundColor,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          padding: SIZES.medium,
          margin: SIZES.xSmall,
          borderRadius: SIZES.small,
          backgroundColor: backgroundColor,
        }}
        onLongPress={() => {
          onLongPress(task.id);
        }}
        onPress={() => {
          onPress(task.id);
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
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
