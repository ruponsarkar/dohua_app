import React, { useState } from "react";
import { View, Button, PermissionsAndroid, Pressable } from "react-native";

import { Card, Text, Divider, Badge, Alert } from "@rneui/themed";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Icon from "react-native-vector-icons/Feather";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import Exif from "react-native-exif";
var RNFS = require("react-native-fs");

const Camera = () => {
  const openCamera2 = () => {
    ImagePicker.openPicker({ includeBase64: true }).then((res) => {
      console.log("pagol==>", res.data);
      console.log("fileName==>", res.path);
      const splittedArray = res.path.split("/");
      const fileName = splittedArray[splittedArray.length - 1];
      // console.log("fileNamefff", fileName);
      console.log("mime", res.mime);
      // return;

      saveImage(res.data, fileName, res.mime);
    });
  };



const camera2 =()=>{
  ImagePicker.openCamera({
    includeBase64: true,
    includeExif: true

  }).then(image => {
    console.log(image);
  });
}

 const openCamera = () => {
    let options = {
      mediaType: "mixed",
      includeBase64: true,
      exif: true,
      includeExtra: true,
    };
    launchCamera(options, (response) => {
      console.log("response=>", response);
      console.log("response.path=>", response.assets[0].originalPath);
      console.log("response.fileName=>", response.assets[0].fileName);
      console.log("base64=>", response.assets[0].base64);
      var decodedURL = decodeURIComponent(response.assets[0].originalPath);
      var fileName = response.assets[0].fileName;

      var filePath = RNFS.DocumentDirectoryPath + fileName;
      var destPath = RNFS.ExternalStorageDirectoryPath + "/Pictures";
      var mime = response.assets[0].type;

      console.log("filePath==>>", filePath);
      console.log("destPathpp==>>", destPath);
      console.log("mime==>>", response.assets[0].type);

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

        getExifInfo(filePath);

        // return;

        // [{ path: res.path(), mime: "audio/mpeg" }]
        RNFetchBlob.fs
          .scanFile([{ path: filePath, mime: mime }])
          .then((res) => {
            console.log("mime scan", res);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getExifInfo = (image) => {
    console.log("exif=>", image);
    Exif.getExif(image).then((msg) => {
      console.log("*********getExifInfo==========>>>>>", msg);

      updateExif(image);
      // this.parseDate(msg.exif.DateTime, msg.exif.originalUri);
      // obj = {
      //   long: msg.exif.GPSLongitude,
      //   longRef: msg.exif.GPSLongitudeRef,
      //   lat: msg.exif.GPSLatitude,
      //   latRef: msg.exif.GPSLatitudeRef,
      // };

      // console.log("ha haha", obj);
    });
  };

  

  const newExifData = {
    DateTimeOriginal: "2024:04:04 12:00:00", // Example: change the date and time
    Make: "NewMake",
    Model: "NewModel",
    // Add or modify other EXIF fields as needed
  };

  const updateExif = (image) => {
    Exif.writeExif(image, newExifData)
      .then(() => {
        console.log("EXIF data updated successfully");
        Exif.getExif(image).then((msg) => {
          console.log("newwww==========>>>>>", msg);
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  };




  return (
    <>
      <Card>
        {/* <Button title="Open Camera" onPress={openCamera} /> */}

        <Pressable
          onPress={openCamera}
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
          {/* <Button title="Open Camera" onPress={camera2} /> */}
          <Button title="Open Gallary" onPress={openCamera2} />
        </View>
      </Card>
    </>
  );
};

export default Camera;
