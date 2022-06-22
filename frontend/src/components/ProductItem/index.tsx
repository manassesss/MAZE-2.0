import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native'
import React from 'react';

const SCREEN_WIDTH = Dimensions.get("window").width;

type Props = {
    onPress: any; 
    item: any;
}

const ProductItem: React.FC<Props> = ({onPress, item}) => (
    <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer, styles.shadowProp]}>
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text>Quantidade: {item.amount}</Text>
        <Text>Preço: {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingVertical: SCREEN_WIDTH * 0.05,
        paddingHorizontal: SCREEN_WIDTH * 0.02,
        marginBottom: SCREEN_WIDTH * 0.03,
    },
    cardContainer: {
        
        marginHorizontal: SCREEN_WIDTH * 0.05,
      },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    }
    });
export default ProductItem;