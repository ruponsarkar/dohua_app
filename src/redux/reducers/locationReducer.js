// reducers/geolocationReducer.js
import {
    FETCH_LOCATION_REQUEST,
    FETCH_LOCATION_SUCCESS,
    FETCH_LOCATION_FAILURE
  } from '../actions/geolocationActions';
  
  const initialState = {
    loading: false,
    latitude: null,
    longitude: null,
    error: null,
    address: null,
  };
  
  const geolocationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_LOCATION_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_LOCATION_SUCCESS:
        return {
          ...state,
          loading: false,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          error: null,
          address: action.payload.address
        };
      case FETCH_LOCATION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default geolocationReducer;
  