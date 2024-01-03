import { TaskInterface } from "./TaskInterface"

export default interface StoredTaskInterface {
  key:string,
  id:string|number,
  data: TaskInterface
}