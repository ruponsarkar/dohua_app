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
  Pressable,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Card, Text, Divider, Badge } from "@rneui/themed";
import Geolocation from "react-native-geolocation-service";
import opencage from "opencage-api-client";
import { browseGallery, handleOpenCamera } from "./camera";
import Address from "./address";
import { getCoords, getLocationCoords } from "./location";

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(false);

  const [address, setAddress] = useState({});

  useEffect(()=>{
    getLocation();
  },[]);



  const haha = ()=>{
    var a =  getLocationCoords();
    console.log("haha", a);
  }

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
    })
    .catch((e)=>{
      console.log("error", e);
    })
    ;
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
      {/* <Camera /> */}
      <Address />


      <Card>
        <Image source={require('../assets/logo.png')} style={{height: 100, width: 'auto', resizeMode: 'center'}}/>
      </Card>

      <Card>
        <Pressable
          onPress={handleOpenCamera}
          style={{ backgroundColor: "gray", height: 150, padding: 40 }}
        >
          <Icon
            name="camera"
            size={60}
            color={"white"}
            style={{ textAlign: "center" }}
          />
          <Text style={{ textAlign: "center", color: "white" }}>
            Open Camera
          </Text>
        </Pressable>

        <View>
          <Button title="Open Gallary" 
          onPress={browseGallery}
           />
        </View>
        <View>
          <Button title="Open haha" 
          onPress={haha}
           />
        </View>
      </Card>

      <Card>
        <View>
          <Card>
            <Text>
              Total Projects:  20
            </Text>
          </Card>
          <Card>
            <Text>
              Completed Projects:  20
            </Text>
          </Card>
          <Card>
            <Text>
              Ongoing Projects:  20
            </Text>
          </Card>
        </View>
      </Card>

     


      {/* <Card>
        <View>
          <Text>{address.address}</Text>
          
          <Text>Latitude: {location ? location.coords.latitude : null}</Text>
          <Text>Longitude: {location ? location.coords.longitude : null}</Text>
        </View>

        <View>
            <Button title="Refresh Location" onPress={getLocation} />
          </View>
      </Card> */}
    </ScrollView>
  );
};

export default Home;
