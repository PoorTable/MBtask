import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const NoData = (props) =>{
    return(
    <View style={styles.container}>
        <Image source={require("../assets/NoData.png")} />
        <Text style={styles.Name}>Data is not Availble</Text>

        <Text style={styles.descr}>
            Cannnot determine Your current location
        </Text>

        <TouchableOpacity onPress={props.onPress} title="" style={styles.access}>
            <Text style={styles.text}>Allow access</Text>
        </TouchableOpacity>
    </View>
    )
    
}

const styles = StyleSheet.create({
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
});

export default NoData;