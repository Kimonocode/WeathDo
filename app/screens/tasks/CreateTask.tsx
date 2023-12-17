import React, { ReactNode, useState } from "react";
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
import { differenceInDays, eachDayOfInterval, format, fromUnixTime, getHours, getUnixTime, parseISO } from "date-fns";
import fr from "date-fns/locale/fr";
import Spacing from "../../../config/Spacing";
import Theme from "../../../config/Theme";
import { Task } from "../../../types/interfaces/Task";
import { capitalize, truncate } from "../../../functions/strings";
import { Reminder } from "../../../types/interfaces/Reminder";

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
          onSetDateTitle={setDateTitle}
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
  onSetShowCalendar,
  onSetDateTitle
}) => {
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      onSetShowCalendar(false);
      onSetTask({
        ...task,
        date: selectedDate!
      });
      onSetDateTitle(format(selectedDate!,'PPP', {locale:fr}));
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

  const [errorForMaxDays, setErrorForMaxDays] = useState<boolean>(false);
  const [ numberOfDayBeforeText, setNumberOfDayBeforeText ] = useState();

  const [
    notificationIntervalChecked,
    setNotificationIntervalChecked
  ] = useState<number>(0);

  const [notificationTypeSelected, setNotificationTypeSelected] = useState<
    number
  >(0);

  const [reminder, setReminder] = useState<Reminder>({
    hour: getHours(new Date()).toString(),
    minute: "00",
    days: [],
    notification: {
      type: null,
      interval: {
        everyDays: true,
        someDays: false,
        beforeDay: false,
        numberOfDayBefore: "2"
      }
    }
  });

  const [firstStep, setFirstStep] = useState<boolean>(true);
  const [secondStep, setSecondStep] = useState<boolean>(false);

  /**
   * Close reminders list modal and show modal for add one
   */
  const openAddReminder = () => {
    setFirstStep(false);
    setSecondStep(true);
  };

  /**
   * Close modal for add reminder and show reminders list
   */
  const closeAddReminder = () => {
    setSecondStep(false);
    setFirstStep(true);
  };

  /**
   * Add or Remove day in days reminder list
   * @param day 
   */
  const handleAddDayToReminderDaysList = (day: string) => {
    if (reminder.days.includes(day)) {
      let newDays = [...reminder.days];
      newDays = newDays.filter(row => row !== day);
      setReminder({ ...reminder, days: newDays });
    } else {
      setReminder({
        ...reminder,
        days: [...reminder.days, day]
      });
    }
  };

  const handleHourInputTextChange = (textInput: string) => {
    const hour = +textInput;
    if(hour < 23){
      setReminder({ ...reminder, hour: textInput });
    } else {
      setReminder({ ...reminder, hour:'23'});
    }
  };

  const handleMinutesInputTextChange = (textInput:string) => {
    const minutes = +textInput;
    if(minutes < 59){
      setReminder({ ...reminder, minute: textInput });
    } else {
      setReminder({ ...reminder, minute: '59' });
    }
  };

  /**
   * Checkbox Notification Interval Controller
   * @param index
   */
  const handleIntervalChecked = (index: number) => {
    setNotificationIntervalChecked(index);
    switch (index) {
      case 0:
        setReminder({
          ...reminder,
          days: [],
          notification: {
            ...reminder.notification,
            interval: {
              numberOfDayBefore: "2",
              everyDays: true,
              someDays: false,
              beforeDay: false
            }
          }
        });
        break;
      case 1:
        setReminder({
          ...reminder,
          notification: {
            ...reminder.notification,
            interval: {
              numberOfDayBefore: "2",
              everyDays: false,
              someDays: true,
              beforeDay: false
            }
          }
        });
        break;
      case 2:
        setReminder({
          ...reminder,
          days: [],
          notification: {
            ...reminder.notification,
            interval: {
              ...reminder.notification.interval,
              everyDays: false,
              someDays: false,
              beforeDay: true
            }
          }
        });
        break;
    }
  };

  const handleChangeNotificationType = (index: number, type: string) => {
    setReminder({
      ...reminder,
      notification: {
        ...reminder.notification,
        type
      }
    });
    setNotificationTypeSelected(index);
  };

  /**
   * Change le nombre de jours pour lequel le rappel doit se lancer avant la date
   * @param numberOfDay 
   */
  const handleNumberDayBeforeReminderChange = (numberOfDay: string) => {
    
    const maxDays = differenceInDays(task.date, new Date);

    if(+numberOfDay > maxDays){
      setErrorForMaxDays(true);
    } else {
      setErrorForMaxDays(false);
      setReminder({
        ...reminder,
        notification: {
          ...reminder.notification,
          interval: {
            ...reminder.notification.interval,
            numberOfDayBefore: numberOfDay
          }
        }
      });
    }
  };

  const getIconForNotificationType = (type: string, color:string|null) => {
    let icon:ReactNode;
    color = color !== null ? color : Theme.darkConstart;
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
    return icon;
  };

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
              onPress={() => openAddReminder()}
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
                  handleHourInputTextChange(text)}
                value={reminder.hour}
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
                  handleMinutesInputTextChange(text);
                }}
                value={reminder.minute}
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
                const background =
                  notificationTypeSelected === index
                    ? Theme.alphaPrimary
                    : Theme.darkSecondary;
                const color =
                  notificationTypeSelected === index
                    ? Theme.primary
                    : Theme.textContrast;

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
                    {getIconForNotificationType(type, color)}
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
                        onPress={() => handleIntervalChecked(index)}
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
                                  onPress={() =>
                                    handleAddDayToReminderDaysList(day)}
                                  style={{
                                    backgroundColor: reminder.days.includes(
                                      day
                                    )
                                      ? Theme.alphaPrimary
                                      : Theme.darkSecondary,
                                    padding: 6,
                                    borderColor: Theme.bgDark,
                                    borderRadius: 4
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: reminder.days.includes(day)
                                        ? Theme.primary
                                        : Theme.text
                                    }}
                                  >
                                    {truncate(day,3).toUpperCase()}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                      </View>}
                    {index === 2 &&
                      index === notificationIntervalChecked &&
                      <View>
                        <View style={[styles.flex]}>
                        <TextInput
                          autoFocus
                          style={{
                            fontSize: Spacing * 2.4,
                            color: Theme.white,
                            padding: Spacing * 1.1
                          }}
                          maxLength={2}
                          value={reminder.notification.interval.numberOfDayBefore.toString()}
                          onChangeText={numberOfDay =>
                            handleNumberDayBeforeReminderChange(numberOfDay)}
                          keyboardType="numeric"
                        />
                        <Text style={{ color: Theme.textContrast }}>
                          jours avant
                        </Text>
                        </View>
                        {
                          errorForMaxDays &&
                          <Text style={{
                            fontSize:11,
                            color:Theme.red
                          }}>Le nombre de jours est supérieur au nombre de jours restant avant la date mentionnée.</Text>
                        }
                      </View>}
                  </View>
                );
              })}
            </View>
          </View>
          <View style={[styles.flex]}>
            <TouchableOpacity
              onPress={() => closeAddReminder()}
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
