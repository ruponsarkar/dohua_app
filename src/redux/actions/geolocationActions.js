// actions/geolocationActions.js
import { useState } from "react";
export const FETCH_LOCATION_REQUEST = "FETCH_LOCATION_REQUEST";
export const FETCH_LOCATION_SUCCESS = "FETCH_LOCATION_SUCCESS";
export const FETCH_LOCATION_FAILURE = "FETCH_LOCATION_FAILURE";

import Geolocation from "react-native-geolocation-service";
import opencage from "opencage-api-client";



export const fetchLocation = () => {



  return (dispatch) => {
   
    console.log("solchee");
    dispatch({ type: FETCH_LOCATION_REQUEST });

    Geolocation.getCurrentPosition(
      (position) => {
        console.log("position=======>>> here==>>", position);

        const key = "e1302b58fbc74c14a40fd32f08eb2727";
        const cord = position.coords.latitude + "," + position.coords.longitude;

         opencage.geocode({ key, q: cord }).then((response) => {
        
          dispatch({
            type: FETCH_LOCATION_SUCCESS,
            payload: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              address: response.results[0].formatted
            },
          });
        });

       
      },
      (error) => {
        dispatch({
          type: FETCH_LOCATION_FAILURE,
          payload: error.message,
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
};
