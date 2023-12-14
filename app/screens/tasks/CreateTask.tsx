import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { SafeAreaView, TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Spacing from "../../../config/Spacing";
import Theme from "../../../config/Theme";
import { Feather, MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { format } from "date-fns";


type ScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateTask'>;

const CreateTaskScreen:React.FC<ScreenProps> = ({navigation, route}) => {

    const [title, setTitle] = useState<string>("Nom de la tâche");
    const [inputValues, setInputValues] = useState<string>('');
    const [date, setDate] = useState<string>(route.params.date);

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
                <TouchableOpacity style={styles.items}>
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
                <TouchableOpacity style={styles.items}>
                    <View style={styles.flex}>
                        <MaterialCommunityIcons style={{marginRight:6}} name="priority-high" size={20} color={Theme.primary} />
                        <Text style={styles.itemText}>Priorité</Text>
                    </View>
                    <Text style={styles.tips} >1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.items}>
                    <View style={styles.flex}>
                        <Feather style={{marginRight:6}} name="message-square" size={20} color={Theme.primary} />
                        <Text style={styles.itemText}>Note</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
    }
})


export default CreateTaskScreen;