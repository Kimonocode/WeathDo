import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, DimensionValue } from "react-native";
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
import {
  GestureHandlerRootView,
  ScrollView
} from "react-native-gesture-handler";
import { toast } from "../../funcs/toast";
import { taskCategories } from "../storage/data/tasks/categories";
import NoTask3D from "../components/3D/NoTask3D";
import { capitalize } from "../../funcs/strings";
import { getTasksFromStore } from "../../funcs/storage";
import { MaterialIcons } from '@expo/vector-icons';

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
  const [width, setWidth ] = useState<DimensionValue>('90%')
  return (
    <ScrollView
      horizontal
      onScroll={e => e.nativeEvent.contentOffset.x === 0 ? setWidth('90%') : setWidth('80%')}
      showsHorizontalScrollIndicator={false}
      style={{
        marginTop: Spacing,
        marginBottom: Spacing * 2,
        width:width
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: Theme.darkConstart,
          marginLeft: Spacing,
          padding: 4,
          borderRadius: 4,
          flexDirection:'row',
          alignItems:'flex-end'
        }}
      >
        <Text
          style={{
            color: Theme.text
          }}
        >
          Tous les filtres
        </Text>
        <MaterialIcons name="filter-list" color={Theme.text} size={16} style={{
          marginLeft:4
        }}/>
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
            marginLeft: Spacing,
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
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
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
