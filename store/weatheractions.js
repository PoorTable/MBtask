import City from "../models/City";

export const GET_CITIES = "GET_CITIES";
export const GET_CITY = "GET_CITY";
export const SELECT_CITY = "SELECT_CITY";
export const NERROR = "NERROR";
export const SET_PERMISSION = "SET_PERMISSION";
export const GET_CITY_NAME = "SET_CITY_NAME";
export const SET_DH = "SET_DH";

const apik = "2ecc8cdc74d9e8fdb6f53505f378ea75";

export const getCityName = (lat, lon) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2ecc8cdc74d9e8fdb6f53505f378ea75`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&appid=2ecc8cdc74d9e8fdb6f53505f378ea75`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

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

    dispatch({ type: SET_DH, Daily: loaded, Hourly: loadedHourly });
  };
};

export const selectCity = (City) => {
  return { type: SELECT_CITY, City: City };
};

export const setPermission = () => {
  console.log("dsadas");
  return { type: SET_PERMISSION };
};

export const fetchCities = () => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/box/city?bbox=26,49,27,52,10&appid=2ecc8cdc74d9e8fdb6f53505f378ea75`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const Cities = resData.list;
    const loadedCity = [];
    Cities.forEach((element) => {
      loadedCity.push(
        new City(
          +element.id,
          element.name,
          element.main.temp,
          element.weather[0].icon,
          element.dt,
          10800
        )
      );
      console.log(loadedCity);
    });

    dispatch({ type: GET_CITIES, City: loadedCity });
  };
};

export const fetchCity = (searchText) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&appid=2ecc8cdc74d9e8fdb6f53505f378ea75`
    );

    if (!response.ok) {
      var loadedCity = new City(searchText, response.message, 1, searchText, 1);
      dispatch({ type: GET_CITY, City: loadedCity });
    } else {
      const resData = await response.json();
      var loadedCity = new City(
        resData.id,
        resData.name,
        resData.main.temp,
        resData.weather[0].icon,
        resData.dt,
        resData.timezone
      );

      dispatch({ type: GET_CITY, City: loadedCity });
    }
  };
};
