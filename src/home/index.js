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
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Card, Text, Divider, Badge } from "@rneui/themed";
import Geolocation from "react-native-geolocation-service";
import opencage from "opencage-api-client";
import { browseGallery, handleOpenCamera } from "./camera";
import Address from "./address";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.location);
  const { fetchLocation } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchLocation();
  }, [coords.latitude]);

  return (
    <ScrollView>

      <View style={{ backgroundColor: "wheat", padding: 12 }}>
        <Text>Latitude: {coords.latitude}</Text>
        <Text>Longitude: {coords.longitude}</Text>
        <Text>
          {console.log("====saiaaa==>>", coords)}
          Address: {coords.address}
        </Text>
        <Pressable onPress={() => fetchLocation()}>
          <Text style={{ textAlign: "center" }}>
            <MaterialCommunityIcons name="reload" size={22} />
          </Text>
        </Pressable>
      </View>

      <Card>
        <Image
          source={require("../assets/logo.png")}
          style={{ height: 100, width: "auto", resizeMode: "center" }}
        />
      </Card>

      <Card>
        <Pressable
          onPress={() => handleOpenCamera(null, null)}
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
          <Button
            title="Open Gallary"
            onPress={() => browseGallery("not upload")}
          />
        </View>
        {/* <View>
          <Button title="Open haha" 
          onPress={haha}
           />
        </View> */}
      </Card>

      <Card>
        <View>
          <Card>
            <Text>Total Projects: 20</Text>
          </Card>
          <Card>
            <Text>Completed Projects: 20</Text>
          </Card>
          <Card>
            <Text>Ongoing Projects: 20</Text>
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
