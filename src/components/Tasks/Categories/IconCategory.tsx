import { ReactNode } from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

type Props = {
  category: string;
  color: string;
  size: number
};

const IconCategory: React.FC<Props> = ({ category, color, size }) => {
  let icon: ReactNode;

  switch (category) {
    case "tâche":
      icon = <FontAwesome5 name="tasks" size={size} color={color} />;
      break;
    case "santé":
      icon = (
        <FontAwesome5 name="hand-holding-medical" size={size} color={color} />
      );
      break;
    case "travail":
      icon = <MaterialIcons name="work" size={size} color={color} />;
      break;
    case "méditation":
      icon = <FontAwesome5 name="mug-hot" size={size} color={color} />;
      break;
    default:
      icon = <FontAwesome5 name="clock" size={size} color={color} />;
      break;
  }
  return icon;
};

export default IconCategory;
