import { Stack } from "expo-router";
import { TasksProvider } from "../context/TasksContext";
import { PaperProvider } from "react-native-paper";

export default function HomeLayout() {
  return (
    <TasksProvider>
      <PaperProvider>
        <Stack />
      </PaperProvider>
    </TasksProvider>
  );
}
