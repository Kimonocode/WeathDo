
export interface Reminders {
    hour:number,
    minute:number,
    days:string[],
    notification:{
        type:'silencieuse' | 'notification' | 'alarme'
        dayBefore:boolean,
        alwaysOn:boolean
    }
}