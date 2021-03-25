import React from "react";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const HourlyScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello, it's Hourly Screen!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HourlyScreen;
