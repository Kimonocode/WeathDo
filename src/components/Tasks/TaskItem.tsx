import { CategoryInterface } from "../../models/Task/CategoryInterface";
import { TaskInterface } from "../../models/Task/TaskInterface";
import TaskCategory from "../../models/Task/Category";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated
} from "react-native";
import Theme from "../../../config/Theme";
import Spacing from "../../../config/Spacing";
import IconCategory from "./Categories/IconCategory";
import { formatDaysInline } from "../../../funcs/dates";
import NotificationIcon from "./Reminders/Notifications/NotificationIcon";
import { capitalize, noPluriel } from "../../../funcs/strings";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Feather } from "@expo/vector-icons";

type Props = {
  task: TaskInterface;
  onDestroy: (id: number | string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onDestroy }) => {
  const taskCategory: CategoryInterface | null = TaskCategory.findByTitle(
    task.category
  );

  const renderRightAction = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const transform = dragX.interpolate({
      inputRange: [-500, -300, -250, 0],
      outputRange: [-350, 0, 20, 350]
    });

    return (
      <Animated.View
        style={{
          backgroundColor: Theme.red,
          width: 300,
          height: 124,
          alignItems: "flex-start",
          justifyContent: "center",
          transform: [{ translateX: transform }]
        }}
      >
        <TouchableOpacity
          onPress={() => onDestroy(task.id.toString())}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: "100%",
            width: "100%"
          }}
        >
          <Feather
            name="trash-2"
            size={24}
            color={Theme.white}
            style={{
              marginLeft: 60
            }}
          />
          <Text
            style={{
              color: Theme.white,
              fontSize: 20,
              textTransform: "capitalize",
              marginLeft: 8
            }}
          >
            supprimer
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightAction}
      containerStyle={styles.container}
    >
      <Text
        style={[styles.title, { marginBottom: task.description ? 0 : Spacing }]}
      >
        {task.title}
      </Text>
      {task.description &&
        <Text style={styles.description}>
          {task.description}
        </Text>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start"
        }}
      >
        {taskCategory &&
          <TouchableOpacity style={styles.icon}>
            <IconCategory
              category={taskCategory.title}
              color={taskCategory.color!}
              size={20}
            />
          </TouchableOpacity>}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            width: "90%"
          }}
        >
          {task.reminders.length >= 1 &&
            task.reminders.map((reminder, index) =>
              <View
                key={index}
                style={{
                  marginLeft: Spacing,
                  borderLeftWidth: 1,
                  borderColor: Theme.darkConstart
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: Spacing
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.icon,
                      {
                        width: 20,
                        height: 20,
                        marginRight: Spacing
                      }
                    ]}
                  >
                    <NotificationIcon
                      type={reminder.notification.type}
                      size={12}
                    />
                  </TouchableOpacity>
                  <Text style={styles.hour}>
                    {reminder.hour}:{reminder.minute}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: Spacing
                  }}
                >
                  {reminder.notification.interval.everyDays &&
                    <Text style={{ color: Theme.text }}>Tous les jours</Text>}
                  {reminder.days.map((day, index) =>
                    <Text key={index} style={{ color: Theme.text }}>
                      {reminder.days.length > 1
                        ? formatDaysInline(day, index, reminder.days, " - ")
                        : capitalize(day)}
                    </Text>
                  )}
                  {reminder.notification.interval.before &&
                    <Text style={{ color: Theme.text }}>
                      {reminder.notification.interval.beforeNumber}{" "}
                      {reminder.notification.interval.beforeNumber > 1
                        ? reminder.notification.interval.beforeInterval
                        : noPluriel(
                            reminder.notification.interval.beforeInterval
                          )}{" "}
                      avant
                    </Text>}
                </View>
              </View>
            )}
        </ScrollView>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.bgDark,
    padding: Spacing * 1.6,
    borderColor: Theme.darkConstart,
    borderBottomWidth: 1,
    minHeight: 124,
    maxHeight: 124
  },
  hour: {
    color: Theme.white
  },
  title: {
    color: Theme.white,
    fontSize: Spacing * 1.8
  },
  description: {
    color: Theme.text,
    marginBottom: Spacing
  },
  icon: {
    backgroundColor: Theme.darkConstart,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  }
});

export default TaskItem;
