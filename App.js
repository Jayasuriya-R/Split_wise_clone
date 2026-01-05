import { StyleSheet, View, StatusBar } from 'react-native';
import MainNavigation from "./Navigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './Context/AuthProvider';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
});
