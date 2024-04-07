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
import axios from 'axios';

// const Camera = () => {


  const browseGallery = (value) => {

    let options = {
      storageOptions: {
        skipBackup: false,
        path: 'file:///storage/emulated/0/Pictures/',
        // path: 'file:///storage/emulated/0/gmcgeotag/',
      },
    };

    launchImageLibrary().then((res)=>{
      console.log("fileName==>", res.assets[0]);
      console.log("fileName==>", res.assets[0].fileName);
      const splittedArray = res.assets[0].uri.split("/");
      const fileName = splittedArray[splittedArray.length - 1];

      console.log(fileName);


    })
    return;

    console.log("ooo", value);
    // return;


    ImagePicker.openPicker({ includeBase64: false, includeExif: true }).then((res) => {
      console.log("fileName==>", res);
      const splittedArray = res.path.split("/");
      const fileName = splittedArray[splittedArray.length - 1];

      console.log(fileName);
      return;

      const folderPath = "storage/emulated/0/Pictures";
    const filePath = folderPath + "/" + fileName;

      // uploadImage(res.path);
      getExifInfo(filePath);

      return ;


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
      // return;
      
      const formData = new FormData();
      formData.append('image', {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName
      });

      uploadImage(formData);



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

  const getExifInfo = async (filePath) => {
    var a = await Exif.getExif(filePath).then((info) => {
      console.log("*********here babe==========>>>>>", info);
      console.log("GPSLatitude==========>>>>>", info.exif.GPSLatitude);
      var GPSLatitude = info.exif.GPSLatitude;
      var GPSLongitude = info.exif.GPSLongitude;
      var Model = info.exif.Model;
      console.log(GPSLatitude, GPSLongitude, Model);
      
      const replacedString1 = GPSLatitude.replace(/\//g, '.').replace(/,/g, '');;
      
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
      const response = await axios.post('https://pageuptechnologies.com/api/testApi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any additional headers required by your server
        },
      });
  
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
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

export  {browseGallery, handleOpenCamera }
