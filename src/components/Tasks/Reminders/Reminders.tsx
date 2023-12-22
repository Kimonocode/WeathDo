import { getHours, differenceInDays, isSameDay } from "date-fns";
import { BlurView } from "expo-blur";
import React, { useState, ReactNode, Dispatch, SetStateAction } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image
} from "react-native";
import { RadioButton } from "react-native-paper";
import Spacing from "../../../../config/Spacing";
import Theme from "../../../../config/Theme";
import { capitalize, truncate } from "../../../../funcs/strings";
import { ReminderInterface } from "../../../models/Task/ReminderInterface";
import { Feather, Ionicons } from "@expo/vector-icons";
import { toast } from "../../../../funcs/toast";
import { TaskInterface } from "../../../models/Task/TaskInterface";
import NumericInput from "../../Inputs/NumericInput";
import AcceptOrCancelButtons from "../../Buttons/AcceptOrCancelButtons";

type Props = {
  task: TaskInterface;
  onSetTask: Dispatch<SetStateAction<TaskInterface>>;
  onSetRemindersIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Reminders: React.FC<Props> = ({
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

  const [
    notificationIntervalChecked,
    setNotificationIntervalChecked
  ] = useState<number>(0);

  const [notificationTypeSelected, setNotificationTypeSelected] = useState<
    number
  >(0);

  const [reminder, setReminder] = useState<ReminderInterface>({
    hour: getHours(new Date()).toString(),
    minute: "00",
    days: [],
    notification: {
      type: "silencieux",
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

  const handleOpenAddReminder = () => {
    setFirstStep(false);
    setSecondStep(true);
  };

  const handleCloseAddReminder = () => {
    setSecondStep(false);
    setFirstStep(true);
  };

  const handleAddDayToReminderDaysList = (day: string) => {
    if (reminder.days.length >= 6) {
      setNotificationIntervalChecked(0);
      setEveryDaysForReminderNotification();
    } else {
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
    }
  };

  const handleHourInputTextChange = (textInput: string) => {
    const hour = +textInput;
    if (hour < 23) {
      setReminder({ ...reminder, hour: textInput });
    } else {
      setReminder({ ...reminder, hour: "23" });
    }
  };

  const handleMinutesInputTextChange = (textInput: string) => {
    const minutes = +textInput;
    if (minutes < 59) {
      setReminder({ ...reminder, minute: textInput });
    } else {
      setReminder({ ...reminder, minute: "59" });
    }
  };

  const handleChangeIntervalChecked = (index: number) => {
    setNotificationIntervalChecked(index);
    switch (index) {
      case 0:
        setEveryDaysForReminderNotification();
        break;
      case 1:
        setSomeDaysForReminderNotification();
        break;
      case 2:
        setBeforeDaysForReminderNotification();
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

  const handleNumberDayBeforeReminderChange = (numberOfDay: string) => {
    const maxDays = differenceInDays(task.date, new Date());

    if (+numberOfDay > maxDays) {
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

  const handleAddReminderInRemindersList = () => {
    if (
      reminderExistInRemindersListByHourAndMinute(
        reminder.hour,
        reminder.minute
      )
    ) {
      toast("Existe déjà pour " + reminder.hour + ":" + reminder.minute, 3000);
    } else {
      if (reminder.notification.interval.someDays && reminder.days.length < 1) {
        toast("Saisissez au moins un jour");
      } else {
        onSetTask({ ...task, reminders: [...task.reminders, reminder] });
        handleCloseAddReminder();
      }
    }
  };

  const handleRemoveReminderFromRemindersList = (index: number) => {
    let reminders = [...task.reminders];
    reminders.splice(index, 1);
    onSetTask({ ...task, reminders });
  };

  const getIconForNotificationType = (type: string | null, color?: string) => {
    let icon: ReactNode;
    color = color !== undefined ? color : Theme.text;
    switch (type) {
      case "silencieux":
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

  const reminderExistInRemindersListByHourAndMinute = (
    hour: string,
    minutes: string
  ): boolean => {
    const reminders = task.reminders;
    let result = false;

    for (let i = 0; i < reminders.length; i++) {
      const r = reminders[i];
      if (r.hour === hour && r.minute === minutes) {
        result = true;
      }
    }
    return result;
  };

  const setEveryDaysForReminderNotification = () => {
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
  };

  const setSomeDaysForReminderNotification = () => {
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
  };

  const setBeforeDaysForReminderNotification = () => {
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
  };

  return (
    <BlurView intensity={10} tint="dark" style={styles.blurView}>
      {firstStep &&
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Heure et Rappels</Text>
          </View>
          {task.reminders.length === 0 &&
            <View style={{ padding: Spacing * 1.6, alignItems: "center" }}>
              <Image
                source={require("../../../../assets/add-bell.png")}
                style={{ width: 65, height: 65 }}
              />
            </View>}
          {task.reminders.length === 0
            ? <View style={styles.modalBoxInfo}>
                <Text style={styles.modalInfo}>
                  Vous n'avez aucun rappel pour cette activité.
                </Text>
              </View>
            : <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  height: 200
                }}
              >
                {task.reminders.map((reminder, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        styles.flex,
                        {
                          justifyContent: "space-between",
                          padding: Spacing,
                          borderBottomWidth: 1,
                          borderBottomColor: Theme.darkSecondary
                        }
                      ]}
                    >
                      <TouchableOpacity style={styles.reminderBadge}>
                        {getIconForNotificationType(reminder.notification.type)}
                      </TouchableOpacity>
                      <View>
                        <Text
                          style={{
                            color: Theme.text,
                            textAlign: "center"
                          }}
                        >
                          {reminder.hour}:{reminder.minute}
                        </Text>
                        {reminder.days.length !== 0 &&
                          <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{
                              maxWidth: 200,
                              padding: Spacing / 2
                            }}
                          >
                            {reminder.days.map((day, index) =>
                              <Text
                                key={index}
                                style={{
                                  color: Theme.text,
                                  fontSize: Spacing * 1.2
                                }}
                              >
                                {capitalize(truncate(day, 3))}{" "}
                                {index === reminder.days.length - 1
                                  ? ""
                                  : "◦"}{" "}
                              </Text>
                            )}
                          </ScrollView>}
                        {reminder.notification.interval.beforeDay &&
                          <View>
                            <Text
                              style={{
                                color: Theme.text,
                                fontSize: Spacing * 1.2
                              }}
                            >
                              {
                                reminder.notification.interval.numberOfDayBefore
                              }{" "}
                              jours avant
                            </Text>
                          </View>}
                        {reminder.notification.interval.everyDays &&
                          <View>
                            <Text
                              style={{
                                color: Theme.text,
                                fontSize: Spacing * 1.2
                              }}
                            >
                              Tous les jours
                            </Text>
                          </View>}
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          handleRemoveReminderFromRemindersList(index)}
                        style={styles.reminderBadge}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={24}
                          color={Theme.text}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>}
          <View
            style={{
              flexDirection: "column-reverse"
            }}
          >
            <AcceptOrCancelButtons
              confirmText="Ajouter un rappel"
              cancelText={task.reminders.length > 0 ? "confirmer" : "fermer"}
              onConfirm={() => handleOpenAddReminder()}
              onCancel={() => onSetRemindersIsOpen(false)}
              options={{
                cancelButton: {
                  style: {
                    width: "100%",
                    borderBottomRightRadius: 16,
                    borderBottomLeftRadius: 16
                  }
                },
                confirmButton: {
                  style: {
                    width: "100%"
                  }
                }
              }}
            />
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
              <NumericInput
                value={reminder.hour}
                maxLength={2}
                onChangeText={text => handleHourInputTextChange(text)}
                style={{ borderRadius: 8 }}
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
            <View style={{ padding: Spacing }}>
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
              <NumericInput
                value={reminder.minute}
                maxLength={2}
                onChangeText={text => handleMinutesInputTextChange(text)}
                style={{ borderRadius: 8 }}
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
                { justifyContent: "center", marginVertical: Spacing }
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
                    <Text style={{ fontSize: Spacing * 1.2, color: color }}>
                      {capitalize(type)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {!isSameDay(task.date, new Date()) &&
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
                          onPress={() => handleChangeIntervalChecked(index)}
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
                                    onPress={() => {
                                      handleAddDayToReminderDaysList(day);
                                    }}
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
                                      {truncate(day, 3).toUpperCase()}
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
                            <NumericInput
                              value={reminder.notification.interval.numberOfDayBefore.toString()}
                              maxLength={2}
                              onChangeText={numberOfDay =>
                                handleNumberDayBeforeReminderChange(
                                  numberOfDay
                                )}
                              style={{
                                backgroundColor: Theme.darkConstart,
                                width: 30
                              }}
                            />
                            <Text style={{ color: Theme.textContrast }}>
                              jours avant
                            </Text>
                          </View>
                          {errorForMaxDays &&
                            <Text style={{ fontSize: 11, color: Theme.red }}>
                              Est supérieur au nombre de jours restant avant la
                              date mentionnée.
                            </Text>}
                        </View>}
                    </View>
                  );
                })}
              </View>
            </View>}
          <View style={[styles.flex]}>
            <AcceptOrCancelButtons
              confirmText="confirmer"
              cancelText="fermer"
              onCancel={() => handleCloseAddReminder()}
              onConfirm={() => handleAddReminderInRemindersList()}
              options={{
                cancelButton: {
                  style: {
                    borderBottomLeftRadius: 16
                  }
                },
                confirmButton: {
                  style: {
                    borderBottomRightRadius: 16
                  }
                }
              }}
            />
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
  reminderBadge: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.bgDark
  }
});

export default Reminders;
