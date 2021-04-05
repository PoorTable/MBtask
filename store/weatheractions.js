import City from "../models/City";

export const GET_CITIES = "GET_CITIES";
export const GET_CITY = "GET_CITY";

const apik = "2ecc8cdc74d9e8fdb6f53505f378ea75";

export const fetchCities = () => {
  return async (dispatch, getState) => {
    try {
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
            element.weather[0].icon
          )
        );
        console.log(loadedCity);
      });

      dispatch({ type: GET_CITIES, City: loadedCity });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchCity = (searchText) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&appid=2ecc8cdc74d9e8fdb6f53505f378ea75`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    var loadedCity = new City(resData.id, resData.name, resData.main.temp, 1);

    dispatch({ type: GET_CITY, City: loadedCity });
  };
};
