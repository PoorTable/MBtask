import { GET_CITIES, GET_CITY } from "./weatheractions";

const initialState = {
  cities: [],
  city: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.City,
      };
    case GET_CITY:
      return {
        ...state,
        city: action.City,
      };
    default:
      return state;
  }
};
