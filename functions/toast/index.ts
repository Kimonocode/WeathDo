import { ToastAndroid } from "react-native"

const toast = (message: string, duration:number = 3000 ) => ToastAndroid.show(message, duration);

export { toast };
