import { StyleSheet, View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { CategoryInterface } from "../../../models/Task/CategoryInterface";
import Theme from "../../../../config/Theme";
import TaskCategoryItem from "./Category";
import Spacing from "../../../../config/Spacing";
import { Dispatch, SetStateAction } from "react";
import { TaskInterface } from "../../../models/Task/TaskInterface";

type Props = {
  categories: CategoryInterface[]
  onSetCategory: React.Dispatch<React.SetStateAction<boolean>>
  task: TaskInterface;
  onSetTask: Dispatch<SetStateAction<TaskInterface>>;
}

const TaskCategories:React.FC<Props> = ({task, onSetTask, categories, onSetCategory}) => {

  return <BlurView tint="dark" intensity={10} style={styles.blurView}>
    <View style={styles.modal}>
      {
        categories.map(category => {
          return <TaskCategoryItem
            task={task}
            onSetTask={onSetTask}
            title={category.title} 
            color={category.color!}
            onSetCategory={onSetCategory} 
          />
        })
      }
    </View>
  </BlurView>

}


const styles = StyleSheet.create({
  blurView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    padding:Spacing,
    width: '90%',
    backgroundColor: Theme.darkConstart,
    borderRadius: 16,
    elevation: 10,
    flexDirection:'row',
    justifyContent: "space-between",
    flexWrap:"wrap",
  },
});

export default TaskCategories;