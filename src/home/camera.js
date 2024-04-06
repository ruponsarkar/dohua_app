import React, { useState } from "react";
import { View, Button, PermissionsAndroid, Pressable, Alert } from "react-native";

import { Card, Text, Divider, Badge } from "@rneui/themed";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { requestCameraPermission, requestLocationPermission } from "../helper/permissions";
import Icon from "react-native-vector-icons/Feather";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import Exif from "react-native-exif";
var RNFS = require("react-native-fs");

// const Camera = () => {


  const browseGallery = () => {
    ImagePicker.openPicker({ includeBase64: true }).then((res) => {
      console.log("fileName==>", res.path);
      const splittedArray = res.path.split("/");
      const fileName = splittedArray[splittedArray.length - 1];
      saveImage(res.data, fileName, res.mime);
    });
  };


  const handleOpenCamera=()=>{
    requestCameraPermission().then((res)=>{
      console.log("camera permission check", res);
      if(res === false){
        Alert.alert('Permission Required', 'Please enable Camera Permission ', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
      }
      else{
        openCamera();
      }
    })
  }


 const openCamera = () => {
    let options = {
      mediaType: "mixed",
      includeBase64: true,
      exif: true,
      includeExtra: true,
    };
    launchCamera(options, (response) => {
      var fileName = response.assets[0].fileName;
      var mime = response.assets[0].type;
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
    });
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

export  {browseGallery, handleOpenCamera }
