import City from "../models/City";

export const SET_DH = "SET_DH";
export const GET_CITY_NAME = "SET_CITY_NAME";

const apik = "2ecc8cdc74d9e8fdb6f53505f378ea75";

export const getCityName = (lat, lon) => {
    return async (dispatch, getState) => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apik}`
      );
  
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      console.log(response.status);
      const resData = await response.json();
  
      const loadedCity = new City(
        +resData.id,
        resData.name,
        resData.main.temp,
        resData.weather[0].icon
      );
  
      console.log(loadedCity);
  
      dispatch({ type: GET_CITY_NAME, City: loadedCity });
    };
  };
  
  export const selectDH = (lat, lon) => {
    return async (dispatch, getState) => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&appid=${apik}`
      );
  
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      console.log(response.status);
      const resData = await response.json();
      const Hourly = resData.hourly.slice(0, 24);
      const loadedHourly = [];
      Hourly.forEach((element) => {
        if (
          new Date(element.dt * 1000).getDate() === new Date(Date.now()).getDate()
        ) {
          loadedHourly.push(
            new City(
              Math.random().toString(),
              1,
              element.temp,
              element.weather[0].icon,
              element.dt
            )
          );
        }
      });
      const Daily = resData.daily;
      const loaded = [];
  
      Daily.forEach((element) => {
        loaded.push(
          new City(
            Math.random().toString(),
            1,
            element.temp,
            element.weather[0].icon,
            element.dt
          )
        );
      });
      console.log(loadedHourly);
      dispatch({ type: SET_DH, Daily: loaded, Hourly: loadedHourly });
    };
  };