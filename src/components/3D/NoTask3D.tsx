import { View, Text, Image } from "react-native";
import Spacing from "../../../config/Spacing";
import Theme from "../../../config/Theme";

const NoTask3D = () => {
  return (
    <View
      style={{
        height: 500,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../../assets/search.png")}
        style={{
          width: 100,
          height: 100,
         
        }}
      />
      <Text
        style={{
          color: Theme.text,
          fontSize: Spacing * 1.8,
          marginBottom: Spacing
        }}
      >
        C'est un peu vide ici...
      </Text>
      <Text
        style={{
          color: Theme.text,
          fontSize: Spacing * 1.4
        }}
      >
        Commençons par ajouter une tâche
      </Text>
    </View>
  );
};

export default NoTask3D;
