import { Dispatch, SetStateAction } from "react";

export type PriorityProps = {
    priority:number,
    onSetPriority:Dispatch<SetStateAction<number>>,
    onSetPriorityOpen:Dispatch<SetStateAction<boolean>>,
}

export type DatePickerProps = {
    onSetDate: Dispatch<SetStateAction<string>>,
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