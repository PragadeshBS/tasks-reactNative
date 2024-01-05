import { View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskList from "../components/TaskList";
import { useTheme, FAB } from "react-native-paper";

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
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
