import { Reminders } from "./Reminders";

export interface Task {
    title:string;
    category:string;
    priority:number;
    description:string | null;
    date: Date | string
    completed:boolean;
    reminders:Reminders[];
    list:string[];
}