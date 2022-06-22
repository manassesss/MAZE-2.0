import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { Dimensions } from 'react-native'
import React from 'react';

const SCREEN_WIDTH = Dimensions.get("window").width;
const { width, height } = Dimensions.get("screen");

type Props = {
    onPress: any; 
    item: any;
    scale: any;
    opacity: any;
}

const ProductItem: React.FC<Props> = ({onPress, item, scale, opacity}) => (
    <Animated.View style={[styles.appButtonContainer, styles.shadowProp, {transform: [{ scale: scale }],opacity: opacity,}]}>
      <View style={styles.cardContainer}>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text>Quantidade: {item.amount}</Text>
        <Text>Preço: {item.price}</Text>
      </View>
    </Animated.View>
  );

  const styles = StyleSheet.create({
    // ...
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginTop: SCREEN_WIDTH * 0.03,
        paddingVertical: SCREEN_WIDTH * 0.06,
        paddingHorizontal: SCREEN_WIDTH * 0.03,
        //marginBottom: SCREEN_WIDTH * 0.03,
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
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.2,
      shadowRadius: 1,
    }
    });
export default ProductItem;