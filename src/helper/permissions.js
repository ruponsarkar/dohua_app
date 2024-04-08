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

    const requestMediaLocation = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
          {
            title: "ACCESS_MEDIA_LOCATION",
            message: "Can we access your ACCESS_MEDIA_LOCATION?",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        console.log("granted", granted);
        if (granted === "granted") {
          console.log("You can use ACCESS_MEDIA_LOCATION");
          return true;
        } else {
          console.log("You cannot use ACCESS_MEDIA_LOCATION");
          return false;
        }
      } catch (err) {
        return false;
      }
    };

    const requestReadStorage = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "READ_EXTERNAL_STORAGE",
            message: "Can we access your READ_EXTERNAL_STORAGE?",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        console.log("granted", granted);
        if (granted === "granted") {
          console.log("You can use READ_EXTERNAL_STORAGE");
          return true;
        } else {
          console.log("You cannot use READ_EXTERNAL_STORAGE");
          return false;
        }
      } catch (err) {
        return false;
      }
    };


    const requestReadMediaImage = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: "READ_MEDIA_IMAGES",
            message: "Can we access your READ_MEDIA_IMAGES?",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        console.log("granted", granted);
        if (granted === "granted") {
          console.log("You can use READ_MEDIA_IMAGES");
          return true;
        } else {
          console.log("You cannot use READ_MEDIA_IMAGES");
          return false;
        }
      } catch (err) {
        return false;
      }
    };

    export {requestCameraPermission, requestLocationPermission, requestMediaLocation, requestReadStorage, requestReadMediaImage}
