
interface Interval {
    someDays: boolean,
    everyDays: boolean,
    before: boolean,
    beforeInterval:string,
    beforeNumber: number,
}

interface Notification {
    type: string | null
    interval: Interval
}

export interface ReminderInterface {
    hour: string,
    minute: string,
    days: string[],
    notification: Notification
}   