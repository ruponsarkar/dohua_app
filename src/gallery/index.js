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

  const getImg = (user_id) => {
    setLoader({
      open: true,
      text: "Loading Pictures...",
    });
    axios
      .get("https://pageuptechnologies.com/api/getImg/" + user_id)
      .then((res) => {
        setImg(res.data.data.map((e) => ({ ...e, loading: true })));
        setLoader({
          open: false,
        });
      })
      .catch((err) => {
        console.log("err get img", err);
      });
  };

  const retrieveData = async () => {
    // setLoader({
    //   open: true,
    //   text: "Please Wait",
    // });
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        setUser(JSON.parse(value));
        getImg(JSON.parse(value).id);
        console.log("==>>", JSON.parse(value).id);
        // setLoader({
        //   open: false,
        // });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(()=>{
    if (upload) {
      console.log("pr", upload);
      var source = "https://pageuptechnologies.com/test/" + upload.image;
      var dest = "https://pageuptechnologies.com/api/uploadImg";
      saveImageFromAPItoAPI(source, dest, upload);
    } else {
      console.log("no");
    }
  },[upload]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      {/* { console.log("==>>", item.loading)} */}

      <Image
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
      />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>-30 days</Text>
      </View>
    </TouchableOpacity>
  );

  const handleImagePress = (image) => {
    console.log("Image pressed:", image);
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
    backgroundColor:"rgba(0, 0, 0, 0.5)", // Adjust badge background color
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor:'gray'
  },
  badgeText: {
    color: 'white', // Adjust badge text color
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default GalleryView;
