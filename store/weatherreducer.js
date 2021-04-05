import {
  GET_CITIES,
  GET_CITY,
  SELECT_CITY,
  NERROR,
  SET_PERMISSION,
  SET_DH,
  GET_CITY_NAME,
} from "./weatheractions";

const initialState = {
  cities: [],
  city: {},
  selectedCity: {},
  error: false,
  CityName: "",
  Daily: [],
  Hourly: [],
  hasPerm: false,
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
    case SET_PERMISSION:
      return {
        ...state,
        hasPerm: true,
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
    case NERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
