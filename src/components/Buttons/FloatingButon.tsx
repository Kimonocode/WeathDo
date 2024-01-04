import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Theme from "../../../config/Theme";

type Props = {
  onPress?: () => void;
};

const FloatingButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: 60,
          height: 60,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Theme.primary,
          position: "absolute",
          bottom: 20,
          right: 20,
          elevation: 10
        }
      ]}
    >
      <Ionicons name="add" size={24} color={Theme.white} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
