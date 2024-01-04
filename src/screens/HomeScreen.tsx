import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
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
import Task from "../models/Task/Task";
import TaskList from "../components/Tasks/TasksList";
import {
  GestureHandlerRootView,
  ScrollView
} from "react-native-gesture-handler";
import { toast } from "../../funcs/toast";
import { taskCategories } from "../storage/data/tasks/categories";
import NoTask3D from "../components/3D/NoTask3D";
import { capitalize } from "../../funcs/strings";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type TaskCategoryScrollBar = {
  dateSelected: number;
  onSetTask: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
};

const getTasksFromStore = async (
  date: number,
  callback: (tasks: TaskInterface[]) => void
) => {
  const tasks = await Task.all(date);
  !!tasks && callback(tasks);
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
        marginBottom: Spacing,
        maxHeight:30
      }}
    >
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
            marginLeft: Spacing,
            padding: 4,
            borderRadius: 4,
            maxHeight: 30
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

  const [tasks, setTasks] = useState<TaskInterface[] | any[]>([]);

  useEffect(
    () => {
      getTasksFromStore(dateSelected, tasks => setTasks([...tasks]));
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
      <GestureHandlerRootView
        style={{
         flex:1,
         alignItems:'center',
         justifyContent:'center'
        }}
      >
       <ScrollView showsVerticalScrollIndicator={false} style={{
       }}>
       <View>
          <View style={{ padding: Spacing }}>
            <Text style={{ fontSize: Spacing * 2.4, color: Theme.white }}>
              {title}
            </Text>
          </View>
        </View>
        <DaysPicker
          date={date}
          days={days}
          onSetTitle={setTitle}
          onSetDateSelected={setDateSelected}
        />
        <View
          style={{
            padding: Spacing
          }}
        >
          <Text
            style={{
              color: Theme.text,
              fontSize: 18
            }}
          >
            Catégories
          </Text>
        </View>
        <TaskCategoryScrollBar
          dateSelected={dateSelected}
          onSetTask={setTasks}
        />
        {tasks.length === 0
          ? <NoTask3D />
          : <View>
              <TaskList
                tasks={tasks}
                onTaskIsDestroyed={id => {
                  toast("Tâche supprimée");
                  navigation.navigate("Home", {
                    date: getUnixTime(new Date())
                  });
                }}
              />
            </View>}
       </ScrollView>
      </GestureHandlerRootView>
      <FloatingButton
        onPress={() => {
          navigation.navigate("CreateTask", {
            dateTitle: title,
            dateSelected: dateSelected,
            date: dateSelected
          });
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
