import { TouchableHighlight, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
type Props = {
  onPress: () => void;
  type: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const ButtonIcon = ({ onPress, type, icon }: Props) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor={type === "delete" ? "#171717" : "#F07B77"}
    style={[
      type === "edit"
        ? styles.appButtonContainerEdit
        : type === "delete"
        ? styles.appButtonContainerDelete
        : styles.appButtonContainerGhost,
      styles.appappButtonContainer,
      type === "edit" || type === "delete"
        ? styles.circleButton
        : styles.normalButton,
    ]}
  >
    <Ionicons
      name={icon}
      size={20}
      color={type === "delete" ? "white" : "black"}
    />
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  // ...
  appappButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circleButton: {
    height: 50,
    width: 50,
    elevation: 8,
    borderRadius: 25,
  },
  normalButton: {
    height: 50,
    width: 50,
    elevation: 8,
    borderRadius: 10,
  },
  appButtonContainerEdit: {
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
  },
  appButtonContainerDelete: {
    backgroundColor: "#F07B77",
  },
  appButtonContainerGhost: {
    backgroundColor: "#FFFFFF",
  },
  appButtonText: {
    fontSize: 12,
    color: "#373737",
    fontWeight: "bold",
    alignSelf: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default ButtonIcon;
