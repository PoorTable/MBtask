import {
    SET_DH,
    GET_CITY_NAME,
    GET_YESTERDAY,
  } from "./dailyhourlyactions";

  const initialState = {
    CityName: "",
    Daily: [],
    Hourly: [],
    Yesterday: [],
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_YESTERDAY:
        return{
          ...state,
          Yesterday: action.Yesterday
        }
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