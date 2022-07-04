import { StyleSheet, Text, View, Animated } from "react-native";
import { Dimensions } from "react-native";
import moment, { Moment } from "moment";
import React from "react";
import ButtonIcon from "../ButtonIcon";
import { Ionicons } from "@expo/vector-icons";

interface Item {
  id: number;
  clientName: string;
  date: Date;
  eventType: {
    id: number;
    name: string;
    color: string;
  };
  receivedValue: number;
  price: number;
  note: string;
  items: [];
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const { width, height } = Dimensions.get("screen");

type Props = {
  onPress: () => void;
  item: [];
};
const ScheduleItem: React.FC<Props> = ({ onPress, item }) => {
  const info = () => {
    return item.map((element: Item) => {
      return (
        <View>
          <View style={[styles.itemContainer]}>
            <Text style={styles.titleText}>{element.clientName}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={[
                  styles.tagContainer,
                  { backgroundColor: element.eventType?.color },
                ]}
              >
                <Text style={[styles.titleText, { color: "#FFFFFF" }]}>
                  {element.eventType?.name}
                </Text>
              </View>
              <Ionicons
                name="trash"
                size={24}
                color="#F07B77"
                onPress={onPress}
              />
            </View>
          </View>
        </View>
      );
    });
  };
  return <View style={[styles.container, styles.shadowProp]}>{info()}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginTop: SCREEN_WIDTH * 0.01,
    paddingVertical: SCREEN_WIDTH * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    elevation: 8,
  },
  itemContainer: {
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
    paddingVertical: SCREEN_WIDTH * 0.01,
    paddingLeft: SCREEN_WIDTH * 0.03,
    paddingRight: SCREEN_WIDTH * 0.03,
    //marginBottom: SCREEN_WIDTH * 0.03,
  },
  titleText: {
    color: "#525257",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "OpenSans_700Bold",
  },
  tagContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: width * 0.3,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
});

export default ScheduleItem;
