import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Dimensions } from "react-native";

type Props = {
  onPress: () => void;
  title: string;
  color: string;
};

const SCREEN_WIDTH = Dimensions.get("window").width;

const ButtonAdd: React.FC<Props> = ({ onPress, title, color }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.appButtonContainer,
      styles.shadowProp,
      { backgroundColor: color },
    ]}
  >
    <Text
      style={[
        styles.appButtonText,
        color === "#FFFFFF" ? { color: "#373737" } : { color: "#FFFFFF" },
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    borderRadius: 10,
    paddingVertical: SCREEN_WIDTH * 0.05,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
  },
  appButtonText: {
    fontSize: 12,

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

export default ButtonAdd;
