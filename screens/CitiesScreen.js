import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import HeaderInput from "../components/HeaderInput";
import CityBox from "../components/CityBox";

export default function CitiesScreen(props) {
  const [searchText, setSeacrhText] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const Hi = async (text) => {
    Alert.alert(text);

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=2ecc8cdc74d9e8fdb6f53505f378ea75`
    );
    const resData = await res.json();
    console.log(resData);
  };
  const timerRef = useRef(null);
  const changeTextHandler = (text) => {
    setSeacrhText(text);
  };

  useEffect(() => {
    setIsEmpty(searchText === "" ? false : true);
    if (searchText.length != 0) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout((text) => Hi(searchText), 150);
      if (searchText.length <= 1) {
        clearTimeout(timerRef.current);
      }
    }
  }),
    [changeTextHandler];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBar}>
          <HeaderInput
            value={searchText}
            onChangeText={(text) => changeTextHandler(text)}
            isEmpty={isEmpty}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Cities Screen</Text>
          <CityBox />
          <Button
            title="ddsa"
            onPress={() => {
              props.navigation.navigate("SelectedCity");
            }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    height: 50,
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
