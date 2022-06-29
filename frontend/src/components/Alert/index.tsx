import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import ButtonAdd from "../ButtonAdd";
interface ModalProps {
  visible: boolean;
  close: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const Alert = ({ title, content, visible, close, onConfirm }: ModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent
      statusBarTranslucent
      visible={visible}
      style={styles.modalView}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.contentText}>{content}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={{ marginRight: SCREEN_WIDTH * 0.02 }}>
              <ButtonAdd title="Cancelar" color="#FFFFFF" onPress={close} />
            </View>
            <View style={{ marginLeft: SCREEN_WIDTH * 0.02 }}>
              <ButtonAdd
                title="Confirmar"
                color="#F07B77"
                onPress={() => {
                  onConfirm();
                  close();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "OpenSans_700Bold",
  },
  contentText: {
    marginBottom: SCREEN_WIDTH * 0.03,
    marginTop: SCREEN_WIDTH * 0.03,
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
  },
});

export default Alert;
