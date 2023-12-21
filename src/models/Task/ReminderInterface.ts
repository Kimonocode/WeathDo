
interface Interval {
    someDays: boolean,
    everyDays: boolean,
    beforeDay: boolean,
    numberOfDayBefore: string,
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