import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Card, Divider, Badge, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { browseGallery, handleOpenCamera } from "../home/camera";
import { useSelector } from "react-redux";
import axios from "axios";
import OverlayLoading from "../component/loader";
// import AddProject from "./addProject";
import config from "../../config";

const ProjectListScreen = ({ navigation, route }) => {
  const coords = useSelector((state) => state.location);

  const [refreshing, setRefreshing] = React.useState(false);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState();
  const [loader, setLoader] = useState({
    open: false,
    text: "",
  });


  useEffect(() => {
    if (route.params?.refresh) {
      getProjects(); // Refresh project list when returning
    }
  }, [route.params?.refresh]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getProjects();
      setRefreshing(false);
    }, 2000);
  }, []);


  const getProjects = () => {
    setLoader({
      open: true,
      text: "Loading Projects..",
    });
    var api = `${config.API_BASE_URL}/getAllProjects`;
    axios
      .post(api,{})
      .then((res) => {
        console.log("res", res.data);
        setProjects(res.data);
        setLoader({
          open: false,
        });
      })
      .catch((err) => {
        console.log("error on getProjects", err);
      });
  };

  const retrieveData = async () => {
    setLoader({
      open: true,
      text: "Loading User Information..",
    });
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        // We have data!!
        setUser(JSON.parse(value));
        console.log("==>>", JSON.parse(value).id);
        setLoader({
          open: false,
        });
      }
    } catch (error) {
      console.log("error", error);
      // Error retrieving data
    }
  };

  useEffect(() => {
    retrieveData();
    getProjects();
  }, []);

  const openCamera = async (project_id) => {
    var result = await handleOpenCamera();
    if (result.didCancel) {
      console.log("User cancelled image picker");
    } else if (result.error) {
      console.log("ImagePicker Error: ", response.error);
    } else {
      var img = result.assets[0];
      uploadToServer(img, project_id);
    }
  };

  const uploadToServer = (img, project_id) => {
    console.log("img, project_id", img, project_id);
    setLoader({
      open: true,
      text: "Uploading...",
    });

    const formData = new FormData();
    formData.append("docType", 'projectImages');
    formData.append("project_id", project_id);
    formData.append("user_id", user?.id);
    formData.append("GPSLatitude", coords.latitude);
    formData.append("GPSLongitude", coords.longitude);
    formData.append("address", coords.address);
    formData.append("file", {
      uri: img.uri,
      type: img.type,
      name: img.fileName,
    });
    
    var api = `${config.API_BASE_URL}/uploadFileMob`;
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
        console.log("error here=====>>", err);
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

  // Render each project item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.projectItem}
      onPress={() => handleProjectPress(item)}
    >
      <Text style={styles.projectName}>{item.name}</Text>
      <Text style={styles.projectDescription}>{item.description}</Text>
      {/* <Text style={styles.projectDescription}> accessKeyword {user?.accessKeyword}</Text> */}
      {/* accessKeyword */}
      <Text style={{ flexDirection: "row", flex: 1, textAlign: "center" }}>
        <Button
          size="sm"
          disabled={user?.accessKeyword === item.accessKeyword ? false: true}
          buttonStyle={{
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10,
          }}
          containerStyle={{
            // width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() =>
            navigation.navigate("Gallery", {
              projectId: item.id,
            })
          }
        >
          {" "}
          Browse &nbsp;
          <Icon
            name="upload"
            size={18}
            color={"white"}
            style={{ textAlign: "center" }}
          />
        </Button>{" "}
        &nbsp;
        <Button
          size="sm"
          disabled={user?.accessKeyword === item.accessKeyword ? false: true}
          buttonStyle={{
            backgroundColor: "rgba(199, 43, 98, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10,
          }}
          containerStyle={{
            // width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          // onPress={() => handleOpenCamera(item.id, location)}
          onPress={() => openCamera(item.id)}
        >
          {" "}
          Camera &nbsp;
          <Icon
            name="camera"
            size={18}
            color={"white"}
            style={{ textAlign: "center" }}
          />
        </Button>
      </Text>
    </TouchableOpacity>
  );

  // Handle project press
  const handleProjectPress = (project) => {
    console.log("Project selected:", project.id);
    navigation.navigate("ProjectDetailsScreen", {
      projectId: project.id,
      project: project,
    });
  };

  return (
    <>

      <View>
        <Button
          size="sm"
          buttonStyle={{
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10,
          }}
          containerStyle={{
            // width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() =>
            navigation.navigate("AddProject")
          }
        >
         + Add New Project
        </Button>
      </View>
      <OverlayLoading visible={loader.open} text={loader.text} />
      <View style={styles.container}>
        <FlatList
          data={projects}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  projectItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 16,
    color: "#666666",
  },
});

export default ProjectListScreen;
