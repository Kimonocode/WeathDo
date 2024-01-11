import { FlatList } from "react-native";
import TaskItem from "./TaskItem";
import { TaskInterface } from "../../models/Task/TaskInterface";
import { useState, useCallback } from "react";
import useFetchTasks from "../../hooks/fetchers/useFetchTasks";

type Props = {
  tasks: TaskInterface[];
  dateSelected:number;
  onTaskIsDestroy: (id: string | number ) => void
};

const TaskList: React.FC<Props> = ({ tasks, dateSelected, onTaskIsDestroy }) => {

  const { getTasks } = useFetchTasks();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(
    () => {
      setRefreshing(true);
      getTasks(dateSelected);
      const animation = setTimeout(() => {
        setRefreshing(false);
        clearTimeout(animation);
      }, 2000);
    },
    [dateSelected]
  );

  return <FlatList 
    data={tasks}
    keyExtractor={item => item.id.toString()}
    renderItem={({item}) => <TaskItem task={item} onDestroy={onTaskIsDestroy}/>}
    showsVerticalScrollIndicator={false}
    onRefresh={onRefresh}
    refreshing={refreshing}
  />
};

export default TaskList;
