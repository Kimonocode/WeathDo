import { StyleProp, StyleSheet, TextStyle } from "react-native"
import { TextInput } from "react-native"
import Spacing from "../../../config/app/Spacing";
import Theme from "../../../config/app/Theme";

type Props = {
  onChangeText: (text: string) => void,
  maxLength?: number|undefined,
  style: StyleProp<TextStyle>
}

const NumericInput:React.FC<Props> = ({onChangeText, maxLength, style}) => {

    return <TextInput
      onChangeText={onChangeText}
      keyboardType="numeric"
      maxLength={maxLength}
      style={[styles.input, style]}
    >
    </TextInput>
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Theme.darkSecondary,
    width: 60,
    height: 60,
    color: Theme.white,
    fontSize: Spacing * 2,
    textAlign: "center",
    borderWidth: 1,
    borderColor: Theme.darkConstart
  }
});