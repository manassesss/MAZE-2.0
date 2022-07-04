import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

type Props = {
  children: string;
};
const { width, height } = Dimensions.get("window");

const Header = ({ children }: Props) => {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => nav.goBack()}>
        <Ionicons name="arrow-back" size={20} color="#373737" />
        <Text>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    height: height * 0.07,
    padding: width * 0.05,
    marginBottom: height * 0.02,
    marginTop: Constants.statusBarHeight * 0.02,
  },
  button: {
    marginRight: width * 0.04,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: "#FCFCFF",
    fontSize: width / 24,
    marginLeft: width * 0.04,
  },
});

export default Header;
