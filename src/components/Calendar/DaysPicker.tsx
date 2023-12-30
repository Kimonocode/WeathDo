import { format, getUnixTime, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import Theme from "../../../config/Theme";
import { capitalize } from "../../../funcs/strings";
import Spacing from "../../../config/Spacing";

type Props = {
  days: Date[];
  date: Date;
  onSetTitle: React.Dispatch<React.SetStateAction<string>>;
  onSetDateSelected: React.Dispatch<React.SetStateAction<number>>;
};

const DaysPicker: React.FC<Props> = ({
  date,
  days,
  onSetTitle,
  onSetDateSelected
}) => {
  const [activeID, setActiveID] = useState<number | null>(null);
  const [activeCurrentDay, setActiveCurrentDay] = useState(true);

  const scrollRef = useRef<ScrollView | null>(null);

  const handleDayPressed = (day: Date, index: number) => {
    setActiveID(index);
    setActiveCurrentDay(false);
    isSameDay(date, day)
      ? onSetTitle("Aujourd'hui")
      : onSetTitle(format(day, "PPP", { locale: fr }));
    onSetDateSelected(getUnixTime(day));
  };

  useEffect(() => {
    days.map((day, index) => {
      if (isSameDay(day, new Date())) {
        scrollRef.current!.scrollTo({
          y: 68 * index,
          animated: true
        });
        setActiveCurrentDay(true);
      }
    });
  },[]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginVertical: 20,
        maxHeight:60
      }}
    >
      {days.map((day, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleDayPressed(day, index)}
            style={{
              backgroundColor:
                index === activeID || (isSameDay(date, day) && activeCurrentDay)
                  ? Theme.primary
                  : Theme.darkSecondary,
              width: 60,
              height: 60,
              marginRight: 8,
              borderRadius: 16,
              elevation: 10
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: Spacing * 1.4,
                fontWeight: "bold",
                color: Theme.white,
                padding: 4
              }}
            >
              {format(day, "d")}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color:
                  index === activeID ||
                  (isSameDay(date, day) && activeCurrentDay)
                    ? Theme.white
                    : Theme.text,
                backgroundColor:
                  index === activeID ||
                  (isSameDay(date, day) && activeCurrentDay)
                    ? Theme.secondary
                    : Theme.darkConstart,
                padding: 6,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16
              }}
            >
              {capitalize(format(day, "E", { locale: fr }))}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DaysPicker;
