import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import ButtonAdd from "../../components/ButtonAdd";
import ButtonIcon from "../../components/ButtonIcon";
import DatePicker from "react-native-datepicker";
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaskedTextInput } from "react-native-mask-text";
import { Dimensions } from "react-native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { productsList } from "../../services/products";
import moment from "moment";
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
const eventTypes = [
  {
    label: "Aniversário",
    color: "#E6EA2D",
    value: "0",
  },
  {
    label: "Casamento",
    color: "#EE9999",
    value: "1",
  },
  {
    label: "Festa",
    color: "#533DEB",
    value: "2",
  },
  {
    label: "Outros",
    color: "#6ABD4B",
    value: "3",
  },
];
const ScheduleForm = () => {
  const [eventType, setEventType] = useState<string>();
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [agreedPrice, setAgreedPrice] = useState<number>(0);
  const [receivedPrice, setReceivedPrice] = useState<number>(0);
  const [date, setDate] = useState(new Date(1598051730000));
  const [note, setNote] = useState<string>("");

  const [dateText, setDateText] = useState<string>(
    moment(new Date()).format("DD/MM/YYYY")
  );
  const nav = useNavigation<MenuScreenProp>();
  const onFinish = () => {
    const data = {
      clientName: name,
      date: date,
      eventType: {
        id: eventType,
        name: eventTypes.find((item) => item.value === eventType)?.label,
        color: eventTypes.find((item) => item.value === eventType)?.color,
      },
      agreedPrice: agreedPrice,
      receivedPrice: receivedPrice,
    };
    nav.navigate("Menu");
  };
  const addAmount = (type: number) => {
    if (type === 1) setAmount(amount + 25);
    else setAmount(amount + 1);
  };
  const reduceAmount = (type: number) => {
    if (amount === 0 || amount - 1 < 0) return;
    else if (type === 1 && amount - 25 < 0) setAmount(amount - 1);
    else if (type === 1) setAmount(amount - 25);
    else setAmount(amount - 1);
  };
  const checkItem = (type: number) => {
    return productsList
      .filter((i) => i.type === type)
      .map((item) => {
        return (
          <View
            key={item.id}
            style={[{ justifyContent: "space-between", flexDirection: "row" }]}
          >
            <BouncyCheckbox
              style={{ marginLeft: 10 }}
              size={25}
              fillColor="#F07B77"
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: "#F07B77" }}
              textStyle={{
                fontSize: 14,
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
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 8,
                    marginRight: 2,
                    padding: 10,
                    width: width * 0.14,
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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={"padding"}>
        <ScrollView style={[]}>
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../assets/Calendar2.png")}
                style={{
                  width: SCREEN_WIDTH * 0.6,
                  height: SCREEN_WIDTH * 0.6,
                }}
              />
            </View>
            <Text style={styles.inputText}>Nome do Cliente</Text>
            <TextInput
              onChangeText={(e) => setName(e)}
              value={name}
              style={styles.input}
              placeholder="Nome do Cliente"
            />
            <Text style={styles.inputText}>Data do Evento</Text>
            <DatePicker
              style={[styles.picker, { width: "100%" }]}
              date={date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(dateString: string, date: Date) => {
                setDate(date);
              }}
              customStyles={{
                dateIcon: {
                  display: "none",
                },
                dateInput: {
                  borderWidth: 0,
                },
              }}
            />
            {/* <MaskedTextInput
              mask="99/99/9999"
              onChangeText={(text, rawText) => setDateText(text)}
              keyboardType="numeric"
              value={dateText}
              style={[styles.input, { width: "80%" }]}
              placeholder="Data do evento"
            /> */}

            {/* <ButtonIcon
              onPress={showDatepicker}
              type="calendar"
              icon="calendar"
            /> */}
            <View>
              <Text style={styles.inputText}>Tipo de Evento</Text>
              <View style={styles.picker}>
                <RNPickerSelect
                  style={{
                    inputIOSContainer: {
                      padding: 20,
                    },
                  }}
                  onValueChange={(value) => setEventType(value)}
                  items={eventTypes}
                />
              </View>
              <View>
                <Text style={styles.inputText}>Tortas & Bolos</Text>
                {checkItem(0)}
              </View>
              <View>
                <Text style={styles.inputText}>Vai ter salgado?</Text>
                <View
                  style={[
                    { justifyContent: "space-between", flexDirection: "row" },
                  ]}
                >
                  <BouncyCheckbox
                    style={{ marginLeft: 10 }}
                    size={25}
                    fillColor="#F07B77"
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "#F07B77" }}
                    textStyle={{
                      fontSize: 14,
                      fontFamily: "OpenSans_400Regular",
                      textDecorationLine: "none",
                    }}
                    text={"Vaaaai"}
                    onPress={(isChecked: boolean) => {
                      console.log("oi");
                    }}
                  />
                  <View style={[styles.twoInputsContainer]}>
                    <TextInput
                      keyboardType="numeric"
                      onChangeText={(e) => setAmount(parseInt(e))}
                      value={amount.toString()}
                      style={[
                        {
                          height: 45,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                          borderRadius: 8,
                          marginRight: 2,
                          padding: 10,
                          width: width * 0.14,
                        },
                      ]}
                      placeholder="Quantidade"
                    />
                    <View style={[styles.twoInputsContainer]}>
                      <ButtonIcon
                        onPress={() => reduceAmount(1)}
                        type="remove"
                        icon="remove"
                      />
                      <ButtonIcon
                        onPress={() => addAmount(1)}
                        type="add"
                        icon="add"
                      />
                    </View>
                  </View>
                </View>
              </View>

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
                    setReceivedPrice(parseFloat(rawText) / 100)
                  }
                  value={receivedPrice.toString()}
                  style={[styles.input]}
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
                    setAgreedPrice(parseFloat(rawText) / 100)
                  }
                  value={agreedPrice.toString()}
                  style={[styles.input]}
                  placeholder="Valor acertado"
                />
              </View>
            </View>
            <Text style={styles.inputText}>Anotações</Text>
            <TextInput
              onChangeText={(e) => setName(e)}
              value={name}
              multiline={true}
              style={[styles.input]}
              placeholder="Anotações"
            />
            <View style={{ marginBottom: SCREEN_WIDTH * 0.05 }}>
              <ButtonAdd
                onPress={() => onFinish()}
                title={"Salvar"}
                color="#F07B77"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: SCREEN_WIDTH * 0.07,
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
