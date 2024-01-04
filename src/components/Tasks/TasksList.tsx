import { TouchableOpacity, Animated } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Theme from "../../../config/Theme";
import TaskItem from "./TaskItem";
import { useState } from "react";
import { toast } from "../../../funcs/toast";
import { TaskInterface } from "../../models/Task/TaskInterface";
import Task from "../../models/Task/Task";

type Props = {
  tasks: TaskInterface[];
  onTaskIsDestroyed: (id: string | number) => void;
};

const TaskList: React.FC<Props> = ({ tasks, onTaskIsDestroyed }) => {
  const [taskSwiped, setTaskSwiped] = useState(0);
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [
      { nativeEvent: { translationX: translateX } }
    ],
    { useNativeDriver: true }
  );

  const onRelease = (event: { nativeEvent: {
    translationX: number 
} }) => {
    if (event.nativeEvent.translationX < -60) {
      // Swipe action detected, you can trigger any action here
      Animated.timing(translateX, {
        toValue: -60,
        duration: 200,
        useNativeDriver: true
      }).start();
    } else {
      // Reset to initial position
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  };

  const handleDestroy = async (id: string | number) => {
    await Task.destroy(id.toString());
    onTaskIsDestroyed(id.toString());
  };

  return tasks.map((task, index) =>
    <PanGestureHandler
      key={index}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={e => {
        setTaskSwiped(index);
        onRelease(e);
      }}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          transform: [
            { translateX: index === taskSwiped ? translateX : 0 },
            { translateY: 0}
          ]
        }}
      >
        <TaskItem task={task} />
        <TouchableOpacity
          onPress={() => handleDestroy(task.id)}
          style={{
            width: 60,
            height: 110,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Theme.red
          }}
        >
          <Ionicons name="trash-outline" size={24} color={Theme.white} />
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default TaskList;
