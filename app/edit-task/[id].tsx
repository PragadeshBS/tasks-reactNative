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
import firestore from "@react-native-firebase/firestore";

export default function Page() {
  const { id } = useLocalSearchParams();
  if (typeof id !== "string") {
    throw new Error("id is not a string");
  }
  const theme = useTheme();
  const router = useRouter();
  const tasksDispatch = useTasksDispatch();
  const tasks = useTasks();
  const [taskContent, setTaskContent] = useState("");
  const handleUpdateTask = () => {
    firestore()
      .collection("tasks")
      .doc(id)
      .update({
        taskContent,
      })
      .then(() => {
        tasksDispatch({
          type: TasksActionKind.UPDATE_TASK,
          payload: {
            id,
            taskContent,
          },
        });
        setTaskContent("");
        router.back();
      });
  };
  useEffect(() => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTaskContent(task.taskContent);
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
            value={taskContent}
            onChangeText={setTaskContent}
          />
        </KeyboardAvoidingView>
        <Button
          mode="contained"
          style={{
            margin: 16,
          }}
          onPress={handleUpdateTask}
        >
          Update
        </Button>
      </View>
    </SafeAreaView>
  );
}
