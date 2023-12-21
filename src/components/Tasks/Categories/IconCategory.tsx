import { ReactNode } from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

type Props = {
  category: string;
  color: string;
};

const IconCategory: React.FC<Props> = ({ category, color }) => {
  let icon: ReactNode;

  switch (category) {
    case "tâche":
      icon = <FontAwesome5 name="tasks" size={24} color={color} />;
      break;
    case "santé":
      icon = (
        <FontAwesome5 name="hand-holding-medical" size={24} color={color} />
      );
      break;
    case "travail":
      icon = <MaterialIcons name="work" size={24} color={color} />;
      break;
    case "méditation":
      icon = <FontAwesome5 name="mug-hot" size={24} color={color} />;
      break;
    default:
      icon = <FontAwesome5 name="clock" size={24} color={color} />;
      break;
  }
  return icon;
};

export default IconCategory;
