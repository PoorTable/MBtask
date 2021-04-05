import React, { useEffect } from "react";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const DailyScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent default behavior

      e.preventDefault();

      console.log("hi");
      navigation.navigate("Daily");
      // ...
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello, it's Daily Screen!</Text>
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

export default DailyScreen;
