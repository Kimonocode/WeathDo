import React, { ReactNode } from "react";
import { Feather } from "@expo/vector-icons";
import Theme from "../../../../../config/Theme";

type Props = {
  type: string | null;
  color?: string;
  size?: number;
};

const NotificationIcon: React.FC<Props> = ({ type, color, size }) => {
  let icon: ReactNode;
  color = color !== undefined ? color : Theme.text;
  size = size !== undefined ? size : 24;
  switch (type) {
    case "silencieux":
      icon = <Feather name="bell-off" size={size} color={color} />;
      break;
    case "notification":
      icon = <Feather name="bell" size={size} color={color} />;
      break;
    default:
      icon = <Feather name="clock" size={size} color={color} />;
  }
  return icon;
};

export default NotificationIcon;
