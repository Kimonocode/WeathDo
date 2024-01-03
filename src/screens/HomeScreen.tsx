import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
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
import Task from "../models/Task/Task";
import TaskList from "../components/Tasks/TasksList";
import {
  PanGestureHandler,
  GestureDetector,
  Gesture,
  GestureHandlerRootView
} from "react-native-gesture-handler";
import storage from "../storage/stotage";
import { toast } from "../../funcs/toast";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [date, setDate] = useState<Date>(new Date());
  const taskRegistered = route.params.date;

  const [dateSelected, setDateSelected] = useState<number>(
    getUnixTime(new Date())
  );

  const days = eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  });

  const todayWord = "Aujourd'hui";
  const [title, setTitle] = useState<string>(todayWord);

  const [tasks, setTasks] = useState<TaskInterface[] | any[]>([]);

  const getTasksFromStore = async () => {
    const tasks = await Task.all(dateSelected);
    !!tasks && setTasks([...tasks]);
  };

  useEffect(
    () => {
      getTasksFromStore();
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
      <View>
        <View style={{padding:Spacing}}>
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
      {tasks.length === 0
        ? <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../../assets/search.png")}
              style={{
                width: 100,
                height: 100
              }}
            />
            <Text
              style={{
                color: Theme.text,
                fontSize: Spacing * 1.8,
                marginBottom: Spacing
              }}
            >
              C'est un peu vide ici...
            </Text>
            <Text
              style={{
                color: Theme.text,
                fontSize: Spacing * 1.4
              }}
            >
              Commençons par ajouter une tâche
            </Text>
          </View>
        : <GestureHandlerRootView>
          <TaskList 
            tasks={tasks}
            onTaskIsDestroyed={id => {
              toast('Tâche supprimée');
              navigation.navigate('Home', {
                date:dateSelected,
              });
            }}
          />
        </GestureHandlerRootView>
        
        }
      <FloatingButton
        onPress={() => {
          navigation.navigate("CreateTask", {
            dateTitle: title,
            dateSelected: dateSelected,
            date:dateSelected,
          });
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
