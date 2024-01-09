import { View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskList from "../components/TaskList";
import { useTheme, FAB } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { Task } from "../utils/Task";
import { TasksActionKind, useTasksDispatch } from "../context/TasksContext";

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const tasksCollection = firestore().collection("tasks").get();
  const tasksDispatch = useTasksDispatch();
  tasksCollection.then((querySnapshot) => {
    const fetchedTasks = querySnapshot.docs.map(
      (documentSnapshot) =>
        new Task(documentSnapshot.id, documentSnapshot.data().taskContent)
    );
    tasksDispatch({
      type: TasksActionKind.SET_TASKS,
      payload: fetchedTasks,
    });
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "Tasks",
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer,
          },
          headerTitleStyle: {
            color: theme.colors.onPrimaryContainer,
          },
        }}
      />

      <View style={{ flex: 1 }}>
        <TaskList />
      </View>
      <FAB
        icon="plus"
        style={{
          position: "absolute",
          margin: 32,
          right: 0,
          bottom: 0,
        }}
        onPress={() => {
          router.push("./add-task");
        }}
      />
    </SafeAreaView>
  );
}
