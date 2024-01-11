import { useState } from "react";
import Task from "../../models/Task/Task";
import { TaskInterface } from "../../models/Task/TaskInterface";

const useFetchTasks = () => {

  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [error, setError] = useState<object | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (date: number) => {
    setLoading(true);
    const tasksFromStore = await Task.all(date, error => {
      if(typeof error === 'object'){
        setLoading(false);
        setSuccess(false);
        setError(error);
      }
    });
    !!tasksFromStore && setTasks(tasksFromStore);
    setLoading(false);
    setSuccess(true);
  };

  return { tasks, setTasks, error, success, loading, getTasks };

};

export default useFetchTasks;