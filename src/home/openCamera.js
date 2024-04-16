import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import { Card, Text, Divider, Badge } from "@rneui/themed";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePickers from "react-native-image-picker";
import {
  requestCameraPermission,
  requestLocationPermission,
  requestMediaLocation,
  requestReadMediaImage,
} from "../helper/permissions";
import Icon from "react-native-vector-icons/Feather";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import Exif from "react-native-exif";
var RNFS = require("react-native-fs");
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import OverlayLoading from "../component/loader";

// const Camera = () => {

const browseGallery = async () => {
  const options = {
    noData: true,
  };
  launchImageLibrary(options, (response) => {
    console.log(response, "options");
    if (!response.didCancel) {
      if (response.assets) {
        if (response.assets[0].fileSize > 2097152) {
          // let checkSize = formatBytes(response.assets[0].fileSize)
          console.log("checkSize=>");
          // FileSIzeBigResponse(checkSize)
        } else {
          console.log("options", response);
          const imageAssetsArray = response.assets[0].uri;
          console.log("imageAssetsArray", imageAssetsArray);
          // setPhoto(imageAssetsArray)
          // setPhoto(imageAssetsArray)
          // setEdit({
          //     ...edit,
          //     photo: response.assets[0]
          // })
          // setBorrowerInfo({ ...borrowerInfo, image: response.assets[0] })
        }
      }
    }
  });

  return;

  try {
    const image = await ImagePicker.openPicker({
      multiple: false, // Allow selecting only one image
      mediaType: "photo", // Pick only photos
      includeExif: true, // Include Exif metadata,
      path: "file:///storage/emulated/0/Pictures",
    });

    // Extract latitude from Exif data
    console.log("==>>>", image);
    const latitude = image.exif ? image.exif.GPSLatitude : null;
    console.log("Latitude:", latitude);

    // Do something with the selected image
  } catch (error) {
    console.log("Error picking image:", error);
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

const handleOpenCamera = (params) => {


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
       openCamera(params);
      
    }
  });
};

const openCamera = (params) => {
  console.log("project_id", params.project_id);
  console.log("location", params.location);


  let options = {
    // mediaType: "mixed",
    includeBase64: false,
    exif: true,
    includeExtra: true,
  };
  launchCamera(options, (response) => {
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.error) {
      console.log("ImagePicker Error: ", response.error);
    } else {
      var fileName = response.assets[0].fileName;
      var mime = response.assets[0].type;
      // console.log("mime==>>", response.assets[0].type);
      // console.log("===>>>", response.assets[0].uri);

      var img = response.assets[0];
      uploadToServer(img, params);
    }
  

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

const uploadToServer = (img, params) => {
  // console.log(params);
  // return;

  const formData = new FormData();
  formData.append("image", {
    uri: img.uri,
    type: img.type,
    name: img.fileName,
  });
  formData.append("project_id", params.project_id);
  formData.append("user_id", params.user_id);
  formData.append("GPSLatitude", params.location.latitude);
  formData.append("GPSLongitude", params.location.longitude);
  formData.append("address", params.location.address);

  if (params.project_id) {
    console.log("yes");
    var api = "https://pageuptechnologies.com/api/uploadImg";
  } else {
    console.log("no");
    var api = "https://pageuptechnologies.com/api/testApi";
  }

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
    .writeFile(filePath, source, "base64")
    .then((res) => {
      console.log("success==>>", res);
      console.log("otokhan==>", filePath, mime);
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

export { browseGallery, handleOpenCamera };
