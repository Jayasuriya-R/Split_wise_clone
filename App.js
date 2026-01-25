import { StyleSheet, View, StatusBar } from 'react-native';
import MainNavigation from "./Navigation";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './Context/AuthProvider';
import { SQLiteProvider } from 'expo-sqlite';
import { onErrorConnectingDB, onInitDB } from './sql';
import { Suspense } from 'react';
import FallBack from './Screens/Fallback/FallBack';
import AppStateProvider from './Context/AppStateProvider';

export default function App() {
  return (
    <SafeAreaProvider >
      <Suspense fallback={<FallBack />}>
        <SQLiteProvider databaseName='splits.db' onInit={onInitDB} onError={onErrorConnectingDB}>
          <AuthProvider>
            <AppStateProvider>
              <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
              <View style={styles.container}>
                <MainNavigation />
              </View>
            </AppStateProvider>
          </AuthProvider>

        </SQLiteProvider>
      </Suspense>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
});
