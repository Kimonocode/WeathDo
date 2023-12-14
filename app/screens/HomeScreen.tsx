import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { eachDayOfInterval, startOfMonth, endOfMonth, format, isSameDay, formatISO } from "date-fns";
import { RootStackParamList, DaysPickerProps } from "../../types";
import Spacing from "../../config/Spacing";
import Theme from "../../config/Theme";
import fr from "date-fns/locale/fr";
import { capitalize } from "../../functions/strings";
import FloatingButton from "../components/Buttons/FloatingButon";

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen:React.FC<ScreenProps> = ({navigation}) => {

    const [date, setDate] = useState<Date>(new Date);
    const [title, setTitle] = useState<string>("Aujourd'hui");

    useEffect(() => {
        const tick = setInterval(() => {
            setDate(new Date);
        }, 5000);
        return () => clearInterval(tick); 
    }, []);
    
    return(
        <SafeAreaView style={{
            flex:1,
            padding: Spacing * 1.2,
            backgroundColor: Theme.bgDark
        }}>
            <View>
                <View>
                    <Text style={{fontSize:Spacing * 2.4, color: Theme.white}}>{title}</Text>
                </View>
            </View>
            <DaysPicker date={date} onDayPressed={setTitle}/>
            <FloatingButton onPress={() => {
                navigation.navigate('CreateTask', {date: title})
            }}/>
        </SafeAreaView>
    );
}

const DaysPicker:React.FC<DaysPickerProps> = ({date, onDayPressed}) => {

    const [activeID, setActiveID] = useState<number|null>(null);
    const [activeCurrentDay, setActiveCurrentDay] = useState<boolean>(true);

    const days = eachDayOfInterval({
        start:startOfMonth(date), 
        end: endOfMonth(date)
    });

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
            marginVertical:20
        }}>
            {
                days.map((day, index) => (
                    <TouchableOpacity key={index} onPress={(e) => {
                        setActiveID(index);
                        setActiveCurrentDay(false);
                        isSameDay(date, day) ?onDayPressed("Aujourd'hui") :onDayPressed(format(day, 'PPP', {locale:fr}));
                    }} style={{
                        backgroundColor:index === activeID || isSameDay(date, day) && activeCurrentDay ? Theme.primary  : Theme.darkSecondary,
                        width:60,
                        height:60,
                        marginRight: 8,
                        borderRadius:16,
                        elevation:10
                    }}>
                        <Text style={{
                            textAlign:'center', 
                            fontSize:Spacing * 1.4,
                            fontWeight:'bold',
                            color:Theme.white,
                            padding: 4
                        }}>
                            {format(day, 'd')}
                        </Text>
                        <Text style={{
                            textAlign:'center',
                            color:index === activeID || isSameDay(date, day) && activeCurrentDay ? Theme.white : Theme.text,
                            backgroundColor:index === activeID || isSameDay(date, day) && activeCurrentDay ? Theme.secondary : Theme.darkConstart,
                            padding:6,
                            borderTopLeftRadius:8,
                            borderTopRightRadius:8,
                            borderBottomLeftRadius:16,
                            borderBottomRightRadius:16,

                        }}>{capitalize(format(day, 'E', {locale:fr}))}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}


export default HomeScreen;