import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
} from 'react-native';

    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          return true;
        } else {
          console.log('Camera permission denied');
          return false
        }
      } catch (err) {
        console.warn(err);
      }
    };
  
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Geolocation Permission",
            message: "Can we access your location?",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        console.log("granted", granted);
        if (granted === "granted") {
          console.log("You can use Geolocation");
          return true;
        } else {
          console.log("You cannot use Geolocation");
          return false;
        }
      } catch (err) {
        return false;
      }
    };

    export {requestCameraPermission, requestLocationPermission}
