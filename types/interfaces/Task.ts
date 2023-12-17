import { Reminder } from "./Reminder";

export interface Task {
    title:string;
    category:string;
    priority:number;
    description:string | null;
    date: number | Date
    completed:boolean;
    reminders:Reminder[];
    list:string[];
}