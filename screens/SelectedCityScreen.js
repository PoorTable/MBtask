import React from "react";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Fontisto } from "@expo/vector-icons";

const SelectedCityScreen = (props) => {
  const date = moment(
    new Date(
      props.route.params.City.time + props.route.params.City.tz - 10800000
    )
  ).format("MMMM, Do");
  const time = moment(
    new Date(
      props.route.params.City.time + props.route.params.City.tz - 10800000
    )
  ).format("LT");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.time}>{date}</Text>
      <Text style={styles.time}>{time}</Text>
      <Fontisto
        style={styles.WeatherIcon}
        name={props.route.params.City.wcondition}
        size={100}
        color="black"
      />
      <Text style={styles.time}>
        {Math.round(props.route.params.City.temperature) >= 0 ? "+" : ""}
        {Math.round(props.route.params.City.temperature)} C
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
  },
  WeatherIcon: {
    marginVertical: 20,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.City.name,
    headerTitleAlign: "center",
  };
};
export default SelectedCityScreen;
