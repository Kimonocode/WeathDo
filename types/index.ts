import { Dispatch, SetStateAction } from "react";
import { Task } from "./interfaces/Task";

export type PriorityProps = {
    task:Task,
    onSetTask:Dispatch<SetStateAction<Task>>,
    onSetPriorityOpen:Dispatch<SetStateAction<boolean>>,
}

export type ReminderProps = {
    task:Task,
    onSetRemindersIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type DatePickerProps = {
    task:Task,
    onSetTask: Dispatch<SetStateAction<Task>>,
    onSetShowCalendar: Dispatch<SetStateAction<boolean>>
}

export type DaysPickerProps = {
    date: Date,
    onDayPressed: React.Dispatch<React.SetStateAction<string>>
};

export type RootStackParamList = {
    Home: undefined
    CreateTask:{
        date:string
    }
}