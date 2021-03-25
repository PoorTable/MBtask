import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import CitiesScreen, {
  screenOptions as CitiesScreenOptions,
} from "../screens/CitiesScreen";
import DailyScreen from "../screens/DailyScreen";
import HourlyScreen from "../screens/HourlyScreen";
import SelectedCityScreen from "../screens/SelectedCityScreen";

const WeatherStack = createStackNavigator();

export const WS = () => {
  return (
    <WeatherStack.Navigator>
      <WeatherStack.Screen
        name="Cities"
        component={CitiesScreen}
        options={CitiesScreenOptions}
      />
      <WeatherStack.Screen name="SelectedCity" component={SelectedCityScreen} />
    </WeatherStack.Navigator>
  );
};

const BottomTab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <BottomTab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#694fad" }}
      labelStyle={{ fontSize: 12 }}
    >
      <BottomTab.Screen
        name="Cities"
        component={WS}
        options={{
          tabBarLabel: "Cities",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={26} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Daily"
        component={DailyScreen}
        options={{
          tabBarLabel: "Daily",
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={26} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Hourly"
        component={HourlyScreen}
        options={{
          tabBarLabel: "Hourly",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-time-outline" size={26} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
