import { SafeAreaView, StyleSheet, Text, View, icon } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const CityBox = (props) => {
  return (
    <View style={styles.CitiBox}>
      <Text style={styles.CitiBoxName}>{props.cityName}</Text>
      <Feather style={styles.CityIcon} name="sun" size={32} color="black" />
      <Text style={styles.temperature}>+30 C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  CitiBox: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    width: 140,
    height: 124,
    // display:'flex',
    //  flexDirection:'column',
    // justifyContent:'center',
  },
  CitiBoxName: {
    fontSize: 20,
    marginTop: 10,
    // borderWidth:2,
    textAlign: "center",
  },
  CityIcon: {
    marginTop: 9,
    // borderWidth:2,
    textAlign: "center",
  },
  temperature: {
    fontSize: 17,
    marginTop: 5,
    // borderWidth:2,
    textAlign: "center",
  },
});

export default CityBox;
