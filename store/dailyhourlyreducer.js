import {
    SET_DH,
    GET_CITY_NAME,
  } from "./dailyhourlyactions";

  const initialState = {
    CityName: "",
    Daily: [],
    Hourly: [],
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_DH:
        return {
          ...state,
          Daily: action.Daily,
          Hourly: action.Hourly,
        };
      case GET_CITY_NAME:
        return {
          ...state,
          CityName: action.City.name,
        };
        default:
      return state;
    }
}