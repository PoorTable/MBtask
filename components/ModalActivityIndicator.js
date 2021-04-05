import React, { useState, useEffect } from "react";
import { View, Modal, ActivityIndicator } from "react-native";

const ModalActivityIndicator = (props) => {
  const { show = false, color = "green", dimLights = 0.6 } = props;
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
