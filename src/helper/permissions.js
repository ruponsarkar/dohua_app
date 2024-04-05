import React, {useEffect, useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import DeviceInfo from "react-native-device-info"

  const App=()=>{

    const [apiLevel, setAPILevel] = useState(null);

    useEffect(()=>{
      const getDeviceInfo = async()=>{
        const apiLevel = DeviceInfo.getSystemVersion();
        setAPILevel(apiLevel);
        console.log("file: app.tsx:115 ~ getDeviceInfo ~ apiLevel:", 
        apiLevel)
          
       }
      getDeviceInfo();
     },[])


     const write = async ()=>{
      if (Platform.OS === "android" && apiLevel < 13) {
        console.log(" file: SingleCategoryScreen.tsx:327 downloadAllLectureVideos Platform.OS:", Platform.OS)
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        )
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission denied. Cannot download videos.");
          setIsDownloading(false)
          return
        }
      }
     }
    


    useEffect(()=>{
      // requestWritePermission();
      requestCameraPermission();
      requestLocationPermission();

    },[]);

    const requestWritePermission = async () => {
      console.log("pp");
      try {

        // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          
        );
        console.log("granted==>>>", granted);
        if (granted === "granted") {
          console.log("You can use WRITE_EXTERNAL_STORAGE");
          return true;
        } else {
          // requestLocationPermission()
          console.log("You cannot use WRITE_EXTERNAL_STORAGE");
          return false;
        }
      } catch (err) {
        return false;
      }
    };

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
        } else {
          console.log("granted==>", granted);
          console.log("PermissionsAndroid.RESULTS.GRANTED==>", PermissionsAndroid.RESULTS.GRANTED);
          console.log('Camera permission denied');
          // requestCameraPermission();
        }
      } catch (err) {
        console.warn(err);
      }
    };
  
    const requestLocationPermission = async () => {
      console.log("pp");
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
          // requestLocationPermission()
          console.log("You cannot use Geolocation");
          return false;
        }
      } catch (err) {
        return false;
      }
    };

    
   

    

    return(
      <>
      <View>
        {/* <Button title='Write Permission' onPress={requestWritePermission}></Button>
        <Button title='Write Permission2' onPress={write}></Button> */}
      </View>

      </>
    )
  }

export default App;