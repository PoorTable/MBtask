import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as weatherActions from "../store/weatheractions";

import HeaderInput from "../components/HeaderInput";
import CityBox from "../components/CityBox";
import City from "../models/City";

export default function CitiesScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation
      .dangerouslyGetParent()
      .addListener("tabPress", (e) => {
        e.preventDefault();

        pTRHandler();
        navigation.navigate("Cities");
      });

    return unsubscribe;
  }, [navigation]);

  const [searchText, setSeacrhText] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [city, setCity] = useState();
  const dispatch = useDispatch();
  const Cities = useSelector((state) => state.weather.cities);
  const Citiy = useSelector((state) => state.weather.city);

  const timerRef = useRef(null);
  const changeTextHandler = (text) => {
    setSeacrhText(text);
  };
  const ClearText = () => {
    setSeacrhText("");
  };

  useEffect(() => {
    setIsEmpty(searchText === "" ? false : true);
    if (searchText != "") {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        setIsLoaded(false);
        await dispatch(weatherActions.fetchCity(searchText));
        setIsLoaded(true);
        console.log(Citiy);
      }, 500);
      if (searchText === "") {
        clearTimeout(timerRef.current);
      }
    }
  }, [searchText]);

  const pTRHandler = async () => {
    setIsRefreshing(true);
    await dispatch(weatherActions.fetchCities());
    setIsRefreshing(false);
  };

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

      {searchText === "" ? (
        <FlatList
          data={Cities}
          renderItem={(itemData) => (
            <CityBox
              cityName={itemData.item.name}
              temp={itemData.item.temperature}
              wicon={itemData.item.wcondition}
              isRefresh={isRefreshing}
            />
          )}
          numColumns={2}
          refreshing={isRefreshing}
          onRefresh={() => {
            pTRHandler();
          }}
        />
      ) : isLoaded ? (
        <View>
          <Text>{Citiy.name}</Text>
        </View>
      ) : (
        <View>
          <Text></Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export const screenOptions = (navData) => {
  return {
    headerShown: false,
  };
};
