import { StyleProp, StyleSheet, TextStyle } from "react-native"
import { TextInput } from "react-native"
import Spacing from "../../../config/Spacing";
import Theme from "../../../config/Theme";

type Props = {
  value: string
  onChangeText: (text: string) => void,
  maxLength?: number|undefined,
  style?: StyleProp<TextStyle>
}

const NumericInput:React.FC<Props> = ({value, onChangeText, maxLength, style}) => {

    return <TextInput
      value={value}
      onChangeText={text => {
        if(text === ','){
          text = '0';
        }
        text = text
          .replace(',','')
          .replace('.','')
          .replace('-','')
        onChangeText(text); 
      }}
      keyboardType="number-pad"
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

export default NumericInput;