// actions/geolocationActions.js
import { useState } from "react";
export const FETCH_LOCATION_REQUEST = "FETCH_LOCATION_REQUEST";
export const FETCH_LOCATION_SUCCESS = "FETCH_LOCATION_SUCCESS";
export const FETCH_LOCATION_FAILURE = "FETCH_LOCATION_FAILURE";

import Geolocation from "react-native-geolocation-service";
import opencage from "opencage-api-client";

export const fetchLocation = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_LOCATION_REQUEST });
    console.log("here...........");
    Geolocation.getCurrentPosition(
      (position) => {
        const key = "e1302b58fbc74c14a40fd32f08eb2727";
        const cord = position.coords.latitude + "," + position.coords.longitude;
        console.log(".....here2........", cord);

        opencage.geocode({ key, q: cord }).then((response) => {
          dispatch({
            type: FETCH_LOCATION_SUCCESS,
            payload: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              address: response.results[0].formatted,
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

export const saveToken = (user, token) => {
  return (dispatch) => {
    dispatch({
      type: 'login',
      payload: {
        user: user,
        token: token,
      },
    });
  };
};

export const removeToken = (user, token) => {
  return (dispatch) => {
    dispatch({
      type: 'logout',
      payload: {
        user: null,
        token: null,
      },
    });
  };
};
