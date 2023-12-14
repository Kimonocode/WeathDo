import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatePickerProps, PriorityProps, RootStackParamList } from "../../../types";
import { SafeAreaView, TextInput, Text, View, StyleSheet, TouchableOpacity, Platform, useColorScheme } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Feather, MaterialCommunityIcons, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import Spacing from "../../../config/Spacing";
import Theme from "../../../config/Theme";

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateTask'>;

const CreateTaskScreen:React.FC<ScreenProps> = ({navigation, route}) => {

    const [title, setTitle] = useState<string>("Nom de la tâche");
    const [inputValues, setInputValues] = useState<string>('');
    const [date, setDate] = useState<string>(route.params.date);
    const [ priority, setPriority ] = useState<number>(1);
    const [priorityIsOpen, setPriorityIsOPen] = useState<boolean>(false);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    
    return(
        <SafeAreaView style={{
            flex:1,
            backgroundColor:Theme.bgDark
        }}>
            <View style={{
                padding:Spacing * 1.2
            }}>
                <Text style={{
                fontSize:Spacing * 2,
                color:Theme.white,
            }}>
                {title}
                </Text>
                <View style={{
                    marginVertical:20
                }}>
                <TextInput  
                    value={inputValues}
                style={{
                    backgroundColor:Theme.darkSecondary,
                    color:Theme.text,
                    padding:12,
                    borderRadius:8
                }}
                onChangeText={(text) => {
                    if(text.length === 0){
                        setTitle('Nom de la tâche')
                    } else {
                        setTitle(text);
                    }
                    setInputValues(text);
                    }}
                />
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.items}>
                    <View style={styles.flex}>
                        <MaterialIcons style={{marginRight:6}} name="category" size={20} color={Theme.primary} />
                        <Text style={styles.itemText}>Catégorie</Text>
                    </View>
                    <Text>Tâche</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()  => setShowCalendar(true)}
                    style={styles.items}>
                    <View style={styles.flex}>
                        <Feather style={{marginRight:6}} name="calendar" size={20} color={Theme.primary} />
                        <Text style={styles.itemText}>Date</Text>
                    </View>
                    <Text style={styles.tips}>{date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.items}>
                    <View style={styles.flex}>
                        <Feather style={{marginRight:6}} name="bell" size={20} color={Theme.primary} />
                        <Text style={styles.itemText}>Heure et rappels</Text>
                    </View>
                    <Text style={styles.tips}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.items}>
                    <View>
                        <View style={styles.flex}>
                            <Entypo style={{marginRight:6}} name="add-to-list" size={20} color={Theme.primary} />
                            <Text style={styles.itemText}>Ajouter des sous-éléments</Text>
                        </View>
                        <Text style={{
                            color:Theme.primary,
                            fontSize:12
                        }}>Fonctionnalité premium</Text>
                    </View>
                    <Text style={styles.tips}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.items} onPress={() => setPriorityIsOPen(true)}>
                    <View style={styles.flex}>
                        <MaterialCommunityIcons style={{marginRight:6}} name="priority-high" size={20} color={Theme.primary} />
                        <Text style={styles.itemText}>Priorité</Text>
                    </View>
                    <Text style={styles.tips} >{priority}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.items}>
                    <View style={styles.flex}>
                        <Feather style={{marginRight:6}} name="message-square" size={20} color={Theme.primary} />
                        <Text style={styles.itemText}>Note</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{
                position:'absolute',
                width:'100%',
                bottom:0,
                flexDirection:'row',
                alignItems:"center",
                justifyContent:"space-between",
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                    <Text style={styles.btnText}>annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={[styles.btnText, {color:Theme.primary}]}>confirmer</Text>
                </TouchableOpacity>
            </View>
            {
                priorityIsOpen && 
                    <Priorities 
                        priority={priority} 
                        onSetPriority={setPriority}
                        onSetPriorityOpen={setPriorityIsOPen}
                    />
            }
            { showCalendar && <DatePicker onSetDate={setDate} onSetShowCalendar={setShowCalendar} /> }
        </SafeAreaView>
    );
}

const Priorities: React.FC<PriorityProps> = ({priority, onSetPriority, onSetPriorityOpen}) => {

    let plus:number = priority+1;
    let minus:number = priority-1;

    return (
        <BlurView intensity={10} tint="dark" style={{
            position:"absolute",
            width:'100%',
            height:'100%',
            alignItems:"center",
            justifyContent:"center",
        }}>
            <View style={{
                width:300,
                backgroundColor:Theme.darkConstart,
                borderRadius:16,
                elevation:10
            }}>
                <View style={{
                    padding:16,
                    borderBottomWidth:1,
                    borderBottomColor:Theme.darkSecondary,
                }}>
                    <Text style={{
                        textAlign:"center",
                        fontSize: Spacing * 1.6,
                        color: Theme.white
                    }}>
                        Sélectionner la priorité
                    </Text>
                </View>
                <View style={{
                    flexDirection:'row',
                    justifyContent:"center",
                    alignItems:"center",
                    padding:10,
                }}>
                    <TouchableOpacity 
                        onPress={() => {
                            if(priority < 999){
                                onSetPriority(plus)
                            }
                        }}
                        style={[styles.priorityButton, {
                            borderTopLeftRadius:8,
                            borderBottomLeftRadius:8
                        }]}>
                        <AntDesign name="plus" size={20} color={Theme.white} />
                    </TouchableOpacity>
                    <TextInput style={{
                        backgroundColor:Theme.darkSecondary,
                        width:60,
                        height:56,
                        color:Theme.white,
                        fontSize:Spacing * 2,
                        textAlign:"center",
                        borderWidth:1,
                        borderColor:Theme.darkConstart
                    }}
                        value={priority.toString()}
                        onChangeText={(text) => {
                            onSetPriority(+text);
                        }}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity 
                        onPress={() => {
                            if(priority === 0){
                                onSetPriority(0);
                            } else {
                                onSetPriority(minus);
                            }
                        }}
                        style={[styles.priorityButton, {
                            borderTopRightRadius:8,
                            borderBottomRightRadius:8
                        }]}>
                        <AntDesign name="minus" size={24} color={Theme.white} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    justifyContent: "center",
                    alignItems:"center",
                    width:'100%',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            onSetPriority(1);
                        }}
                        style={[styles.tips, {
                            width:100,
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"center",
                            marginVertical:Spacing,
                        }]}>
                        <Text style={{
                            color: Theme.primary,
                            textAlign:"center"
                        }}>Default 1</Text>
                        <MaterialCommunityIcons name="priority-high" size={16} color={Theme.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    padding:Spacing * 1.6,
                    borderTopWidth:1,
                    borderBottomWidth:1,
                    borderColor:Theme.darkSecondary
                }}>
                    <Text style={{
                        fontSize:Spacing * 1.2,
                        color:Theme.text,
                        textAlign:"center"
                    }}>Les activitées de priorité supérieur seront affichées en premier dans la liste.</Text>
                </View>
                <View style={[styles.flex]}>
                    <TouchableOpacity
                        onPress={() => {
                            onSetPriority(1)
                            onSetPriorityOpen(false)
                        }}
                        style={[styles.button, {
                            borderBottomLeftRadius:16
                        }]}>
                        <Text style={styles.btnText}>fermer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onSetPriority(priority);
                            onSetPriorityOpen(false);
                        }}
                        style={[styles.button, {
                            borderBottomRightRadius:16
                        }]}>
                        <Text style={[styles.btnText, {color:Theme.primary}]}>confirmer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BlurView>
    );

}

const DatePicker: React.FC<DatePickerProps> = ({onSetDate, onSetShowCalendar}) => {

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
          onSetShowCalendar(false);
          onSetDate(format(selectedDate!, 'PPP', {locale:fr}))
        }
        if (event.type === 'dismissed') 
          return;
    }

    return  (
        <DateTimePicker 
        themeVariant="dark"
        value={new Date}
        accentColor={Theme.primary}
        onChange={onChange}
        />
    );
}

const styles = StyleSheet.create({
    items:{
        padding:Spacing * 2.5,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderTopWidth:1,
        borderColor:Theme.darkConstart,
        maXHeight: 40
    },
    itemText: {
        fontSize:Spacing*1.6,
        color:Theme.white
    },
    tips: {
        backgroundColor:Theme.alphaPrimary,
        color:Theme.primary,
        padding:8,
        borderRadius:6,
    },
    flex:{
        flexDirection:"row",
        alignItems:"center",
    },
    button: {
        backgroundColor:Theme.darkSecondary,
        padding:14,
        width:"50%"
    },
    btnText: {
        fontSize: Spacing * 1.6,
        color: Theme.text,
        textTransform: "uppercase",
        textAlign:"center",
    },
    priorityButton: {
        width:56,
        height:56,
        backgroundColor:Theme.darkSecondary,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
        borderColor:Theme.darkConstart
    }
});

export default CreateTaskScreen;