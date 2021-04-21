import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as weatherActions from "../store/weatheractions";

import HeaderInput from "../components/HeaderInput";
import CityBox from "../components/CityBox";
import CityLine from "../components/CityLine";
import ModalActivityIndcator from "../components/ModalActivityIndicator";

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const Cities = useSelector((state) => state.weather.cities);
  var Citiy = useSelector((state) => state.weather.city);
  const loading = useSelector((state)=> state.weather.isLoading);
  const loaded = useSelector((state)=> state.weather.isLoaded);

  const timerRef = useRef(null);
  const changeTextHandler = (text) => {
    setSeacrhText(text);
  };

  const ClearText = () => {
    dispatch(weatherActions.setIsLoaded(false));
    setSeacrhText("");
    Citiy = null;
  };

  function isSymbols(input) {
    return input.replace(/\[.,?:;$!@#$%^&*()+_~`±§]*/g,'').length < 1;
  }

  function isNullOrWhitespace(input) {
    if (typeof input === "undefined" || input == null) return true;
    if(!isSymbols(input)){
      if(!input.replace(/\s/g, "").length < 1){
        return input.replace(/\d/g, "").length < 1;
      }
    }
    
    

  }

  useEffect(() => {
    setIsEmpty(searchText === "" ? false : true);

    if (!isNullOrWhitespace(searchText)) {
      clearTimeout(timerRef.current);
      
      timerRef.current = setTimeout(async () => {
        try {
          setSeacrhText(searchText.trim());
          await dispatch(weatherActions.fetchCity(searchText));
        } catch (error) {
          Alert.alert("Error", "Something went wrong during network call", [
            { text: "Okay" },
          ]);
        } finally {
          
        }
        Citiy = console.log(Citiy);
      }, 500);
      if (searchText === "") {
        clearTimeout(timerRef.current);
      }
    }
  }, [searchText]);

  const pTRHandler = async () => {
    try {
      await dispatch(weatherActions.fetchCities());
    } catch (error) {
      Alert.alert("Error", "Something went wrong during network call", [
        { text: "Okay" },
      ]);
    } finally {
    }
  };

  const SelectCityHandler = async (City) => {
    navigation.navigate("SelectedCity", { City: City });
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
            <Image source={require("../assets/NoData.png")} />
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

export const screenOptions = (navData) => {
  return {
    headerShown: false,
  };
};
