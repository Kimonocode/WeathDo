import { BlurView } from "expo-blur";
import React, { Dispatch, SetStateAction } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import Spacing from "../../../../config/Spacing";
import Theme from "../../../../config/Theme";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { TaskInterface } from "../../../models/Task/TaskInterface";
import NumericInput from "../../Inputs/NumericInput";

type Props = {
  task:TaskInterface
  onSetTask:Dispatch<SetStateAction<TaskInterface>>
  onSetPriorityOpen:Dispatch<SetStateAction<boolean>>
}

const Priorities: React.FC<Props> = ({
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
          <NumericInput 
            maxLength={3}
            value={task.priority.toString()}
            onChangeText={text => onSetTask({ ...task, priority: +text })}
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

const styles = StyleSheet.create({
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
    width: 60,
    height: 60,
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
});

export default Priorities;
