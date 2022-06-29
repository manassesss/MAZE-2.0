import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Modal,
} from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import ButtonAdd from "../../components/ButtonAdd";
import ProductItem from "../../components/ProductItem";
import Alert from "../../components/Alert";
import { stockList } from "../../services/stock";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

const SCREEN_WIDTH = Dimensions.get("window").width;
const { height } = Dimensions.get("screen");
const SIZE_ITEM = 70 + 20 * 2;
type RoutesList = {
  StockForm: undefined;
  Menu: undefined;
};

type StockScreenProp = CompositeNavigationProp<
  StackNavigationProp<RoutesList, "Menu">,
  BottomTabNavigationProp<RoutesList, "StockForm">
>;

export default function Stock() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const nav = useNavigation<StockScreenProp>();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [itemToDelete, setItemToDelete] = React.useState<any>();

  const handleModalVisible = (item: unknown) => {
    setItemToDelete(item);
    setModalVisible(true);
  };

  const handleDelete = () => {
    console.log("deletamos");
  };
  const navToAdd = () => {
    nav.navigate("StockForm");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <View>
          <Image
            source={require("../../../assets/Grocer.png")}
            style={{ width: SCREEN_WIDTH * 0.5, height: SCREEN_WIDTH * 0.5 }}
          />
        </View>
        <View>
          <Text style={styles.titleText}>Seu{"\n"}Estoque</Text>
          <Text style={styles.subtitleText}>
            administre os{"\n"}produtos que você{"\n"}já tem em casa
          </Text>
          <ButtonAdd onPress={navToAdd} title="Adicionar" color="#FFFFFF" />
        </View>
      </View>
      <View style={styles.listContainer}>
        <Animated.FlatList
          ListFooterComponentStyle={{ flex: 1, height: height * 0.08 }}
          ListFooterComponent={<View />}
          style={styles.flatlistContainer}
          showsVerticalScrollIndicator={false}
          data={stockList}
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
              <ProductItem
                scale={scale}
                opacity={opacity}
                onPress={() => handleModalVisible(item)}
                item={item}
              />
            );
          }}
        />
        <Alert
          visible={modalVisible}
          close={() => setModalVisible(false)}
          onConfirm={handleDelete}
          title={"Atenção!"}
          content="Você tem certeza de que deseja excluir este item do stock?"
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
    marginHorizontal: SCREEN_WIDTH * 0.05,
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
    textAlign: "right",
  },
  subtitleText: {
    marginBottom: SCREEN_WIDTH * 0.03,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    textAlign: "right",
  },
});
