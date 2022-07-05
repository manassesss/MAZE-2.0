import { StyleSheet, Text, View, Animated, TextComponent } from "react-native";
import { Dimensions } from "react-native";
import moment, { Moment, months } from "moment";
import React from "react";
import ButtonIcon from "../ButtonIcon";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;
const { width, height } = Dimensions.get("screen");

type Props = {
  item: Date;
};

const CalendarPicker: React.FC<Props> = ({ item }) => {
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  function obterDia(dia: string, date: Date, abreviado?: boolean) {
    const days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    const days_abreviado = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const dayName = days_abreviado[date.getDay()];
    return dayName;
  }
  function getAllDaysInMonth(year: number, month: number) {
    const date = new Date(year, month, 1);
    const dates = [];
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
  const itemMonthsCalendar = (month: string) => {
    return <Text style={[styles.textItem3]}>{month}</Text>;
  };
  const itemDaysCalendar = (date: Date) => {
    return (
      <View style={[styles.container]}>
        <Text style={styles.textItem2}>
          {obterDia(moment(date).format("DD/MM/YYYY"), date, true)}
        </Text>
        <Text style={styles.textItem}>{moment(date).format("DD")}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={months}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <View>{itemMonthsCalendar(item)}</View>;
        }}
      />
      <FlatList
        data={getAllDaysInMonth(item.getFullYear(), item.getMonth())}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ marginEnd: SCREEN_WIDTH * 0.05 }}>
              {itemDaysCalendar(item)}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 80,
    width: 40,
    backgroundColor: "transparent",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textItem: {
    color: "#373737",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  textItem2: {
    color: "#373737",
    opacity: 0.62,
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
  textItem3: {
    color: "#373737",
    opacity: 0.4,
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
    textAlign: "left",
    marginEnd: SCREEN_WIDTH * 0.05,
  },
});

export default CalendarPicker;
