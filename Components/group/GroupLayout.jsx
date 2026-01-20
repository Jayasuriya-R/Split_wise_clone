import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import GroupAppBar from "./GroupAppBar";
import { SafeAreaProvider } from "react-native-safe-area-context";

const GroupLayout = ({ children }) => {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.container}>
        <GroupAppBar />

        <Text style={styles.text}>All Groups</Text>

        <View style={{ flex: 1 }}>
          {children}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default GroupLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
    color: "black",
  },
  scrollContent: {
    flex: 1,
  },
});
