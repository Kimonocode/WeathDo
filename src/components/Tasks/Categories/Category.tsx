import { TouchableOpacity, Text, View, StyleSheet } from "react-native"
import IconCategory from "./IconCategory"
import Theme from "../../../../config/Theme"
import { capitalize, truncate } from "../../../../funcs/strings"
import Spacing from "../../../../config/Spacing"
import { TaskInterface } from "../../../models/Task/TaskInterface"
import { Dispatch, SetStateAction } from "react"

type Props = {
  title:string,
  color:string,
  onSetCategory: Dispatch<React.SetStateAction<boolean>>
  task: TaskInterface;
  onSetTask: Dispatch<SetStateAction<TaskInterface>>;
}

const TaskCategoryItem:React.FC<Props> = ({title, color, onSetCategory, task, onSetTask}) => {

  return <TouchableOpacity 
    style={styles.item}
    onPress={() => {
      onSetTask({...task, category:title});
      onSetCategory(false);
    }}
    >
    <IconCategory category={title} color={color} size={24}/>
    <Text style={styles.title}>{capitalize(title.length > 7 ? truncate(title, 7) + '..' : title)}</Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  item:{
    backgroundColor:Theme.darkSecondary,
    width:60,
    height:60,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:8,
    marginBottom:Spacing,
    elevation:10
  },
  title:{
    color:Theme.text,
    fontSize:Spacing * 1.2,
    marginTop:4
  }
});

export default TaskCategoryItem;