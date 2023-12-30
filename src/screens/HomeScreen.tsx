import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getUnixTime,
} from "date-fns";
import { RootStackParamList } from "../../types";
import Spacing from "../../config/Spacing";
import Theme from "../../config/Theme";
import FloatingButton from "../components/Buttons/FloatingButon";
import DaysPicker from "../components/Calendar/DaysPicker";
import { TaskInterface } from "../models/Task/TaskInterface";
import Task from "../models/Task/Task";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [date, setDate] = useState<Date>(new Date());
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
    const store = await Task.all(dateSelected);
    if (store !== null) {
      setTasks(store);
    }
  };

  useEffect(
    () => {
      getTasksFromStore();
    },
    [dateSelected]
  );

  console.log(tasks);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: Spacing * 1.2,
        backgroundColor: Theme.bgDark
      }}
    >
      <View>
        <View>
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
            <Text
              style={{
                color: Theme.text,
                fontSize: Spacing * 1.8,
                marginBottom: Spacing
              }}
            >
              Aucune tâche
            </Text>
            <Text
              style={{
                color: Theme.text,
                fontSize: Spacing * 1.4
              }}
            >
              Commencez par ajouter une tâche
            </Text>
          </View>
        : tasks.map(task => {
            return (
              <View key={task.id}>
                <Text
                  style={{
                    color: Theme.white
                  }}
                >
                  {task.title}
                </Text>
              </View>
            );
          })}
      <FloatingButton
        onPress={() => {
          navigation.navigate("CreateTask", {
            dateTitle: title,
            dateSelected: dateSelected
          });
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
