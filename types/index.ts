import { Dispatch, SetStateAction } from "react";
import { Task } from "./interfaces/Task";

export type RootStackParamList = {
    Home: undefined
    CreateTask:{
        dateTitle:string
        dateSelected:number
    }
}