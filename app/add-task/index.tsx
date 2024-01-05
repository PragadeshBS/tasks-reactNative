import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, useTheme, TextInput } from "react-native-paper";
import { useState } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { TasksActionKind, useTasksDispatch } from "../../context/TasksContext";

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const tasksDispatch = useTasksDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const handleAddTask = () => {
    tasksDispatch({
      type: TasksActionKind.ADD_TASK,
      payload: taskTitle,
    });
    setTaskTitle("");
    router.back();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Stack.Screen
        options={{
          title: "Add Task",
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer,
          },
          headerTintColor: theme.colors.onPrimaryContainer,
          headerTitleStyle: {
            color: theme.colors.onPrimaryContainer,
          },
        }}
      />
      <View>
        <KeyboardAvoidingView
          style={{
            margin: 16,
          }}
        >
          <TextInput
            label="Task Title"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
        </KeyboardAvoidingView>
        <Button
          mode="contained"
          style={{
            margin: 16,
          }}
          onPress={handleAddTask}
        >
          Add Task
        </Button>
      </View>
    </SafeAreaView>
  );
}
