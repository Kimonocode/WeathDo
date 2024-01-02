import { Dispatch, SetStateAction } from "react";

export type RootStackParamList = {
    Home:{
        date?:number
    }
    CreateTask:{
        dateTitle:string
        dateSelected:number
    }
}