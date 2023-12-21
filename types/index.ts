import { Dispatch, SetStateAction } from "react";

export type RootStackParamList = {
    Home: undefined
    CreateTask:{
        dateTitle:string
        dateSelected:number
    }
}