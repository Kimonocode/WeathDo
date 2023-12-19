import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getUnixTime
} from "date-fns";
import { RootStackParamList } from "../../types";
import Spacing from "../../config/app/Spacing";
import Theme from "../../config/app/Theme";
import FloatingButton from "../components/Buttons/FloatingButon";
import DaysPicker from "../components/Calendar/DaysPicker";

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
