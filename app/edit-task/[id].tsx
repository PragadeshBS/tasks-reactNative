import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, useTheme, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import {
  TasksActionKind,
  useTasks,
  useTasksDispatch,
} from "../../context/TasksContext";

export default function Page() {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();
  const tasksDispatch = useTasksDispatch();
  const tasks = useTasks();
  const [taskTitle, setTaskTitle] = useState("");
  const handleAddTask = () => {
    tasksDispatch({
      type: TasksActionKind.UPDATE_TASK,
      payload: {
        id: Number(id),
        taskContent: taskTitle,
      },
    });
    setTaskTitle("");
    router.back();
  };
  useEffect(() => {
    const task = tasks.find((task) => task.id === Number(id));
    if (task) {
      setTaskTitle(task.taskContent);
    } else {
      router.back();
    }
  }, [tasks, id]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Stack.Screen
        options={{
          title: "Edit Task",
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
          Update
        </Button>
      </View>
    </SafeAreaView>
  );
}
