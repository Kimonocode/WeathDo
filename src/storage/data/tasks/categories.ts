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
    color:'#fff'
  },
  {
    id:3,
    title:'santé',
    color:null
  },
  {
    id:4,
    title:'études',
    color:null,
  },
  {
    id:5,
    title:'méditation',
    color:null
  }
];