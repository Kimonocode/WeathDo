import { CategoryInterface } from "../../models/Task/CategoryInterface";
import { TaskInterface } from "../../models/Task/TaskInterface";
import TaskCategory from "../../models/Task/Category";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Theme from "../../../config/Theme";
import Spacing from "../../../config/Spacing";
import IconCategory from "./Categories/IconCategory";
import { formatDaysInline } from "../../../funcs/dates";
import NotificationIcon from "./Reminders/Notifications/NotificationIcon";
import { RadioButton } from "react-native-paper";

type Props = {
  task: TaskInterface;
};

const TaskItem: React.FC<Props> = ({ task }) => {
  const taskCategory: CategoryInterface | null = TaskCategory.findByTitle(
    task.category
  );
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[
            styles.title,
            { marginBottom: task.description ? 0 : Spacing }
          ]}
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
          {task.reminders.map((reminder, index) =>
            <View
              key={index}
              style={{
                marginLeft: Spacing
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
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
                  alignItems: "center"
                }}
              >
                {reminder.days.map((day, index) =>
                  <Text key={index} style={{ color: Theme.text }}>
                    {formatDaysInline(day, index, reminder.days, " - ")}
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
      <View>
        <RadioButton
          color={Theme.primary}
          value={"completed"}
          status={task.completed ? "checked" : "unchecked"}          
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "space-between",
    padding: 8,
    borderBottomColor: Theme.darkConstart,
    borderBottomWidth: 1,
    width:'100%'
  },
  hour: {
    color: Theme.text
  },
  title: {
    color: Theme.white,
    fontSize: Spacing * 1.8
  },
  description: {
    color: Theme.text,
    marginBottom: Spacing,
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
