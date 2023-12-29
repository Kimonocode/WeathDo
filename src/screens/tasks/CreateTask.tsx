import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons
} from "@expo/vector-icons";
import { format, fromUnixTime } from "date-fns";
import Spacing from "../../../config/Spacing";
import Theme from "../../../config/Theme";
import { TaskInterface } from "../../models/Task/TaskInterface";
import { capitalize } from "../../../funcs/strings";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { fr } from "date-fns/locale";
import Priorities from "../../components/Tasks/Priorities/Priorities";
import Reminders from "../../components/Tasks/Reminders/Reminders";
import { toast } from "../../../funcs/toast";
import AcceptOrCancelButtons from "../../components/Buttons/AcceptOrCancelButtons";
import { BlurView } from "expo-blur";
import TaskCategories from "../../components/Tasks/Categories/Categories";
import { taskCategories } from "../../storage/data/tasks/categories";
import IconCategory from "../../components/Tasks/Categories/IconCategory";
import TaskCategory from "../../models/Task/Category";
import firestore from '@react-native-firebase/firestore';

type ScreenProps = NativeStackScreenProps<RootStackParamList, "CreateTask">;

const CreateTaskScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const givenDate = route.params.dateSelected;

  const [dateTitle, setDateTitle] = useState(route.params.dateTitle);

  const [task, setTask] = useState<TaskInterface>({
    _id: 0,
    title: "Nom de la tâche",
    description: "",
    date: fromUnixTime(givenDate),
    category: "tâche",
    priority: 1,
    completed: false,
    list: [],
    reminders: []
  });

  const [noteIsOpen, setNoteIsOpen] = useState (false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [priorityIsOpen, setPriorityIsOPen] = useState(false);
  const [remindersIsOpen, setRemindersIsOpen] = useState(false);
  const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);
  
  const [titleInputValue, setTitleInputValue] = useState("");
  const [noteInputValue, setNoteInputValue] = useState("");

  const handleConfirm = async () => {
    if (titleInputValue === "") {
      toast("Saisir un nom");
      return;
    }
    const taskDoc = await firestore()
      .collection('tasks')
      .add(task);
    console.log(taskDoc);
  };

  const category = TaskCategory.findByTitle(task.category);
  const iconCategoryColor = category === null ? Theme.primary : category.color;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Theme.bgDark
      }}
    >
      <View
        style={{
          padding: Spacing * 1.2
        }}
      >
        <Text
          style={{
            fontSize: Spacing * 2,
            color: Theme.white
          }}
        >
          {task.title}
        </Text>
        <View style={{ marginVertical: 20 }}>
          <TextInput
            value={titleInputValue}
            style={{
              backgroundColor: Theme.darkSecondary,
              color: Theme.text,
              padding: 12,
              borderRadius: 8
            }}
            onChangeText={text => {
              text.length === 0
                ? setTask({ ...task, title: "Nom de la tâche" })
                : setTask({ ...task, title: text });
              setTitleInputValue(text);
            }}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.items}
          onPress={() => setCategoriesIsOpen(true)}
        >
          <View style={styles.flex}>
            <MaterialIcons
              style={{ marginRight: 6 }}
              name="category"
              size={20}
              color={Theme.primary}
            />
            <Text style={styles.itemText}>Catégorie</Text>
          </View>
          <View style={{
            flexDirection:'row',
            alignItems:'center'
          }}>
            <IconCategory category={task.category} color={iconCategoryColor!}            
            />
            <Text style={{ color: iconCategoryColor!, marginLeft:Spacing }}>
              {capitalize(task.category)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowCalendar(true)}
          style={styles.items}
        >
          <View style={styles.flex}>
            <Feather
              style={{ marginRight: 6 }}
              name="calendar"
              size={20}
              color={Theme.primary}
            />
            <Text style={styles.itemText}>Date</Text>
          </View>
          <Text style={styles.tips}>
            {dateTitle}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRemindersIsOpen(true)}
          style={styles.items}
        >
          <View style={styles.flex}>
            <Feather
              style={{ marginRight: 6 }}
              name="bell"
              size={20}
              color={Theme.primary}
            />
            <Text style={styles.itemText}>Heure et rappels</Text>
          </View>
          <Text style={styles.tips}>
            {task.reminders.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.items}>
          <View>
            <View style={styles.flex}>
              <Entypo
                style={{ marginRight: 6 }}
                name="add-to-list"
                size={20}
                color={Theme.primary}
              />
              <Text style={styles.itemText}>Ajouter des sous-éléments</Text>
            </View>
            <Text
              style={{
                color: Theme.primary,
                fontSize: 12
              }}
            >
              Fonctionnalité premium
            </Text>
          </View>
          <Text style={styles.tips}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.items}
          onPress={() => setPriorityIsOPen(true)}
        >
          <View style={styles.flex}>
            <MaterialCommunityIcons
              style={{ marginRight: 6 }}
              name="priority-high"
              size={20}
              color={Theme.primary}
            />
            <Text style={styles.itemText}>Priorité</Text>
          </View>
          <Text style={styles.tips}>
            {task.priority}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setNoteIsOpen(true)} 
          style={styles.items}>
          <View style={styles.flex}>
            <Feather
              style={{ marginRight: 6 }}
              name="message-square"
              size={20}
              color={Theme.primary}
            />
            <Text style={styles.itemText}>Note</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <AcceptOrCancelButtons 
          confirmText="confirmer"
          cancelText="annuler"
          onCancel={() => navigation.goBack()}
          onConfirm={() => handleConfirm()}
        />
      </View>
      {priorityIsOpen &&
        <Priorities
          task={task}
          onSetTask={setTask}
          onSetPriorityOpen={setPriorityIsOPen}
        />}
      <DateTimePickerModal
        isVisible={showCalendar}
        mode="date"
        onConfirm={date => {
          setDateTitle(format(date, "PPP", { locale: fr }));
          setTask({ ...task, date: date });
          setShowCalendar(false);
        }}
        onCancel={() => {
          setShowCalendar(false);
        }}
      />
      {
        categoriesIsOpen && < TaskCategories
          task={task}
          onSetTask={setTask}
          categories={taskCategories}
          onSetCategory={setCategoriesIsOpen}
        />
      }
      {remindersIsOpen &&
        <Reminders
          task={task}
          onSetTask={setTask}
          onSetRemindersIsOpen={setRemindersIsOpen}
        />}
      {
        noteIsOpen && 
        <BlurView style={styles.blurView} tint="dark" intensity={10}>
          <View style={[styles.modal]}>
            <View>
              <TextInput
                autoFocus
                placeholder='Ajouter une note'
                value={noteInputValue}
                onChangeText={text => setNoteInputValue(text)}
                placeholderTextColor={Theme.text}
                style={{
                  padding:8,
                  fontSize:Spacing * 1.6,
                  backgroundColor:Theme.darkConstart,
                  paddingBottom:150,
                  borderBottomColor:Theme.primary,
                  borderTopLeftRadius:16,
                  borderTopRightRadius:16,
                  color:Theme.text
                }}
              />  
            </View>
            <AcceptOrCancelButtons 
              confirmText="confirmer"
              cancelText="annuler"
              onCancel={() => setNoteIsOpen(false)}
              onConfirm={() => {
                setTask({...task, description: noteInputValue});
                setNoteIsOpen(false);
              }}
              options={{
                cancelButton:{
                  style:{
                    width:'100%'
                  }
                },
                confirmButton:{
                  style:{
                    width:'100%',
                    borderBottomLeftRadius:16,
                    borderBottomRightRadius:16
                  }
                }
              }}
            /> 
          </View>
        </BlurView>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  items: {
    padding: Spacing * 2.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: Theme.darkConstart,
    maXHeight: 40
  },
  itemText: {
    fontSize: Spacing * 1.6,
    color: Theme.white
  },
  tips: {
    backgroundColor: Theme.alphaPrimary,
    color: Theme.primary,
    padding: 8,
    borderRadius: 6
  },
  flex: {
    flexDirection: "row",
    alignItems: "center"
  },
  priorityButton: {
    width: 56,
    height: 56,
    backgroundColor: Theme.darkSecondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Theme.darkConstart
  },
  blurView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    width: 300,
    backgroundColor: Theme.darkConstart,
    borderRadius: 16,
    elevation: 10
  },
  modalInfo: {
    fontSize: Spacing * 1.2,
    color: Theme.text,
    textAlign: "center"
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.darkSecondary
  },
  modalBoxInfo: {
    padding: Spacing * 1.6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Theme.darkSecondary
  },
  modalHeaderText: {
    textAlign: "center",
    fontSize: Spacing * 1.6,
    color: Theme.white
  },
  modalNumericInputs: {
    backgroundColor: Theme.darkSecondary,
    width: 60,
    height: 56,
    color: Theme.white,
    fontSize: Spacing * 2,
    textAlign: "center",
    borderWidth: 1,
    borderColor: Theme.darkConstart
  },
  reminderBadge: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.bgDark
  }
});

export default CreateTaskScreen;
