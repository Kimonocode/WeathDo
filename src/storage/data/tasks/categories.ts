import Theme from "../../../../config/Theme";
import { CategoryInterface } from "../../../models/Task/CategoryInterface";

export const taskCategories: CategoryInterface[] = [
  {
    id:1,
    title:'tâche',
    color:Theme.primary
  }, 
  {
    id:2,
    title:'travail',
    color:Theme.yellow
  },
  {
    id:3,
    title:'santé',
    color:Theme.green
  },
  {
    id:4,
    title:'études',
    color:Theme.blue,
  },
  {
    id:5,
    title:'méditation',
    color:Theme.purple
  }
];