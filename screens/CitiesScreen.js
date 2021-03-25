import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import HeaderInput from "../components/HeaderInput";

export default function CitiesScreen(props) {
  const [searchText, setSeacrhText] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const changeTextHandler = (text) => {
    setSeacrhText(text);
  };

  useEffect(() => {
    setIsEmpty(searchText === "" ? false : true);
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
