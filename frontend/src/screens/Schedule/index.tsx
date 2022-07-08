import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
} from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import ButtonAdd from "../../components/ButtonAdd";
import Alert from "../../components/Alert";
import { scheduleList } from "../../services/schedules";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import ScheduleItem from "../../components/ScheduleItem";
import moment from "moment";

const SCREEN_WIDTH = Dimensions.get("window").width;
const { height } = Dimensions.get("screen");
const SIZE_ITEM = 70 + 20 * 2;

type RoutesList = {
  ScheduleForm: undefined;
  Menu: undefined;
};

type StockScreenProp = CompositeNavigationProp<
  StackNavigationProp<RoutesList, "Menu">,
  BottomTabNavigationProp<RoutesList, "ScheduleForm">
>;

export default function Schedule() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const nav = useNavigation<StockScreenProp>();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [itemToDelete, setItemToDelete] = React.useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scheduleDates = scheduleList.map((item) => item.date);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scheduleDict: any = {};
  // eslint-disable-next-line prettier/prettier
  scheduleDates.map((item) => scheduleDict[moment(item).format("DD/MM/YYYY")] = scheduleList.filter(i => moment(i.date).format("DD/MM/YYYY") === moment(item).format("DD/MM/YYYY")));

  const handleModalVisible = (item: unknown) => {
    setItemToDelete(item);
    setModalVisible(true);
  };

  const handleDelete = () => {
    console.log(Object.keys(scheduleDict).length);
  };
  const navToAdd = () => {
    nav.navigate("ScheduleForm");
  };

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

    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const options = { weekday: "short", month: "long", day: "numeric" };

    if (!abreviado) {
      const data = moment(dia, "DD/MM/YYYY");
      const das = data.toDate();
      //return dayName + ', ' + dia.split('/')[1] + ' de ' + meses[d.getMonth()];
      return (
        days[date.getDay()] +
        ", " +
        (parseInt(dia.split("/")[0]) + 1) +
        " de " +
        meses[parseInt(dia.split("/")[1]) - 1]
      );
      //return moment(dia).format('DD/MMM/YYYY');
    } else {
      const d = new Date(dia);
      const dayName = days_abreviado[date.getDay()];
      return dayName;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <View>
          <Text style={styles.titleText}>Sua{"\n"}Agenda</Text>
          <Text style={styles.subtitleText}>
            administre as{"\n"}encomendas que você{"\n"}já tem marcadas
          </Text>
          <ButtonAdd onPress={navToAdd} title="Adicionar" color="#FFFFFF" />
        </View>
        <View>
          <Image
            source={require("../../../assets/Calendar.png")}
            style={{ width: SCREEN_WIDTH * 0.5, height: SCREEN_WIDTH * 0.5 }}
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        <Animated.FlatList
          ListFooterComponentStyle={{ flex: 1, height: height * 0.08 }}
          ListFooterComponent={<View />}
          style={styles.flatlistContainer}
          showsVerticalScrollIndicator={false}
          data={Object.keys(scheduleDict)}
          keyExtractor={(index) => index}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              SIZE_ITEM * index,
              SIZE_ITEM * (index + 1),
            ];
            const opacityInputRange = [
              -1,
              0,
              SIZE_ITEM * index,
              SIZE_ITEM * (index + 0.5),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <Animated.View
                key={index}
                style={[
                  styles.itemContainer,
                  { transform: [{ scale: scale }], opacity: opacity },
                ]}
              >
                <Text style={styles.itemText}>
                  {obterDia(item, scheduleDict[item][0].date)}
                </Text>
                <ScheduleItem
                  onPress={() => handleModalVisible(item)}
                  item={scheduleDict[item]}
                />
              </Animated.View>
            );
          }}
        />
        <Alert
          visible={modalVisible}
          close={() => setModalVisible(false)}
          onConfirm={handleDelete}
          title={"Atenção!"}
          content="Você tem certeza de que deseja excluir este evento da sua agenda?"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F07B77",
  },
  listContainer: {
    //paddingTop: SCREEN_WIDTH * 0.05,
    flex: 1,
    backgroundColor: "#F5f5f5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  flatlistContainer: {
    marginTop: SCREEN_WIDTH * 0.03,
    marginHorizontal: SCREEN_WIDTH * 0.04,
  },
  headContainer: {
    marginTop: SCREEN_WIDTH * 0.05,
    marginBottom: SCREEN_WIDTH * 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  titleText: {
    marginBottom: SCREEN_WIDTH * 0.03,
    color: "#FFFFFF",
    fontSize: 28,
    fontFamily: "JosefinSans_700Bold",
    textAlign: "left",
  },
  subtitleText: {
    marginBottom: SCREEN_WIDTH * 0.03,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    textAlign: "left",
  },
  itemText: {
    color: "#525257",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "OpenSans_700Bold",
  },
  itemContainer: {
    marginTop: SCREEN_WIDTH * 0.01,
    paddingVertical: SCREEN_WIDTH * 0.02,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
  },
});
