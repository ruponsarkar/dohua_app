import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Button,
  Pressable,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Card, Text, Divider, Badge } from "@rneui/themed";
import { browseGallery, handleOpenCamera } from "./camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import axios from "axios";
import OverlayLoading from "../component/loader";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.location);
  const { fetchLocation } = bindActionCreators(actionCreators, dispatch);
  const [user, setUser] = useState();
  const [loader, setLoader] = useState({
    open: false,
    text: "",
  });

  useEffect(() => {
    retrieveData();
    fetchLocation();
  }, [coords.latitude]);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        // We have data!!
        setUser(JSON.parse(value));
        console.log("==>>", JSON.parse(value).id);
      }
    } catch (error) {
      console.log("error", error);
      // Error retrieving data
    }
  };

  const openCamera = async () => {
    var result = await handleOpenCamera();
    console.log("result here========>>", result.didCancel);
    if (result.didCancel) {
      console.log("User cancelled image picker");
    } else if (result.error) {
      console.log("ImagePicker Error: ", response.error);
    } else {
      var img = result.assets[0];
      uploadToServer(img);
    }
  };

  const uploadToServer = (img) => {
    setLoader({
      open: true,
      text: "Uploading..",
    });
    const formData = new FormData();
    formData.append("image", {
      uri: img.uri,
      type: img.type,
      name: img.fileName,
    });
    formData.append("project_id", null);
    formData.append("user_id", user?.id);
    formData.append("GPSLatitude", coords.latitude);
    formData.append("GPSLongitude", coords.longitude);
    formData.append("address", coords.address);

    // if (project_id) {
    //   var api = "https://pageuptechnologies.com/api/uploadImg";
    // } else {

    var api = "https://pageuptechnologies.com/api/testApi";
    // }

    axios
      .post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Image uploaded successfully:", res.data);
        Alert.alert("Success", "Photo Saved Successfully", [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
        setLoader({
          open: false,
        });
        return "Success";
      })
      .catch((err) => {
        console.log(err.response);
        Alert.alert("Error", "Something went wrongb", [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
      });
  };

  return (
    <ScrollView>
      <OverlayLoading visible={loader.open} text={loader.text} />
      <View style={{ backgroundColor: "wheat", padding: 12 }}>
        <Text>Latitude: {coords.latitude}</Text>
        <Text>Longitude: {coords.longitude}</Text>
        <Text>
          {/* {console.log("====saiaaa==>>", coords)} */}
          Address: {coords.address}
        </Text>
        <Pressable onPress={() => fetchLocation()}>
          <Text style={{ textAlign: "center" }}>
            <MaterialCommunityIcons name="reload" size={22} />
          </Text>
        </Pressable>
      </View>

      <Card>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/Gatishakti.jpg")}
              style={{width: 160, height: 45}}
            />
          </View>
          {/* Add more images as needed */}
        </View>

        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
          State Data Center Dispur
        </Text>
      </Card>

      <Card>
        <Pressable
          onPress={() => openCamera()}
          // onPress={() => handleOpenCamera({project_id: null, location: coords, user_id: user?.id})}
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
            onPress={() => navigation.navigate("Gallery")}
            // onPress={() => browseGallery("not upload")}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Display children horizontally
    alignItems: "center", // Align items in the center vertically
    justifyContent: "center", // Center children horizontally
    padding: 10,
  },
  imageContainer: {
    marginHorizontal: 5,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
});

export default Home;
