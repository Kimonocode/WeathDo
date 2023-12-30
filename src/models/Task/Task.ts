import { TaskInterface } from "./TaskInterface";
import storage from "../../storage/stotage";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export default class Task {

  //Get all Tasks filtered by dates
  static async all(date:number): Promise<TaskInterface[] | null> {
    try {
      const tasks:TaskInterface[] = await storage.getAllDataForKey('task');
      return tasks.filter( task => task.date === date);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * Store new Task and return if item is persisted
   * @param task TaskInterface
   * @returns boolean
   */
  static async store(task: TaskInterface): Promise<boolean> {
    try {
      const uuid = uuidv4();
      await storage.save({
        key:'task',
        id:uuid,
        data: {
          id:uuid,
          ...task
        }
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}