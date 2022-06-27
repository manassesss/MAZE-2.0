import { StyleSheet, Text, View, Animated } from "react-native";
import { Dimensions } from "react-native";
import React from "react";
import ButtonIcon from "../ButtonIcon";

interface Item {
  name: string;
  amount: string;
  price: string;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const { width, height } = Dimensions.get("screen");

type Props = {
  onPress: () => void;
  item: Item;
  scale: number;
  opacity: number;
};

const ProductItem: React.FC<Props> = ({ onPress, item, scale, opacity }) => (
  <Animated.View
    style={[
      styles.appButtonContainer,
      styles.shadowProp,
      { transform: [{ scale: scale }], opacity: opacity },
    ]}
  >
    <View style={styles.cardContainer}>
      <Text style={styles.titleText}>{item?.name}</Text>
      <Text>Quantidade: {item?.amount}</Text>
      <Text>Preço: {item?.price}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <ButtonIcon
        onPress={() => {
          console.log("a");
        }}
        type="edit"
        icon="create-outline"
      />
      <ButtonIcon
        onPress={() => {
          console.log("a");
        }}
        type="delete"
        icon="trash-outline"
      />
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    flexDirection: "row",
    elevation: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: SCREEN_WIDTH * 0.03,
    paddingVertical: SCREEN_WIDTH * 0.06,
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    //marginBottom: SCREEN_WIDTH * 0.03,
  },
  cardContainer: {
    flex: 0.6,
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  buttonContainer: {
    justifyContent: "space-between",
    flex: 0.4,
    flexDirection: "row",
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
});

export default ProductItem;
