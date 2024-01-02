import { TaskInterface } from "./TaskInterface";
import storage from "../../storage/stotage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default class Task {

  private static key:string = 'task';

  //Get all Tasks filtered by dates
  static async all(date: number): Promise<TaskInterface[] | null> {
    try {
      const tasks: TaskInterface[] = await storage.getAllDataForKey(Task.key);
      return tasks
        .filter(task => task.date === date)
        .sort(Task.sortByPriorities);
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
        key: Task.key,
        id: uuid,
        data: {
          id: uuid,
          ...task
        }
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async destroy(id: string): Promise<void> {
    return await storage.remove({key:Task.key,id})
  }

  private static sortByPriorities(a: TaskInterface, b: TaskInterface): number {
    if (a.priority < b.priority) {
      return 1;
    }
    if (a.priority > b.priority) {
      return -1;
    }
    return 0;
  }

}