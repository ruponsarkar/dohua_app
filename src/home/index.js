import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  // Text,
  useColorScheme,
  View,
  Button,
  PermissionsAndroid,
} from "react-native";

import { Card, Text, Divider, Badge } from "@rneui/themed";
import Geolocation from "react-native-geolocation-service";
import opencage from "opencage-api-client";
import Camera from "./camera";

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(false);

  const [address, setAddress] = useState({});

  useEffect(()=>{
    getLocation()
  },[]);

  const getAddress = (lati, long) => {
    const key = "e1302b58fbc74c14a40fd32f08eb2727";
    console.log("lati, long==>>", lati, long);
    // 26.1571333, 91.7832321 
    const cord = lati +','+ long;
    opencage.geocode({ key, q: cord }).then((response) => {
      result = response.results[0];
      setAddress({ all: result, address: result.formatted });
      console.log("==>>", result);
      console.log(result.formatted);
    });
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
        console.log("You cannot use Geolocation");
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then((res) => {
      console.log("res is:", res);
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log("==>>", position);
            setLocation(position);
            getAddress(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    });
    console.log(location);
  };

  return (
    <ScrollView>
      <Camera />


      <Card>
        <View>
          <Text>{address.address}</Text>
          
          <Text>Latitude: {location ? location.coords.latitude : null}</Text>
          <Text>Longitude: {location ? location.coords.longitude : null}</Text>
        </View>

        <View>
            <Button title="Refresh Location" onPress={getLocation} />
          </View>
      </Card>
    </ScrollView>
  );
};

export default Home;
