
export interface Interval {
    someDays:boolean,
    everyDays:boolean,
    beforeDay:boolean,
    numberOfDayBefore:string,
}

export interface Notification {
    type:string|null
    interval: Interval
}

export interface Reminder {
    hour:string,
    minute:string,
    days:string[],
    notification: Notification
}   