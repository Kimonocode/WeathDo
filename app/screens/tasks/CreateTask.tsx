import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  DatePickerProps,
  PriorityProps,
  ReminderProps,
  RootStackParamList
} from "../../../types";
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import { RadioButton } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import {
  Feather,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { format, getHours } from "date-fns";
import fr from "date-fns/locale/fr";
import Spacing from "../../../config/Spacing";
import Theme from "../../../config/Theme";
import { Task } from "../../../types/interfaces/Task";
import { capitalize } from "../../../functions/strings";
import { Reminder } from "../../../types/interfaces/Reminder";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "CreateTask">;

const CreateTaskScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [task, setTask] = useState<Task>({
    title: "Nom de la tâche",
    description: "",
    date: route.params.date,
    category: "tâche",
    priority: 1,
    completed: false,
    list: [],
    reminders: []
  });

  const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
  const [priorityIsOpen, setPriorityIsOPen] = useState<boolean>(false);
  const [remindersIsOpen, setRemindersIsOpen] = useState<boolean>(false);

  const [titleInputValue, setTitleInputValue] = useState<string>("");

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
          onPress={() => setCalendarIsOpen(true)}
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
            {task.date.toString()}
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
        <TouchableOpacity style={styles.button}>
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
      {calendarIsOpen &&
        <DatePicker
          task={task}
          onSetTask={setTask}
          onSetShowCalendar={setCalendarIsOpen}
        />}
      {remindersIsOpen &&
        <Reminders
          task={task}
          onSetTask={setTask}
          onSetRemindersIsOpen={setRemindersIsOpen}
        />}
    </SafeAreaView>
  );
};

const Priorities: React.FC<PriorityProps> = ({
  task,
  onSetTask,
  onSetPriorityOpen
}) => {
  let plus: number = task.priority + 1;
  let minus: number = task.priority - 1;

  return (
    <BlurView intensity={10} tint="dark" style={styles.blurView}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Sélectionner la priorité</Text>
        </View>
        <View
          style={[styles.flex, { justifyContent: "center", padding: Spacing }]}
        >
          <TouchableOpacity
            onPress={() => {
              if (task.priority < 999) {
                onSetTask({ ...task, priority: plus });
              }
            }}
            style={[
              styles.priorityButton,
              {
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8
              }
            ]}
          >
            <AntDesign name="plus" size={20} color={Theme.white} />
          </TouchableOpacity>
          <TextInput
            style={styles.modalNumericInputs}
            maxLength={3}
            value={task.priority.toString()}
            onChangeText={text => onSetTask({ ...task, priority: +text })}
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() =>
              task.priority === 0
                ? onSetTask({ ...task, priority: 0 })
                : onSetTask({ ...task, priority: minus })}
            style={[
              styles.priorityButton,
              {
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8
              }
            ]}
          >
            <AntDesign name="minus" size={24} color={Theme.white} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}
        >
          <TouchableOpacity
            onPress={() => onSetTask({ ...task, priority: 1 })}
            style={[
              styles.tips,
              styles.flex,
              {
                width: 100,
                justifyContent: "center",
                marginVertical: Spacing
              }
            ]}
          >
            <Text
              style={{
                color: Theme.primary,
                textAlign: "center"
              }}
            >
              Default 1
            </Text>
            <MaterialCommunityIcons
              name="priority-high"
              size={16}
              color={Theme.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.modalBoxInfo}>
          <Text style={styles.modalInfo}>
            Les activitées de priorité supérieur seront affichées en premier
            dans la liste.
          </Text>
        </View>
        <View style={[styles.flex]}>
          <TouchableOpacity
            onPress={() => {
              onSetTask({ ...task, priority: 1 });
              onSetPriorityOpen(false);
            }}
            style={[
              styles.button,
              {
                borderBottomLeftRadius: 16
              }
            ]}
          >
            <Text style={styles.btnText}>fermer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onSetTask({ ...task, priority: task.priority });
              onSetPriorityOpen(false);
            }}
            style={[
              styles.button,
              {
                borderBottomRightRadius: 16
              }
            ]}
          >
            <Text style={[styles.btnText, { color: Theme.primary }]}>
              confirmer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
};

const DatePicker: React.FC<DatePickerProps> = ({
  task,
  onSetTask,
  onSetShowCalendar
}) => {
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      onSetShowCalendar(false);
      onSetTask({
        ...task,
        date: format(selectedDate!, "PPP", { locale: fr })
      });
    }
    if (event.type === "dismissed") return;
  };

  return (
    <DateTimePicker
      themeVariant="dark"
      value={new Date()}
      accentColor={Theme.primary}
      onChange={onChange}
    />
  );
};

const Reminders: React.FC<ReminderProps> = ({
  task,
  onSetTask,
  onSetRemindersIsOpen
}) => {
  const notificationType = ["silencieux", "notification", "alarme"];

  const notificationInterval = [
    "Tous les jours",
    "Certains jours de la semaine",
    "Jours avant"
  ];

  const days = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche"
  ];

  const [
    notificationIntervalChecked,
    setNotificationIntervalChecked
  ] = useState<number>(0);

  const [notificationTypeSelected, setNotificationTypeSelected] = useState<number>(0);

  const [reminders, setReminders] = useState<Reminder>({
    hour: getHours(new Date()).toString(),
    minute: "00",
    days: [],
    notification: {
      type: null,
      interval: {
        everyDays: true,
        someDays: false,
        beforeDay: false,
        numberOfDayBefore:'2'
      }
    }
  });

  const [firstStep, setFirstStep] = useState<boolean>(true);
  const [secondStep, setSecondStep] = useState<boolean>(false);

  /**
   * Remove first modal reminder and show the second step
   */
  const handleAddReminder = () => {
    setFirstStep(false);
    setSecondStep(true);
  }

  /**
   * Add or Remove day in days reminder list
   * @param day 
   */
  const handleAddDayToReminderDaysList = (day: string) => {
    if(reminders.days.includes(day)){
        let newDays = [...reminders.days];
        newDays = newDays.filter(row => row !== day);
        setReminders({...reminders, days:newDays});
    } else {
        setReminders({...reminders, days: [
            ...reminders.days, 
            day
        ]});
    }
  }

  /**
   * Checkbox Controller
   * @param index
   */
  const hanldeIntervalChecked = (index:number) => {
    setNotificationIntervalChecked(index);
    switch (index) {
      case 0:
        setReminders({
          ...reminders,
          days:[],
          notification: {
            ...reminders.notification,
            interval: {
              numberOfDayBefore:'2',
              everyDays: true,
              someDays: false,
              beforeDay: false
            }
          }
        });
        break;
      case 1:
        setReminders({
          ...reminders,
          notification: {
            ...reminders.notification,
            interval: {
              numberOfDayBefore:'2',
              everyDays: false,
              someDays: true,
              beforeDay: false
            }
          }
        });
        break;
      case 2:
        setReminders({
          ...reminders,
          days:[],
          notification: {
            ...reminders.notification,
            interval: {
              ...reminders.notification.interval,
              everyDays: false,
              someDays: false,
              beforeDay: true
            }
          }
        });
        break;
    }
  }

  const handleChangeNotificationType = (index:number, type:string) => {
    setReminders({
        ...reminders,
        notification: {
          ...reminders.notification,
          type
        }
      });
      setNotificationTypeSelected(index);
  }

  /**
   * Change le nombre de jours pour lequel le rappel doit se lancer avant la date
   * @param numberOfDay 
   */
  const handleChangeNumberDayBeforeReminder = (numberOfDay:string) => {
    setReminders({
      ...reminders, notification: {
        ...reminders.notification,
          interval:{
            ...reminders.notification.interval,
            numberOfDayBefore:numberOfDay
          }
        }
    })
  }

  return (
    <BlurView intensity={10} tint="dark" style={styles.blurView}>
      {firstStep &&
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Heure et Rappels</Text>
          </View>
          <View
            style={{
              padding: Spacing * 1.6,
              alignItems: "center"
            }}
          >
            <Image
              source={require("../../../assets/add-bell.png")}
              style={{
                width: 65,
                height: 65
              }}
            />
          </View>
          <View style={styles.modalBoxInfo}>
            <Text style={styles.modalInfo}>
              Vous n'avez aucun rappel pour cette activité.
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => handleAddReminder()}
              style={[styles.button, { width: "100%" }]}
            >
              <Text style={[styles.btnText, { color: Theme.primary }]}>
                Ajouter un rappel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onSetRemindersIsOpen(false)}
              style={[
                styles.button,
                {
                  width: "100%",
                  borderBottomRightRadius: 16,
                  borderBottomLeftRadius: 16
                }
              ]}
            >
              <Text style={[styles.btnText, {}]}>fermer</Text>
            </TouchableOpacity>
          </View>
        </View>}
      {secondStep &&
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Nouveau Rappel</Text>
          </View>
          <View
            style={[
              styles.flex,
              {
                justifyContent: "center",
                padding: Spacing,
                borderBottomWidth: 1,
                borderBottomColor: Theme.darkSecondary
              }
            ]}
          >
            <View>
              <TextInput
                maxLength={2}
                onChangeText={text =>
                  setReminders({ ...reminders, hour: text })}
                value={reminders.hour}
                keyboardType="numeric"
                style={[styles.modalNumericInputs, { borderRadius: 8 }]}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: Theme.textContrast,
                  fontSize: Spacing * 1.2
                }}
              >
                Heure
              </Text>
            </View>
            <View
              style={{
                padding: Spacing
              }}
            >
              <Text
                style={{
                  color: Theme.textContrast,
                  fontSize: 26,
                  fontWeight: "bold"
                }}
              >
                :
              </Text>
            </View>
            <View>
              <TextInput
                maxLength={2}
                onChangeText={text => {
                  setReminders({ ...reminders, minute: text });
                }}
                value={reminders.minute}
                keyboardType="numeric"
                style={[styles.modalNumericInputs, { borderRadius: 8 }]}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: Theme.textContrast,
                  fontSize: Spacing * 1.2
                }}
              >
                Minute
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: Spacing,
              borderBottomWidth: 1,
              borderBottomColor: Theme.darkSecondary
            }}
          >
            <Text style={{ color: Theme.text, fontSize: Spacing * 1.6 }}>
              Type de rappel
            </Text>
            <View
              style={[
                styles.flex,
                {
                  justifyContent: "center",
                  marginVertical: Spacing
                }
              ]}
            >
              {notificationType.map((type, index) => {
                let icon;
                const background =
                  notificationTypeSelected === index
                    ? Theme.alphaPrimary
                    : Theme.darkSecondary;
                const color =
                  notificationTypeSelected === index
                    ? Theme.primary
                    : Theme.textContrast;

                switch (type) {
                  case "silencieuse":
                    icon = <Feather name="bell-off" size={24} color={color} />;
                    break;
                  case "notification":
                    icon = <Feather name="bell" size={24} color={color} />;
                    break;
                  default:
                    icon = <Feather name="clock" size={24} color={color} />;
                }

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleChangeNotificationType(index, type)}
                    style={{
                      backgroundColor: background,
                      width: "33%",
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: Theme.darkConstart
                    }}
                  >
                    {icon}
                    <Text
                      style={{
                        fontSize: Spacing * 1.2,
                        color: color
                      }}
                    >
                      {capitalize(type)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{ padding: Spacing }}>
            <Text
              style={{
                color: Theme.text,
                marginVertical: Spacing,
                fontSize: Spacing * 1.6
              }}
            >
              Me rappeler
            </Text>
            <View>
              {notificationInterval.map((interval, index) => {
                return (
                  <View key={index}>
                    <View style={styles.flex}>
                      <RadioButton
                        color={Theme.primary}
                        value="first"
                        status={
                          index === notificationIntervalChecked
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => hanldeIntervalChecked(index)}
                      />
                      <Text
                        style={{
                          color: Theme.textContrast,
                          fontSize: Spacing * 1.4
                        }}
                      >
                        {interval}
                      </Text>
                    </View>
                    {index === 1 &&
                      index === notificationIntervalChecked &&
                      <View>
                        <View>
                          <View
                            style={[
                              styles.flex,
                              {
                                justifyContent: "space-between",
                                marginVertical: Spacing
                              }
                            ]}
                          >
                            {days.map((day, index) => {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => handleAddDayToReminderDaysList(day)}
                                  style={{
                                    backgroundColor:reminders.days.includes(day) ? Theme.alphaPrimary : Theme.darkSecondary,
                                    padding: 6,
                                    borderColor:Theme.bgDark,
                                    borderRadius: 4
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color:reminders.days.includes(day) ? Theme.primary : Theme.text
                                    }}
                                  >
                                    {day.slice(0, 3).toUpperCase()}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                      </View>}
                      {index === 2 &&
                      index === notificationIntervalChecked &&
                      <View style={[styles.flex]}>
                        <TextInput
                          autoFocus
                          style={{
                            fontSize:Spacing * 2.4,
                            color:Theme.white,
                            padding:Spacing * 1.1,
                          }}
                          maxLength={1}
                          value={reminders.notification.interval.numberOfDayBefore.toString()}
                          onChangeText={numberOfDay => handleChangeNumberDayBeforeReminder(numberOfDay)}
                          keyboardType="numeric"
                        />
                        <Text style={{color:Theme.textContrast}}>jours avant</Text>
                      </View>}
                  </View>
                );
              })}
            </View>
          </View>
          <View style={[styles.flex]}>
            <TouchableOpacity
              onPress={() => {
                setSecondStep(false);
                setFirstStep(true);
              }}
              style={[
                styles.button,
                {
                  borderBottomLeftRadius: 16
                }
              ]}
            >
              <Text style={styles.btnText}>fermer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderBottomRightRadius: 16
                }
              ]}
            >
              <Text style={[styles.btnText, { color: Theme.primary }]}>
                confirmer
              </Text>
            </TouchableOpacity>
          </View>
        </View>}
    </BlurView>
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
    width: "50%"
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
  }
});

export default CreateTaskScreen;
