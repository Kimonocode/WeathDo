import React from 'react'
import { Falsy, StyleProp, StyleSheet, StyleSheetProperties, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import Theme from '../../../config/Theme';
import Spacing from '../../../config/Spacing';

type Props = {
  cancelText:string,
  confirmText:string,
  onConfirm:() => void,
  onCancel:() => void,
  options?:{

    cancelButton?:{
      style?:ViewStyle
    },
    confirmButton?:{
      style?:ViewStyle
    }
  }
}

const AcceptOrCancelButtons:React.FC<Props> = ({cancelText, confirmText, onConfirm, onCancel, options}) => {

  return (
    <>
      <TouchableOpacity
      onPress={() => onCancel()}
        style={[
          styles.button,
          options?.cancelButton?.style
        ]}
      >
        <Text style={styles.btnText}>{cancelText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, options?.confirmButton?.style]} onPress={() => onConfirm()}>
        <Text style={[styles.btnText, { color: Theme.primary }]}>
          {confirmText}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
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
});

export default AcceptOrCancelButtons;