import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getUnixTime
} from "date-fns";
import { RootStackParamList } from "../../types";
import Spacing from "../../config/Spacing";
import Theme from "../../config/Theme";
import FloatingButton from "../components/Buttons/FloatingButon";
import DaysPicker from "../components/Calendar/DaysPicker";
import { TaskInterface } from "../models/Task/TaskInterface";
import TaskList from "../components/Tasks/TasksList";
import { toast } from "../../funcs/toast";
import { taskCategories } from "../storage/data/tasks/categories";
import NoTask3D from "../components/3D/NoTask3D";
import { capitalize } from "../../funcs/strings";
import { getTasksFromStore } from "../../funcs/storage";
import { MaterialIcons } from "@expo/vector-icons";
import useFetchTasks from "../hooks/fetchers/useFetchTasks";
import { ActivityIndicator } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Task from "../models/Task/Task";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type TaskCategoryScrollBar = {
  dateSelected: number;
  onSetTask: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
};

const TaskCategoryScrollBar: React.FC<TaskCategoryScrollBar> = ({
  dateSelected,
  onSetTask
}) => {
  const tasksCategoriesItems = ["All", ...taskCategories];
  const [taskCategoryItemSelected, setTaskCategoryItemSelected] = useState(0);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginTop: Spacing,
        marginBottom: Spacing * 1.6,
        maxHeight: 26
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: Theme.darkConstart,
          marginRight: Spacing,
          padding: 4,
          borderRadius: 4,
          flexDirection: "row",
          alignItems: "flex-end"
        }}
      >
        <Text
          style={{
            color: Theme.text
          }}
        >
          Tous les filtres
        </Text>
        <MaterialIcons
          name="filter-list"
          color={Theme.text}
          size={16}
          style={{
            marginLeft: 4
          }}
        />
      </TouchableOpacity>
      {tasksCategoriesItems.map((category, index) =>
        <TouchableOpacity
          key={typeof category === "string" ? index : category.id.toString()}
          onPress={() => {
            setTaskCategoryItemSelected(index);
            if (typeof category === "string") {
              return getTasksFromStore(dateSelected, tasks => onSetTask(tasks));
            }
            getTasksFromStore(dateSelected, tasks =>
              onSetTask(
                tasks.filter(task => task.category.match(category.title))
              )
            );
          }}
          style={{
            backgroundColor:
              taskCategoryItemSelected === index
                ? Theme.primary
                : Theme.darkConstart,
            marginRight: Spacing,
            padding: 4,
            borderRadius: 4
          }}
        >
          <Text
            style={{
              color:
                taskCategoryItemSelected === index ? Theme.white : Theme.text
            }}
          >
            {typeof category === "string"
              ? category
              : capitalize(category.title)}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const HomeScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const todayWord = "Aujourd'hui";
  const [title, setTitle] = useState<string>(todayWord);
  const [date] = useState<Date>(new Date());
  const taskRegistered = route.params.date;

  const [dateSelected, setDateSelected] = useState<number>(
    getUnixTime(new Date())
  );

  const days = eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  });

  const {
    tasks,
    setTasks,
    getTasks,
    loading
  } = useFetchTasks();

  useEffect(
    () => {
      getTasks(dateSelected);
    },
    [dateSelected, taskRegistered]
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Theme.bgDark
      }}
    >
      <GestureHandlerRootView style={{flex:1}}>
      <View
        style={{
          paddingLeft: Spacing * 1.6
        }}
      >
        <View>
          <Text
            style={{
              color: Theme.white,
              fontSize: Spacing * 2.4
            }}
          >
            {title}
          </Text>
        </View>
        <DaysPicker
          days={days}
          date={date}
          onSetTitle={setTitle}
          onSetDateSelected={setDateSelected}
        />
        <TaskCategoryScrollBar
          dateSelected={dateSelected}
          onSetTask={setTasks}
        />
      </View>
      {loading
        ? <ActivityIndicator size="large" color={Theme.primary} />
        : tasks.length === 0
          ? <NoTask3D />
          : <TaskList
              tasks={tasks}
              dateSelected={dateSelected}
              onTaskIsDestroy={async (id) => {
                await Task.destroy(id.toString());
                toast('Tâche supprimée')
                navigation.navigate('Home', {date: getUnixTime(new Date)})
              }}
            />}
      <FloatingButton
        onPress={() =>
          navigation.navigate("CreateTask", {
            dateTitle: title,
            dateSelected: dateSelected
          })}
      />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default HomeScreen;
