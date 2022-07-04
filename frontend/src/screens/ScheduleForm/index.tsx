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
  ScrollView,
  TextInput,
  View,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaskedTextInput } from "react-native-mask-text";
import { Dimensions } from "react-native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { productsList } from "../../services/products";
import CalendarPicker from "../../components/CalendarPicker";
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
const eventType = [
  {
    label: "Aniversário",
    value: "0",
  },
  {
    label: "Casamento",
    value: "1",
  },
  {
    label: "Festa",
    value: "2",
  },
  {
    label: "Outros",
    value: "3",
  },
];
const ScheduleForm = () => {
  const [selected, setSelected] = useState();
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const nav = useNavigation<MenuScreenProp>();
  const currentDate = new Date();
  const onFinish = () => {
    nav.navigate("Menu");
  };

  const addAmount = (type: number) => {
    if (type === 1) setAmount(amount + 25);
    else setAmount(amount + 1);
  };
  const reduceAmount = (type: number) => {
    if (amount === 0 || amount - 1 < 0 || (type === 1 && amount - 25 < 0))
      return;
    else if (type === 1) setAmount(amount - 25);
    else setAmount(amount - 1);
  };
  const checkItem = (type: number) => {
    return productsList
      .filter((i) => i.type === type)
      .map((item) => {
        return (
          <View style={[styles.twoInputsContainer]}>
            <BouncyCheckbox
              style={{ marginLeft: 10 }}
              size={25}
              fillColor="#F07B77"
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: "#F07B77" }}
              textStyle={{
                fontFamily: "OpenSans_400Regular",
                textDecorationLine: "none",
              }}
              text={item.name}
              onPress={(isChecked: boolean) => {
                console.log(type);
              }}
            />
            <View style={[styles.twoInputsContainer]}>
              <TextInput
                keyboardType="numeric"
                onChangeText={(e) => setAmount(parseInt(e))}
                value={amount.toString()}
                style={[
                  {
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    width: width * 0.15,
                  },
                ]}
                placeholder="Quantidade"
              />
              <View style={[styles.twoInputsContainer]}>
                <ButtonIcon
                  onPress={() => reduceAmount(type)}
                  type="remove"
                  icon="remove"
                />
                <ButtonIcon
                  onPress={() => addAmount(type)}
                  type="add"
                  icon="add"
                />
              </View>
            </View>
          </View>
        );
      });
  };
  // const handleAmount = (value) => {
  //   // eslint-disable-next-line use-isnan
  //   if (value === NaN) setAmount(0);
  //   setAmount(parseInt(value));
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Header>Voltar</Header>
      <ScrollView style={styles.containerContainer}>
        <Text style={styles.titleText}>Agendamento</Text>
        <View>
          <CalendarPicker item={currentDate} />
        </View>
        <View>
          <Text style={styles.inputText}>Nome do produto</Text>
          <TextInput
            onChangeText={(e) => setName(e)}
            value={name}
            style={styles.input}
            placeholder="Nome do Cliente"
          />
          <View>
            <Text style={styles.inputText}>Tipo de Evento</Text>
            <View style={styles.picker}>
              <RNPickerSelect
                onValueChange={(value) => setSelected(value)}
                items={eventType}
              />
            </View>
            <View>
              <Text style={styles.inputText}>Tortas & Bolos</Text>
              {checkItem(0)}
            </View>
            <View>
              <Text style={styles.inputText}>Salgados</Text>
              {checkItem(1)}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.inputText}>Valor recebido</Text>
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
                  style={[styles.input, { width: width * 0.4 }]}
                  placeholder="Valor recebido"
                />
              </View>
              <View>
                <Text style={styles.inputText}>Valor acertado</Text>
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
                  style={[styles.input, { width: width * 0.4 }]}
                  placeholder="Valor acertado"
                />
              </View>
            </View>
          </View>
          <ButtonAdd
            onPress={() => onFinish()}
            title={"Salvar"}
            color="#F07B77"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerContainer: {
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  twoInputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    borderWidth: 1,
    borderColor: "#373737",
    marginVertical: SCREEN_WIDTH * 0.04,
  },
  input: {
    height: 45,
    marginVertical: SCREEN_WIDTH * 0.04,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default ScheduleForm;
