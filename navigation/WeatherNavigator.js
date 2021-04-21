import React from "react";
import { Platform, TextPropTypes } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import CitiesPresenter, {
  screenOptions as CitiesScreenOptions,
} from "../screens/Cities/CitiesPresenter";
import DailyPresenter, {
  screenOptions as DailyScreenOptions,
} from "../screens/Daily/DailyPresenter";
import HourlyScreen, {
  screenOptions as HourlyScreenOptions,
} from "../screens/HourlyScreen";
import SelectedCityScreen, {
  screenOptions as SelectedCityScreenOptions,
} from "../screens/SelectedCityScreen";

const WeatherStack = createStackNavigator();

export const WS = () => {
  return (
    <WeatherStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureResponseDistance:{
          horizontal: 200
        },
        gestureDirection:  'vertical-inverted',
        cardStyleInterpolator:
          Platform.OS === "Android"
            ? CardStyleInterpolators.forFadeFromBottomAndroid
            : CardStyleInterpolators.forVerticalIOS,
      }}
    >
      <WeatherStack.Screen
        name="Cities"
        component={CitiesPresenter}
        options={CitiesScreenOptions}
      />
      <WeatherStack.Screen
        name="SelectedCity"
        component={SelectedCityScreen}
        options={SelectedCityScreenOptions}
      />
    </WeatherStack.Navigator>
  );
};

const DS = createStackNavigator();
export const DailyStack = () => {
  return (
    <DS.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureResponseDistance:{
          horizontal: 200
        },
        gestureDirection:  'vertical-inverted',
        cardStyleInterpolator:
          Platform.OS === "Android"
            ? CardStyleInterpolators.forFadeFromBottomAndroid
            : CardStyleInterpolators.forVerticalIOS,
      }}
    >
      <DS.Screen
        name="Daily"
        component={DailyPresenter}
        options={DailyScreenOptions}
      />
    </DS.Navigator>
  );
};
const HS = createStackNavigator();
export const HourlyStack = () => {
  return (
    <HS.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureResponseDistance:{
          horizontal: 200
        },
        
        gestureDirection:  'vertical-inverted',
        cardStyleInterpolator:
          Platform.OS === "Android"
            ? CardStyleInterpolators.forFadeFromBottomAndroid
            : CardStyleInterpolators.forVerticalIOS,
      }}
    >
      <HS.Screen
        name="Hourly"
        component={HourlyScreen}
        options={HourlyScreenOptions}
      />
    </HS.Navigator>
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
        component={DailyStack}
        options={{
          tabBarLabel: "Daily",
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={26} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Hourly"
        component={HourlyStack}
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
