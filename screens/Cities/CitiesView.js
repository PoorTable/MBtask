import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";


import HeaderInput from "../../components/HeaderInput";
import CityBox from "../../components/CityBox";
import CityLine from "../../components/CityLine";
import ModalActivityIndcator from "../../components/ModalActivityIndicator";


export default function CitiesScreen({ navigation, ...props}) {
    const {
        pTRHandler,
        SelectCityHandler,
        ClearText,
        Cities,
        Citiy,
        loading,
        loaded,
        searchText,
        isRefreshing,
        changeTextHandler,
        isEmpty
} = props
    return (
        <View style={styles.container}>
        <View style={styles.searchBar}>
            <HeaderInput
            value={searchText}
            onChangeText={(text) => changeTextHandler(text)}
            isEmpty={isEmpty}
            onClick={() => {
                ClearText();
            }}
            />
        </View>

        {loading ? (
            <ModalActivityIndcator show={true} />
        ) : searchText === "" ? (
            <FlatList
            data={Cities}
            renderItem={(itemData) => (
                <CityBox
                cityName={itemData.item.name}
                temp={itemData.item.temperature}
                wicon={itemData.item.wcondition}
                isRefresh={isRefreshing}
                onClick={() => {
                    SelectCityHandler(itemData.item);
                }}
                />
            )}
            numColumns={2}
            refreshing={isRefreshing}
            onRefresh={() => {
                pTRHandler();
            }}
            />
        ) : Citiy.name === undefined ? (
            <View style={styles.container}>
            <View style={styles.centred}>
                <Image source={require("../../assets/NoData.png")} />
                <Text style={styles.text}>No data for {Citiy.id}</Text>
            </View>
            </View>
        ) : (
            <View style={styles.container}>
            <View style={styles.sr}>
                <Text style={styles.text}>Search results</Text>
            </View>
            <View style={styles.results}>
                <CityLine
                onClick={() => {
                    SelectCityHandler(Citiy);
                }}
                name={Citiy.name}
                temp={Citiy.temperature}
                wicon={Citiy.wcondition}
                />
            </View>
            </View>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    centred: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      paddingVertical: 5,
      fontSize: 20,
      fontWeight: "bold",
    },
    sr: {
      marginVertical: 10,
      width: "90%",
      marginStart: "5%",
    },
    results: { alignItems: "center", justifyContent: "center" },
    searchBar: {
      marginTop: 15,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      height: 90,
    },
    cancel: {
      display: "flex",
    },
  });