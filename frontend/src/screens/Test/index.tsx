import { StyleSheet, Text, View } from 'react-native';

export default function Test() {
  return (
    <View style={styles.container}>
      <Text>Casa 1</Text>
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
