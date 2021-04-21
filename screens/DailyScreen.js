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
import * as dailyhourlyactions from "../store/dailyhourlyactions";
import moment from "moment";

import CityLine from "../components/CityLine";
import ModalActivityIndcator from "../components/ModalActivityIndicator";
import NoData from '../components/NoData';

const DailyScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [ps, setPs] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const Cities = useSelector((state) => state.dailyhoutly.Daily);
  var Cities1 = Cities;
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
        navigation.navigate("Daily");
      });

    return unsubscribe;
  }, [navigation]);

  const getLoc = async () => {
    setisLoading(true);
    try {
      var loca = await Location.getCurrentPositionAsync({});
      setLocation(loca);
    } catch {
      setPs(false);
      Cities1 = [];
      console.log(Cities1);
      setisLoading(false);
      return;
    }
    try {
      await dispatch(
        dailyhourlyactions.getCityName(loca.coords.latitude, loca.coords.longitude)
      );
      await dispatch(
        dailyhourlyactions.selectDH(loca.coords.latitude, loca.coords.longitude)
      );
      setisLoading(false);
      return;
    } catch (error) {
      Alert.alert("Error", "Something went wrong during network call", [
        { text: "Okay" },
      ]);
    } finally {
      setisLoading(false);
    }
  };

  const pTRHandler = async () => {
    getLoc();
  };

  useEffect(() => {
    let f = async () => {
      await getPermStatus();
      getLoc();
    };
    f();
  }, []);
  
  return (
    <SafeAreaView style={styles.fl}>
      {isLoading ? (
        <ModalActivityIndcator show={true} />
      ) : ps ? (
        <View>
          <View style={styles.sr}>
            <FlatList
              data={Cities}
              renderItem={(itemData) => (
                <CityLine
                  name={moment(new Date(itemData.item.time)).format("MMMM, Do")}
                  temp={itemData.item.temperature.day}
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
        <NoData onPress={getPerm} />
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
  const tit = useSelector((state) => state.dailyhoutly.CityName);
  return {
    title: tit,
    headerTitleAlign: "left",
  };
};

export default DailyScreen;
