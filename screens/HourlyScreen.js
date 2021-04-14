import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import * as weatherActions from "../store/weatheractions";
import moment from "moment";

import CityLine from "../components/CityLine";
import ModalActivityIndcator from "../components/ModalActivityIndicator";

const HourlyScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [ps, setPs] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const Cities = useSelector((state) => state.weather.Hourly);

  const getPerm = async () => {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    if (status === "granted") {
      setPs(true);
      getLoc();
    } else {
      setPs(false);
    }
  };

  const getPermStatus = async () => {
    const { status, expires, permissions } = await Permissions.getAsync(
      Permissions.LOCATION
    );
    console.log(status);
    console.log(ps);
    if (status === "granted") {
      setPs(true);
      getLoc();
    }
  };
  useEffect(() => {
    const unsubscribe = navigation
      .dangerouslyGetParent()
      .addListener("tabPress", (e) => {
        e.preventDefault();
        getPermStatus();

        if (ps) {
          getLoc();
        }

        navigation.navigate("Hourly");
      });

    return unsubscribe;
  }, [navigation]);

  const getLoc = async () => {
    setisLoading(true);
    let loca = await Location.getCurrentPositionAsync({});
    setLocation(loca);
    try {
      await dispatch(
        weatherActions.getCityName(loca.coords.latitude, loca.coords.longitude)
      );
      await dispatch(
        weatherActions.selectDH(loca.coords.latitude, loca.coords.longitude)
      );
    } catch (error) {
      Alert.alert("Error", "Something went wrong during network call", [
        { text: "Okay" },
      ]);
    } finally {
      setisLoading(false);
    }
  };

  const pTRHandler = async () => {
    try {
      setisLoading(true);
      let loca = await Location.getCurrentPositionAsync({});
      await dispatch(
        weatherActions.getCityName(loca.coords.latitude, loca.coords.longitude)
      );
      await dispatch(
        weatherActions.selectDH(loca.coords.latitude, loca.coords.longitude)
      );
    } catch (error) {
      Alert.alert("Error", "Something went wrong during network call", [
        { text: "Okay" },
      ]);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    let f = async () => {
      getPermStatus();
    };
    f();
  }, []);
  return (
    <SafeAreaView style={styles.fl}>
      {isLoading ? (
        <ModalActivityIndcator show={true} />
      ) : Cities.length > 0 ? (
        <View>
          <View style={styles.sr}>
            <FlatList
              data={Cities}
              renderItem={(itemData) => (
                <CityLine
                  name={moment(new Date(itemData.item.time)).format("LT")}
                  temp={itemData.item.temperature}
                  wicon={itemData.item.wcondition}
                  DH={true}
                />
              )}
              refreshing={isLoading}
              onRefresh={() => {
                pTRHandler();
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Image source={require("../assets/NoData.png")} />
          <Text style={styles.Name}>Data is not Availble</Text>
          <Text style={styles.descr}>
            Cannnot determine Your current location
          </Text>
          <TouchableOpacity onPress={getPerm} title="" style={styles.access}>
            <Text style={styles.text}>Allow access</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fl: {
    flex: 1,
  },
  Name: {
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  access: {
    backgroundColor: "#694fad",
    marginVertical: 15,
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  descr: {
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sr: {
    marginVertical: 10,
    width: "100%",
    marginStart: "5%",
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export const screenOptions = (navData) => {
  const tit = useSelector((state) => state.weather.CityName);
  const date = moment(new Date()).format("MMMM, Do");
  return {
    title: tit + " - " + date,
    headerTitleAlign: "left",
  };
};

export default HourlyScreen;
