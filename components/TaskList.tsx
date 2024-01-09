import { ScrollView, View, BackHandler } from "react-native";
import { useState, useCallback, useEffect } from "react";
import TaskItem from "./TaskItem";
import {
  TasksActionKind,
  useTasks,
  useTasksDispatch,
} from "../context/TasksContext";
import { useTheme } from "react-native-paper";
import { Link, Stack, useFocusEffect } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";

const TaskList = () => {
  const tasks = useTasks();
  const theme = useTheme();
  const tasksDispatch = useTasksDispatch();
  const [inSelectionMode, setInSelectionMode] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (inSelectionMode) {
          setSelectedTaskIds([]);
          setInSelectionMode(false);
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [inSelectionMode])
  );
  // exit selection mode after coming back from edit screen
  useEffect(() => {
    if (inSelectionMode) {
      setSelectedTaskIds([]);
      setInSelectionMode(false);
    }
  }, [tasks]);
  const handleOnPress = (taskId: string) => {
    if (inSelectionMode) {
      handleOnLongPress(taskId);
      return;
    }
    tasksDispatch({
      type: TasksActionKind.TOGGLE_TASK,
      payload: taskId,
    });
  };
  const handleOnLongPress = (taskId: string) => {
    if (selectedTaskIds.includes(taskId)) {
      if (selectedTaskIds.length === 1) {
        setInSelectionMode(false);
      }
      setSelectedTaskIds(selectedTaskIds.filter((id) => id !== taskId));
      return;
    }
    setSelectedTaskIds([...selectedTaskIds, taskId]);
    setInSelectionMode(true);
  };
  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerTitle:
            selectedTaskIds.length > 0 ? `${selectedTaskIds.length}` : "Tasks",
          headerLeft: () => {
            return (
              inSelectionMode && (
                <View
                  onTouchEnd={() => {
                    setSelectedTaskIds([]);
                    setInSelectionMode(false);
                  }}
                  style={{
                    paddingEnd: 24,
                  }}
                >
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={theme.colors.onPrimaryContainer}
                  />
                </View>
              )
            );
          },
          headerRight: () => {
            return (
              inSelectionMode && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 30,
                  }}
                >
                  <View
                    onTouchEnd={() => {
                      selectedTaskIds.forEach((taskId) =>
                        firestore()
                          .collection("tasks")
                          .doc(taskId)
                          .delete()
                          .then(() => {
                            tasksDispatch({
                              type: TasksActionKind.DELETE_TASK,
                              payload: taskId,
                            });
                          })
                      );
                      setSelectedTaskIds([]);
                      setInSelectionMode(false);
                    }}
                  >
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color={theme.colors.onPrimaryContainer}
                    />
                  </View>
                  {selectedTaskIds.length === 1 && (
                    <View>
                      <Link href={`/edit-task/${selectedTaskIds[0]}`}>
                        <MaterialIcons
                          name="edit"
                          size={24}
                          color={theme.colors.onPrimaryContainer}
                        />
                      </Link>
                    </View>
                  )}
                </View>
              )
            );
          },
        }}
      />
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onPress={handleOnPress}
          onLongPress={handleOnLongPress}
          backgroundColor={
            selectedTaskIds.includes(task.id)
              ? theme.colors.secondaryContainer
              : theme.colors.surface
          }
        />
      ))}
    </ScrollView>
  );
};

export default TaskList;
