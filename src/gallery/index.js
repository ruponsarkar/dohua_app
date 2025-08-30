import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
} from "react-native";
import { Card, Dialog } from "@rneui/base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import OverlayLoading from "../component/loader";
import FastImage from "react-native-fast-image";
import config from "../../config";
const { width } = Dimensions.get("window");

const GalleryView = ({ navigation }) => {
  const route = useRoute();
  const { projectId, upload } = route.params ? route.params : "";
  const [img, setImg] = useState([]);
  const [user, setUser] = useState();
  const [loader, setLoader] = useState({
    open: false,
    text: "",
  });
  const [visible, setVisible] = useState(false);
  const [selectedImg, setSelectedImg] = useState();

  console.log("both==>>", projectId, upload);

  const getImagesById = (user_id) => {
    var api = `${config.API_BASE_URL}/getImagesById`;
    console.log("2api==>>>", api);
    setLoader({
      open: true,
      text: "Loading Pictures...",
    });
    let requestObject = {
      type: 'galleryImages',
      user_id: user_id,
      project_id: null
    }
    axios
      .post(api, requestObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        })
      .then((res) => {
        console.log("RES==", res.data.message);
        if (res.status) {
          setImg(res.data.message.map((e) => ({ ...e, loading: true })));
          setLoader({
            open: false,
          });
        }
      })
      .catch((err) => {
        console.log("err get img", err);
        setLoader({
          open: false,
        });
        Alert.alert("Error", "Something went wrong, please try again", [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
      });
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        setUser(JSON.parse(value));
        getImagesById(JSON.parse(value).id);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    if (upload) {
      setLoader({
        open: true
      });
      var api = `${config.API_BASE_URL}/imageMigration`;
      let requestObject = {
        project_id: projectId,
        user_id: upload.user_id,
        file_path: upload.file_path,
        thumb_path: upload.thumb_path,
        latitude: upload.latitude,
        longitude: upload.longitude,
        address: upload.address,
        status: upload.status
      }
      axios
        .post(api, requestObject,
          {
            headers: {
              "Content-Type": "application/json",
            },
          })
        .then((res) => {
          if (res.status) {
            Alert.alert("Success", "Image Uploaded Successfully", [
              {
                text: "Cancel",
                style: "cancel",
              },
            ]);
            setLoader({
              open: false,
            });
          }
          setLoader({
            open: false,
          });
        })
        .catch((err) => {
          console.log("err get img", err);
          setLoader({
            open: false,
          });
          Alert.alert("Error", "Something went wrong, please try again", [
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
        });
      // var source = "https://pageuptechnologies.com/test/" + upload.image;
      // var dest = "https://pageuptechnologies.com/api/uploadImg";
      // saveImageFromAPItoAPI(source, dest, upload);
    } else {
      console.log("no");
    }
  }, [upload]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      {/* { console.log("imaggggg==>>", item.file_path)} */}
      <Image
        source={{
          uri: `${item.loading
              ? `https://icons8.com/preloaders/preloaders/759/Camera%20aperture.gif`
              : `${config.IMAGE_BASE_URL}/docs1/${item.file_path}`
            } `,
        }}
        style={styles.image}
        onLoadEnd={() =>
          setImg(
            img.map((e) => (e.id === item.id ? { ...e, loading: false } : e))
          )
        }
        resizeMode={FastImage.resizeMode.cover}
      />
      {/* <Image
        source={{
          uri: `${
            item.loading
              ? `https://icons8.com/preloaders/preloaders/759/Camera%20aperture.gif`
              : `https://pageuptechnologies.com/test/thumb/${item.thumb}`
          } `,
        }}
        style={styles.image}
        onLoadEnd={() =>
          setImg(
            img.map((e) => (e.id === item.id ? { ...e, loading: false } : e))
          )
        }
        resizeMode={FastImage.resizeMode.cover}
      /> */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>-30 days</Text>
      </View>
    </TouchableOpacity>
  );

  const handleImagePress = (image) => {
    console.log("Selected Project Id====:", projectId);
    navigation.navigate("Preview", { image: image, projectId: projectId });
    return;
  };

  const saveImageFromAPItoAPI = async (
    sourceImageUrl,
    destinationAPIEndpoint,
    image
  ) => {
    setLoader({
      open: true,
      text: "Uploading...",
    });
    try {
      // Fetch image data from source API
      const response = await axios.get(sourceImageUrl, {
        responseType: "arraybuffer",
      });

      // Prepare data for sending to destination API
      const formData = new FormData();
      formData.append("image", {
        uri: sourceImageUrl,
        type: response.headers["content-type"], // Or provide the MIME type if known
        name: "image.jpg", // Or provide the appropriate file name
        data: response.data,
      });
      formData.append("project_id", projectId);
      formData.append("GPSLatitude", image.latitude);
      formData.append("GPSLongitude", image.longitude);
      formData.append("address", image.address);
      formData.append("user_id", image.user_id);

      // Send image data to destination API
      const uploadResponse = await axios.post(
        destinationAPIEndpoint,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.status === 200) {
        // Image uploaded successfully
        setLoader({
          open: false,
        });
        Alert.alert("Success", "Photo Uploaded Successfully", [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
        console.log("Image uploaded successfully");
      } else {
        // Handle upload failure
        console.error("Failed to upload image");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

  return (
    <>
      {img.length === 0 ? (
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          No Image found
        </Text>
      )
        :
        (
          <Text style={{ textAlign: "center", fontSize: 10 }}>Pictures will automatically expire in 30 days.</Text>
        )

      }
      <OverlayLoading visible={loader.open} text={loader.text} />
      <View style={styles.container}>
        <FlatList
          data={img}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3} // Change the number of columns as needed
          contentContainerStyle={styles.flatList}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatList: {
    padding: 8,
  },
  image: {
    width: (width - 32) / 3, // Adjust image size based on the number of columns
    height: (width - 32) / 2, // Adjust image size based on the number of columns
    margin: 2,
    borderRadius: 8,
    backgroundColor: "#ede8e8",
    borderWidth: 2,
    borderColor: "#ede8e8",

    // padding: 30
  },

  badge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust badge background color
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray'
  },
  badgeText: {
    color: 'white', // Adjust badge text color
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default GalleryView;
