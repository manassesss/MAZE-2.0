import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes';
import 'react-native-gesture-handler';


export default function App() {
  return (
    <View style={{ flex:1} }>
      <StatusBar style="auto" />
      <Routes/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
