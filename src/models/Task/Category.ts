import { CategoryInterface } from "./CategoryInterface";
import { taskCategories } from "../../storage/data/tasks/categories";

export default class TaskCategory {

  public static getCategories():CategoryInterface[] {
    return taskCategories;
  }

  public static findById(v: number): CategoryInterface|null {
    const category = taskCategories.filter(row => row.id === v);
    if(category[0]){
      return category[0];
    }
    return null;
  }

  public static findBy(v: string): CategoryInterface|null {
    const category = taskCategories.filter(row => row.title === v);
    if(category[0]){
      return category[0];
    }
    return null;
  }
}