import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import ButtonAdd from "../../components/ButtonAdd";
import ButtonIcon from "../../components/ButtonIcon";
import Header from "../../components/Header";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Keyboard,
  ScrollView,
  TextInput,
  View,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { MaskedTextInput } from "react-native-mask-text";
import { Dimensions } from "react-native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type RoutesList = {
  StockForm: undefined;
  Menu: undefined;
};

type MenuScreenProp = CompositeNavigationProp<
  StackNavigationProp<RoutesList, "StockForm">,
  BottomTabNavigationProp<RoutesList, "Menu">
>;

const SCREEN_WIDTH = Dimensions.get("window").width;
const { width } = Dimensions.get("screen");
const measurementType = [
  {
    label: "quilograma (Kg)",
    value: "0",
  },
  {
    label: "grama (g)",
    value: "1",
  },
  {
    label: "miligrama (mg)",
    value: "2",
  },
  {
    label: "litro (L)",
    value: "3",
  },
  {
    label: "mililitro (mL)",
    value: "4",
  },
];
const StockForm = () => {
  const [selected, setSelected] = useState();
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const nav = useNavigation<MenuScreenProp>();

  const onFinish = () => {
    nav.navigate("Menu");
  };

  const addAmount = () => {
    setAmount(amount + 1);
  };
  const reduceAmount = () => {
    if (amount === 0 || amount - 1 < 0) return;
    else setAmount(amount - 1);
  };

  // const handleAmount = (value) => {
  //   // eslint-disable-next-line use-isnan
  //   if (value === NaN) setAmount(0);
  //   setAmount(parseInt(value));
  // };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={"position"}>
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../assets/Grocer2.png")}
                style={{
                  width: SCREEN_WIDTH * 0.6,
                  height: SCREEN_WIDTH * 0.6,
                }}
              />
            </View>
            <View>
              <Text style={styles.inputText}>Nome do produto</Text>
              <TextInput
                onChangeText={(e) => setName(e)}
                value={name}
                style={styles.input}
                placeholder="Nome do produto"
              />
              <Text style={styles.inputText}>Valor unitário</Text>
              <MaskedTextInput
                type="currency"
                options={{
                  prefix: "R$",
                  decimalSeparator: ".",
                  groupSeparator: ",",
                  precision: 2,
                }}
                keyboardType="numeric"
                onChangeText={(text, rawText) =>
                  setPrice(parseFloat(rawText) / 100)
                }
                value={price.toString()}
                style={styles.input}
                placeholder="Valor unitário"
              />
              <Text style={styles.inputText}>Quantidade</Text>
              <View style={[styles.twoInputsContainer]}>
                <View style={[styles.picker, { width: "50%" }]}>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle
                    style={{
                      inputIOSContainer: {
                        padding: 20,
                      },
                    }}
                    onValueChange={(value) => setSelected(value)}
                    items={measurementType}
                  />
                </View>
                <View style={[styles.twoInputsContainer]}>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={(e) => {
                      if (isNaN(parseInt(e))) setAmount(0);
                      else setAmount(parseInt(e));
                    }}
                    value={amount.toString()}
                    style={[
                      styles.input,
                      {
                        width: width * 0.15,
                      },
                    ]}
                    placeholder="Quantidade"
                  />
                  <View style={[styles.twoInputsContainer]}>
                    <ButtonIcon
                      onPress={reduceAmount}
                      type="remove"
                      icon="remove"
                    />
                    <ButtonIcon onPress={addAmount} type="add" icon="add" />
                  </View>
                </View>
              </View>
              <ButtonAdd onPress={onFinish} title={"Salvar"} color="#F07B77" />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
  containerContainer: {
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  twoInputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    color: "#373737",
    fontSize: 28,
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
  },
  inputText: {
    fontFamily: "OpenSans_600SemiBold",
    color: "#373737",
  },
  picker: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    marginVertical: SCREEN_WIDTH * 0.04,
  },
  input: {
    height: 45,
    marginVertical: SCREEN_WIDTH * 0.04,
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    padding: 10,
  },
});

export default StockForm;
