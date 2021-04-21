import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Alert } from "react-native";
import { BottomTabs } from "./navigation/WeatherNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as SplashScreen from "expo-splash-screen";

import weatherreducer from "./store/weatherreducer";
import dailyhoutlyreducer from './store/dailyhourlyreducer';
import * as weatherActions from "./store/weatheractions";
import * as dailyhourlyactions from './store/dailyhourlyactions';

const rootReducer = combineReducers({
  weather: weatherreducer,
  dailyhoutly: dailyhoutlyreducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        try {
          await dispatch(weatherActions.fetchCities());
        } catch (error) {
          Alert.alert("Error", "Something went wrong during network call", [
            { text: "Okay" },
          ]);
        } finally {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppWrapper;
