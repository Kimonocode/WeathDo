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