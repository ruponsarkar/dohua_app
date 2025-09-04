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
        // const key = "e1302b58fbc74c14a40fd32f08eb2727";
        const key = "97c87e82240d4d758adc2d38d5296a24";
        // const cord = position.coords.latitude + "," + position.coords.longitude;
        const cord = `${position.coords.latitude},${position.coords.longitude}`;
        console.log(".....here2........", position);
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${cord}&key=${key}`;

        fetch(url)
          .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
              console.log("OpenCage API ERROR:", data.status); // <-- real error code & message here
              throw new Error(data.status.message || "Unknown API error");
            }
            console.log("OpenCage API success:", JSON.stringify(data)); // <-- API response data);

            if (data.results && data.results.length > 0) {
              dispatch({
                type: FETCH_LOCATION_SUCCESS,
                payload: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  address: data.results[0].formatted,
                },
              });
            } else {
              dispatch({
                type: FETCH_LOCATION_FAILURE,
                payload: "No results found",
              });
            }
          })
          .catch((err) => {
            console.log("Fetch ERROR:", err.message);
            dispatch({
              type: FETCH_LOCATION_FAILURE,
              payload: err.message,
            });
          });

        // opencage
        //   .geocode({ key, q: cord })
        //   .then((response) => {
        //     console.log("here response==>>", response);
        //     dispatch({
        //       type: FETCH_LOCATION_SUCCESS,
        //       payload: {
        //         latitude: position.coords.latitude,
        //         longitude: position.coords.longitude,
        //         address: response.results[0].formatted,
        //       },
        //     });
        //   })
        //   .catch((error) => {
        //     console.log("error here ", console.dir(error, { depth: null }));
        //   });
      },
      (error) => {
        console.log("error on location fatch :", error.code, error.message);
        dispatch({
          type: FETCH_LOCATION_FAILURE,
          payload: error.message,
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    console.log("out here ........");
  };
};

export const saveToken = (user, token) => {
  return (dispatch) => {
    dispatch({
      type: "login",
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
      type: "logout",
      payload: {
        user: null,
        token: null,
      },
    });
  };
};
