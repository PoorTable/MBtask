import React, { useState, useEffect } from "react";
import { View, Modal, ActivityIndicator } from "react-native";

const ModalActivityIndicator = (props) => {
  const {
    show = false,
    color = "green",
    backgroundColor = "white",
    dimLights = 0.6,
    loadingMessage = "Doing stuff ...",
  } = props;
  return (
    <Modal transparent={true} animationType="none" visible={show}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `rgba(0,0,0,${dimLights})`,
        }}
      >
        <View
          style={{
            padding: 13,
            backgroundColor: `${backgroundColor}`,
            borderRadius: 13,
          }}
        >
          <ActivityIndicator animating={show} color={color} size="large" />
        </View>
      </View>
    </Modal>
  );
};

export default ModalActivityIndicator;
