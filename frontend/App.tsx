import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import Routes from "./src/routes";
import "react-native-gesture-handler";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import {
  JosefinSans_600SemiBold,
  JosefinSans_700Bold,
} from "@expo-google-fonts/josefin-sans";

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
    OpenSans_600SemiBold,
    JosefinSans_600SemiBold,
    JosefinSans_700Bold,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="small" color="#F07B77" />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar animated={true} />
        <Routes />
      </View>
    );
  }
}
