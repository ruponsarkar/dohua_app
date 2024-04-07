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
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";


const Address = () => {

    const amount = useSelector(state=> state.amount)
    const dispatch = useDispatch()
    const {fetchLocation, secondFunc} = bindActionCreators(actionCreators, dispatch);


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
            // console.log("position==>>", position);
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
  const getAddress =  (lati, long) => {
    const key = "e1302b58fbc74c14a40fd32f08eb2727";
    const cord = lati + "," + long;
     opencage
      .geocode({ key, q: cord })
      .then((response) => {
        var result = {
          address: response.results[0].formatted,
          latitude: lati,
          longitude: long,
        };

        setAddress(result);
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
        <Text>{amount}</Text>
        <Button title="Click Me" onPress={()=> fetchLocation()}/>
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
