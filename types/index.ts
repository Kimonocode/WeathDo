import { Dispatch, SetStateAction } from "react";
import { Task } from "./interfaces/Task";

export type PriorityProps = {
    task:Task
    onSetTask:Dispatch<SetStateAction<Task>>
    onSetPriorityOpen:Dispatch<SetStateAction<boolean>>
}

export type ReminderProps = {
    task:Task
    onSetTask:Dispatch<SetStateAction<Task>>
    onSetRemindersIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type DatePickerProps = {
    task:Task,
    onSetTask: Dispatch<SetStateAction<Task>>,
    onSetShowCalendar: Dispatch<SetStateAction<boolean>>
    onSetDateTitle:Dispatch<SetStateAction<string>>
}

export type DaysPickerProps = {
    date: Date,
    onSetTitle: React.Dispatch<React.SetStateAction<string>>
    onSetDateSelected:React.Dispatch<React.SetStateAction<number>>
};

export type RootStackParamList = {
    Home: undefined
    CreateTask:{
        dateTitle:string
        dateSelected:number
    }
}