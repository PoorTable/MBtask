import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  icon,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";

const CityBox = (props) => {
  return (
    <TouchableOpacity style={styles.CitiBox}>
      {props.isRefresh ? (
        <View style={styles.centred}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          <Text style={styles.CitiBoxName}>{props.cityName}</Text>
          <Fontisto
            style={styles.CityIcon}
            name={props.wicon}
            size={35}
            color="black"
          />
          <Text style={styles.temperature}>{Math.round(props.temp)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CitiBox: {
    flex: 1,

    margin: 15,
    height: 120,
    borderWidth: 2,
    borderRadius: 5,
  },
  CitiBoxName: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },
  CityIcon: {
    marginTop: 9,
    textAlign: "center",
  },
  temperature: {
    fontSize: 17,
    marginTop: 5,
    textAlign: "center",
  },
  centred: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CityBox;
