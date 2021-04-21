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
import moment from "moment";

import CityLine from "../components/CityLine";
import ModalActivityIndcator from "../components/ModalActivityIndicator";
import NoData from '../components/NoData';

const DailyView = ({ props }) => {

    const{
        location,
        ps,
        isLoading,
        pTRHandler,
        getLoc,
        Cities,
        Cities1,
        getPerm,
    }=props
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
