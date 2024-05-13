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
import ImageResizer from 'react-native-image-resizer';


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

  const uploadToServer = async(img) => {
    setLoader({
      open: true,
      text: "Saving...",
    });


    const resizedImage = await ImageResizer.createResizedImage(
      img.uri,
      360, // maxWidth
      500, // maxHeight
      'JPEG', // compressFormat
      80, // quality
  );
  // resizedImage.uri contains the URI of the compressed image
  console.log('Compressed image URI:', resizedImage.uri);
  console.log('Compressed image:', resizedImage);
  console.log("==>>", img.type);

    const formData = new FormData();
    formData.append("image", {
      uri: img.uri,
      type: img.type,
      name: img.fileName,
    });
    formData.append("thumb", {
      uri: resizedImage.uri,
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

    // var api = "https://pageuptechnologies.com/api/testApi";
    var api = "http://statedatacenterdispuraiidc.com:9000/api/uploadIntoGallery";
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
        console.log("erro==>>", err);
        setLoader({
          open: false,
        });
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
      <Card containerStyle={{ margin: 0}}>
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
              style={{ width: 160, height: 45 }}
            />
          </View>
          {/* Add more images as needed */}
        </View>

        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
          State Data Center Dispur
        </Text>
      </Card>
      
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

      


      <Card containerStyle={{ margin: 0}}>
      <View style={styles.boxContainer}>
      <View style={styles.box}>
      <Pressable
          onPress={() => openCamera()}>
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
      </View>
      <View style={styles.box}>
      <Pressable onPress={() => navigation.navigate("Gallery")}>
      <MaterialCommunityIcons
            name="image-multiple-outline"
            size={60}
            color={"white"}
            style={{ textAlign: "center" }}
          />
          <Text style={{ textAlign: "center", color: "white" }}>
            Open Gallery
          </Text>
          </Pressable>
      </View>
    </View>
    </Card>


<View>
<Card containerStyle={{ margin: 0}}>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>
            Projects Details
          </Text>
          <Card containerStyle={{ borderRadius: 10, backgroundColor: '#B0E0E6' }}>
            <View style={styles.projectContainer}>
              <View style={styles.leftTextContainer}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  <MaterialCommunityIcons name="circle-multiple" size={25} color={'black'}/> Total
                  Projects:
                </Text>
              </View>
              <View style={styles.rightTextContainer}>
                <Text style={styles.text}>30</Text>
              </View>
            </View>
          </Card>
          <Card containerStyle={{ borderRadius: 10, backgroundColor: '#FFFACD' }}>
          <View style={styles.projectContainer}>
              <View style={styles.leftTextContainer}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  <MaterialCommunityIcons name="timer-sand-complete" size={25} color={'black'}/> Ongoing
                  Projects:
                </Text>
              </View>
              <View style={styles.rightTextContainer}>
                <Text style={styles.text}>10</Text>
              </View>
            </View>
          </Card>
          <Card containerStyle={{ borderRadius: 10, backgroundColor: '#90EE90' }}>
          <View style={styles.projectContainer}>
              <View style={styles.leftTextContainer}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  <MaterialCommunityIcons name="check-circle-outline" size={25} color={'black'}/> Completed
                  Projects:
                </Text>
              </View>
              <View style={styles.rightTextContainer}>
                <Text style={styles.text}>10</Text>
              </View>
            </View>
          </Card>
          </Card>
        </View>
      
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
  boxContainer: {
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-between', // Distribute children evenly along the main axis
    // paddingHorizontal: 20, // Add some horizontal padding
  },
  box: {
    width: '48%', // Take up 48% of the container's width
    height: 160,
    backgroundColor: '#ccc',
    borderRadius: 10,
    // marginBottom: 20, // Add some vertical margin
    padding: 40 
  },
  projectContainer: {
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-between', // Distribute children evenly along the main axis
    // paddingHorizontal: 20, // Add some horizontal padding
    alignItems: 'center', // Center children vertically
    height: 50, // Set a fixed height for the container
  },
  leftTextContainer: {
    // flex: 1, // Take up all available space
    alignItems: 'flex-start', // Align text to the left
  },
  rightTextContainer: {
    flex: 1, // Take up all available space
    alignItems: 'flex-end', // Align text to the right
    paddingEnd: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
