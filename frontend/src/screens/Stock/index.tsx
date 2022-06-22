import { SafeAreaView, StyleSheet, Text, View, Image, ActivityIndicator, FlatList } from 'react-native';
import { Dimensions } from 'react-native'
import React from 'react'
import ButtonAdd from '../../components/ButtonAdd'
import ProductItem from '../../components/ProductItem';
import { stockList } from '../../services/stock';
import {
  useFonts,
  JosefinSans_600SemiBold,
  JosefinSans_700Bold,
} from '@expo-google-fonts/josefin-sans';
import {
  OpenSans_400Regular,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';

const SCREEN_WIDTH = Dimensions.get("window").width;


export default function Stock() {
  let [fontsLoaded] = useFonts({
    JosefinSans_600SemiBold,
    JosefinSans_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="small" color="#F07B77"/>
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headContainer}>
          <View >
            <Image
              source={require('../../../assets/Grocer.png')}
              style={{ width: SCREEN_WIDTH * 0.5, height: SCREEN_WIDTH * 0.5 }}
            />
          </View>
          <View>
            <Text style={styles.titleText}>
              Seu{'\n'}Estoque
            </Text>
            <Text style={styles.subtitleText}>
              administre os{'\n'}produtos que você{'\n'}já tem em casa
            </Text>
            <ButtonAdd onPress={() => {console.log('casa')}} title='Adicionar'/>
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
          style={styles.flatlistContainer}
          showsVerticalScrollIndicator={false}
          data={stockList}
          renderItem={({ item, index }) =>
            <ProductItem
            onPress={()=> {console.log(item.name)}}
              item={item} />
          }/>
        </View>
      </SafeAreaView>
    );
  }    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F07B77',
  },
  listContainer: {
    paddingTop: SCREEN_WIDTH * 0.05,
    backgroundColor: '#F5f5f5',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  flatlistContainer: {
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  headContainer: {
    marginTop: SCREEN_WIDTH * 0.05,
    marginBottom: SCREEN_WIDTH * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SCREEN_WIDTH * 0.05,
  },
  titleText: {
    marginBottom: SCREEN_WIDTH * 0.03,
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'JosefinSans_700Bold',
    textAlign: 'right',
  },
  subtitleText: {
    marginBottom: SCREEN_WIDTH * 0.03,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'OpenSans_700Bold',
    textAlign: 'right',
  },
});
