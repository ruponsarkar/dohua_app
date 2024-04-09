import React, { useState } from "react";
import {
  View,
  Button,
  PermissionsAndroid,
  Pressable,
  Alert,
} from "react-native";

import { Card, Text, Divider, Badge } from "@rneui/themed";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  requestCameraPermission,
  requestLocationPermission,
  requestMediaLocation,
  requestReadMediaImage
} from "../helper/permissions";
import Icon from "react-native-vector-icons/Feather";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import Exif from "react-native-exif";
var RNFS = require("react-native-fs");
import axios from "axios";
import { useSelector } from "react-redux";



// const Camera = () => {


const browseGallery = async () => {

  const options = {
    title: 'Select Avatar',
    writeTempFile: false,
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'file:///storage/emulated/0/Pictures'
    }
  };

  launchImageLibrary(options, response => {
    console.log('[ImagePicker][response]', response);

    const source = { uri: response.uri };
  
  });

  return;



  try {
    const image = await ImagePicker.openPicker({
      multiple: false, // Allow selecting only one image
      mediaType: 'photo', // Pick only photos
      includeExif: true, // Include Exif metadata,
      path: 'file:///storage/emulated/0/Pictures'
    });

    // Extract latitude from Exif data
    console.log("==>>>", image);
    const latitude = image.exif ? image.exif.GPSLatitude : null;
    console.log('Latitude:', latitude);
    
    // Do something with the selected image
  } catch (error) {
    console.log('Error picking image:', error);
  }
};

const browseGallery_Old = (value) => {
  requestMediaLocation().then((res) => {
    console.log("requestMediaLocation", res);
  });

  ImagePicker.openPicker({ includeBase64: false, includeExif: true }).then(
    (res) => {
      console.log("fileName==>", res);
      const splittedArray = res.path.split("/");
      const fileName = splittedArray[splittedArray.length - 1];

      console.log(fileName);
      return;

      const folderPath = "storage/emulated/0/Pictures";
      const filePath = folderPath + "/" + fileName;

      // uploadImage(res.path);
      getExifInfo(filePath);

      return;

      saveImage(res.data, fileName, res.mime);
    }
  );

  return;
  const options = {
    mediaType: "photo",
    exif: true, // Request Exif data
    location: true, // Request location data
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.error) {
      console.log("ImagePicker Error: ", response.error);
    } else {
      console.log("Selected Image:", response.assets[0]);
      console.log("Selected Image:", response.assets[0].uri);
      // Handle the selected image and its Exif data here
      // response.exif will contain the Exif data
      // response.location will contain the location data

      return;
      var a = Exif.getExif(response.assets[0].uri).then((info) => {
        console.log("*********here babe==========>>>>>", info);
        console.log("GPSLatitude==========>>>>>", info.exif.GPSLatitude);
        var GPSLatitude = info.exif.GPSLatitude;
        var GPSLongitude = info.exif.GPSLongitude;
        var Model = info.exif.Model;
        console.log(GPSLatitude, GPSLongitude, Model);

        const latitude = convertDMSToDD(info.exif.GPSLatitude);
        const longitude = convertDMSToDD(info.exif.GPSLongitude);
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
      });
    }
  });

  return;

  launchImageLibrary().then((res) => {
    console.log("fileName==>", res.assets[0]);
    console.log("fileName==>", res.assets[0].fileName);
    const splittedArray = res.assets[0].uri.split("/");
    const fileName = splittedArray[splittedArray.length - 1];

    console.log(fileName);
  });
  return;

  console.log("ooo", value);
  // return;

  ImagePicker.openPicker({ includeBase64: false, includeExif: true }).then(
    (res) => {
      console.log("fileName==>", res);
      const splittedArray = res.path.split("/");
      const fileName = splittedArray[splittedArray.length - 1];

      console.log(fileName);
      return;

      const folderPath = "storage/emulated/0/Pictures";
      const filePath = folderPath + "/" + fileName;

      // uploadImage(res.path);
      getExifInfo(filePath);

      return;

      saveImage(res.data, fileName, res.mime);
    }
  );
};

const convertDMSToDD = (dmsString) => {
  const parts = dmsString.split(",");
  const degrees = parseFloat(parts[0]);
  const minutes = parseFloat(parts[1]);
  const seconds = parseFloat(parts[2]);
  const direction = parts[3];

  let dd = degrees + minutes / 60 + seconds / 3600;
  if (direction === "S" || direction === "W") {
    dd *= -1;
  }
  return dd;
};

const handleOpenCamera = (project_id, location) => {
  requestCameraPermission().then((res) => {
    console.log("camera permission check", res);
    if (res === false) {
      Alert.alert("Permission Required", "Please enable Camera Permission ", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else {
      openCamera(project_id, location);
    }
  });
};

const openCamera = (project_id, location) => {
  console.log("project_id", project_id);
  console.log("location", location);

  let options = {
    // mediaType: "mixed",
    includeBase64: true,
    exif: true,
    includeExtra: true,
  };
  launchCamera(options, (response) => {
    var fileName = response.assets[0].fileName;
    var mime = response.assets[0].type;
    console.log("mime==>>", response.assets[0].type);
    console.log("===>>>", response.assets[0].uri);

    // if(!location.latitude){

    // }

    // console.log("location", location.latitude);

    // if (!location.latitude) {
    //   Alert.alert("Error", "Location not found!", [
    //     {
    //       text: "Cancel",
    //       style: "cancel",
    //     },
    //   ]);
    //   return;
    // }

    if (project_id) {
      const formData = new FormData();
      formData.append("image", {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      });
      formData.append("project_id", project_id);
      formData.append("latitude", location.latitude);
      formData.append("longitude", location.longitude);
      formData.append("address", location.address);
      uploadImage(formData);
    }
    saveImage(response.assets[0].base64, fileName, mime);
  });
};

const saveImage = (source, fileName, mime) => {
  const folderPath = "storage/emulated/0/Pictures";
  const filePath = folderPath + "/" + fileName;

  RNFetchBlob.fs.isDir(folderPath).then((isDir) => {
    if (isDir) {
      console.log("is dir=>", isDir);
      addImage(source, filePath, mime);
    } else {
      console.log("no dir=>", isDir);
      RNFetchBlob.fs
        .mkdir(folderPath)
        .then(() => {
          console.log("done");
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  });
};

const addImage = (source, filePath, mime) => {
  RNFetchBlob.fs
    .createFile(filePath, source, "base64")
    .then((res) => {
      console.log("success==>>", res);

      console.log("otokhan==>", filePath, mime);

      // getExifInfo(filePath);

      RNFetchBlob.fs.scanFile([{ path: filePath, mime: mime }]).then((res) => {
        console.log("mime scan", res);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getExifInfo = async (filePath) => {
  var a = await Exif.getExif(filePath).then((info) => {
    console.log("*********here babe==========>>>>>", info);
    console.log("GPSLatitude==========>>>>>", info.exif.GPSLatitude);
    var GPSLatitude = info.exif.GPSLatitude;
    var GPSLongitude = info.exif.GPSLongitude;
    var Model = info.exif.Model;
    console.log(GPSLatitude, GPSLongitude, Model);

    const replacedString1 = GPSLatitude.replace(/\//g, ".").replace(/,/g, "");

    console.log("new", replacedString1);
  });
};

// const getExifInfo = async (filePath) => {
//   var a = await Exif.getExif(filePath).then((info) => {
//     console.log("*********getExifInfo==========>>>>>", info);
//     return info;

//   });
//   return a
// };

const uploadImage = async (formData) => {
  try {
    const response = await axios.post(
      "https://pageuptechnologies.com/api/testApi",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add any additional headers required by your server
        },
      }
    );

    console.log("Image uploaded successfully:", response.data);

    Alert.alert("Success", "Photo uploaded Successfully", [
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  } catch (error) {
    console.error("Error uploading image:", error);
    Alert.alert("Error", "Something went wrongb", [
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }
};

// return (
//   <>
//     <Card>
//       <Pressable
//         onPress={handleOpenCamera}
//         style={{ backgroundColor: "gray", height: 150, padding: 40 }}
//       >
//         <Icon
//           name="camera"
//           size={60}
//           color={"white"}
//           style={{ textAlign: "center" }}
//         />
//         <Text style={{ textAlign: "center", color: "white" }}>
//           Open Camera
//         </Text>
//       </Pressable>

//       <View>
//         <Button title="Open Gallary" onPress={browseGallery} />
//       </View>
//     </Card>
//   </>
// );

// };

export { browseGallery, handleOpenCamera };
