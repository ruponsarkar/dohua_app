import React from "react";

import {
  Text,
  useColorScheme,
  View,
  Button,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

import {
  requestCameraPermission,
  requestLocationPermission,
} from "../helper/permissions";

import Geolocation from "react-native-geolocation-service";
import opencage from "opencage-api-client";

const getCoords = () => {
  requestLocationPermission().then((res) => {
    if (res) {
      return getLocationCoords();
    } else {
      Alert.alert("Permission Required", "Please enable Location Permission ", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  });
};

const getLocationCoords = () => {
  var a = Geolocation.getCurrentPosition((position) => {
    return position;
  });

  return a;

  //    var a = async () =>  Geolocation.getCurrentPosition((position) => {
  //           return position
  //       },
  //       (error) => {
  //         console.log(error.code, error.message);
  //       },
  //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );

  //     return a;
};

const getLocationCoordss = async () => {
  await Geolocation.getCurrentPosition(
    (position) => {
      console.log("from here position==>>", position);
      return position;
    },
    (error) => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};

// export default function Location() {
//   return (
//     <div>Location</div>
//   )
// }

export { getCoords, getLocationCoords };
