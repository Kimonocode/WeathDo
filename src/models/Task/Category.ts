import { CategoryInterface } from "./CategoryInterface";
import { taskCategories } from "../../storage/data/tasks/categories";

export default class TaskCategory {
  /**
   * Get all categories available
   * @returns CategoryInterface[]
   */
  public static getCategories():CategoryInterface[] {
    return taskCategories;
  }

  /**
   * Find one category by id
   * @param id number
   * @returns CategoryInterface|null
   */
  public static findById(id: number): CategoryInterface|null {
    const [category] = taskCategories.filter(row => row.id === id);
    return category ? category : null;
  }

  /**
   * Find one catgeory by title
   * @param title string
   * @returns CategoryInterface|null
   */
  public static findByTitle(title: string): CategoryInterface|null {
    const [category] = taskCategories.filter(row => row.title === title);
    return category ? category : null;
  }
}