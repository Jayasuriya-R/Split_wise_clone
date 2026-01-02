import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

const Home = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Home</Text>
  </View>
);
const Body = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Body</Text>
  </View>
);

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Body" component={Body}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700" },
});
