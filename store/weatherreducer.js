import {
  GET_CITIES,
  GET_CITY,
  SELECT_CITY,
  SET_LOADING,
  SET_LOADED
} from "./weatheractions";

const initialState = {
  cities: [],
  city: {},
  selectedCity: {},
  CityName: "",
  Daily: [],
  Hourly: [],
  isLoading: false,
  isLoaded: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADED:
      return{
        ...state,
        isLoaded: action.isLoaded
      }
    case SET_LOADING:
      return{
        ...state,
        isLoading: action.isLoading
      };
    case GET_CITIES:
      return {
        ...state,
        cities: action.City,
      };
    case GET_CITY:
      return {
        ...state,
        error: action.City.name === undefined ? true : false,
        city: action.City,
      };
    case SELECT_CITY:
      return {
        ...state,
        selectedCity: action.City,
      };
    default:
      return state;
  }
};
