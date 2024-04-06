import React, { useEffect, useState } from "react";
import {
  Text,
  useColorScheme,
  View,
  Button,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
} from "react-native";

import { Card } from "@rneui/themed";
import {
  requestCameraPermission,
  requestLocationPermission,
} from "../helper/permissions";

import Geolocation from "react-native-geolocation-service";
import opencage from "opencage-api-client";

// function to check permissions and get Latitude and longitute

const Address = () => {
  const [address, setAddress] = useState();

  useEffect(() => {
    getLocationCoords();
  }, []);

  const getLocationCoords = () => {
    const result = requestLocationPermission();
    result.then((res) => {
      //   console.log("res is:", res);
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log("position==>>", position);
            getAddress(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert(
          "Permission Required",
          "Please enable Location Permission ",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
          ]
        );
      }
    });
  };

  //   to get addresss
  const getAddress = async (lati, long) => {
    const key = "e1302b58fbc74c14a40fd32f08eb2727";
    const cord = lati + "," + long;
    await opencage
      .geocode({ key, q: cord })
      .then((response) => {
        var result = {
          address: response.results[0].formatted,
          latitude: lati,
          longitude: long,
        };

        setAddress(result);
        // console.log("main result=>", result);
        // return result;
      })
      .catch((e) => {
        console.log("error", e);
        return false;
      });
  };

  return (
    <>
      <View>
        <Text style={{backgroundColor: 'white'}}>Address: {address?.address}</Text>
        {/* <Text>
          Latitude:{" "}
          <Text style={{ fontWeight: "bold" }}> {address?.latitude} </Text>
        </Text>
        <Text>Longitude: {address?.longitude}</Text> */}
      </View>
    </>
  );
};

export default Address;
