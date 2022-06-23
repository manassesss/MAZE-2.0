import { View, TouchableHighlight, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from 'react';
import { Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';


type Props = {
    onPress: any; 
    type: string;
}


const SCREEN_WIDTH = Dimensions.get("window").width;
const { width, height } = Dimensions.get("screen");

const iconSize = SCREEN_WIDTH * 0.05;

const ButtonIcon: React.FC<Props> = ({onPress, type}) => (
    <TouchableHighlight onPress={onPress} style={[ type == 'edit' ? styles.appButtonContainerEdit : styles.appButtonContainerDelete, styles.appappButtonContainer]}>
      <Ionicons name={type == 'edit' ? 'create-outline' : 'trash-outline' } size={20} color={type == 'edit' ? 'black' : 'white'}/>
    </TouchableHighlight>
  );

const styles = StyleSheet.create({
// ...
appappButtonContainer:{
  height:50,
  width: 50,
  elevation: 8,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center'
},
appButtonContainerEdit: {
  borderWidth: 1,
  backgroundColor: "#FFFFFF",
    
},
appButtonContainerDelete: {
  backgroundColor: "#F07B77",
},
appButtonText: {
    fontSize: 12,
    color: "#373737",
    fontWeight: "bold",
    alignSelf: "center",
},
shadowProp: {
  shadowColor: '#171717',
  shadowOffset: {width: -2, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 3,
}
})

export default ButtonIcon;