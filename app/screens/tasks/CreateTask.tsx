import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  RootStackParamList
} from "../../../types";
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { format, fromUnixTime  } from "date-fns";
import Spacing from "../../../config/app/Spacing";
import Theme from "../../../config/app/Theme";
import { Task } from "../../../types/interfaces/Task";
import { capitalize } from "../../../functions/strings";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { fr } from "date-fns/locale";
import Priorities from "../../components/Tasks/Priorities/Priorities";
import Reminders from "../../components/Tasks/Reminders/Reminders";
import { toast } from "../../../functions/toast";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "CreateTask">;

const CreateTaskScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const givenDate = route.params.dateSelected;

  const [dateTitle, setDateTitle] = useState(route.params.dateTitle);

  const [task, setTask] = useState<Task>({
    title: "Nom de la tâche",
    description: "",
    date: fromUnixTime(givenDate),
    category: "tâche",
    priority: 1,
    completed: false,
    list: [],
    reminders: []
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [priorityIsOpen, setPriorityIsOPen] = useState<boolean>(false);
  const [remindersIsOpen, setRemindersIsOpen] = useState<boolean>(false);

  const [titleInputValue, setTitleInputValue] = useState<string>("");


  const handleConfirm = () => {
    if(titleInputValue === ""){
      toast("Saisir un nom", 3000);
      return;
    }
  }

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
        <TouchableOpacity style={styles.items}>
          <View style={styles.flex}>
            <MaterialIcons
              style={{ marginRight: 6 }}
              name="category"
              size={20}
              color={Theme.primary}
            />
            <Text style={styles.itemText}>Catégorie</Text>
          </View>
          <Text style={{ color: Theme.primary }}>
            {capitalize(task.category)}
          </Text>
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
        <TouchableOpacity style={styles.items}>
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.btnText}>annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => handleConfirm()}
        >
          <Text style={[styles.btnText, { color: Theme.primary }]}>
            confirmer
          </Text>
        </TouchableOpacity>
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
        onConfirm={(date) => {
          setDateTitle(format(date, 'PPP', {locale:fr}));
          setTask({...task, date:date});
          setShowCalendar(false);
        }} 
        onCancel={() => {
          setShowCalendar(false);
        }}
        />

      {remindersIsOpen &&
        <Reminders
          task={task}
          onSetTask={setTask}
          onSetRemindersIsOpen={setRemindersIsOpen}
        />}
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
  button: {
    backgroundColor: Theme.darkSecondary,
    padding: 14,
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: Theme.darkConstart
  },
  btnText: {
    fontSize: Spacing * 1.6,
    color: Theme.text,
    textTransform: "uppercase",
    textAlign: "center"
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
