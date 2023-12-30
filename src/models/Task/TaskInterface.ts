import { ReminderInterface } from "./ReminderInterface";

export interface TaskInterface {
    title: string;
    category: string;
    priority: number;
    description: string | null;
    date: number | Date
    completed: boolean;
    reminders: ReminderInterface[];
    list: string[] | null;
}