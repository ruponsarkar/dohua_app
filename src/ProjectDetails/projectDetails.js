import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import FastImage from 'react-native-fast-image';
import moment from 'moment';

const ProjectDetailsScreen = () => {
  // Sample project details
  const route = useRoute();

  const { project } = route.params;

  console.log("project", project);
  const projectDetails = project;

  const wo_date = moment(projectDetails.wo_date).format('DD/MM/YYYY');
  const actual_end = moment(projectDetails.actual_end).format('DD/MM/YYYY');

  const [img, setImg] = useState([]);
  const [loader, setLoader] = useState({
    open: false,
    text: "",
  });
  useEffect(() => {
    getImgByProject();
  }, []);

  const getImgByProject = () => {
    setLoader({
      open: true,
      text: "Please Wait",
    });
    axios
      .get(
        "https://pageuptechnologies.com/api/getImgByProject/" +
          projectDetails.id
      )
      .then((res) => {
        console.log("resposeIg", res.data.data);
        setImg(res.data.data);
        setLoader({
          open: false,
        });
      })
      .catch((err) => {
        console.log("err get img", err);
      });
  };



  // Render each image in the gallery
  const renderImageItem = ({ item }) => (
    // <Image source={item.source} style={styles.imageItem} resizeMode="cover" />
    <TouchableOpacity onPress={() => console.log("item.image", item.image)}>
      <Image
        source={{ uri: `https://pageuptechnologies.com/project/${item.image}` }}
        style={styles.imageItem}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );

  // Function to determine status text style based on project status
  const getStatusStyle = (status) => {
    switch (status) {
      case "In Progress":
        return { color: "orange" };
      case "Completed":
        return { color: "green" };
      case "On Hold":
        return { color: "red" };
      default:
        return {};
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.projectName}>{projectDetails.name} </Text>
        <Text style={styles.projectDescription}>
          {projectDetails.description}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Project type:</Text>
        <Text style={styles.detailsText}>{projectDetails.type}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>District:</Text>
        <Text style={styles.detailsText}>{projectDetails.district}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Source of Fund:</Text>
        <Text style={styles.detailsText}>{projectDetails.scheme}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Contractor Name:</Text>
        <Text style={styles.detailsText}>{projectDetails.contractor_name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Contractor's Phone:</Text>
        <Text style={styles.detailsText}>{projectDetails.contractor_phone}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Percentage Progress:</Text>
        <Text style={styles.detailsText}>{projectDetails.percentageProgress}%</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Financial Progress:</Text>
        <Text style={styles.detailsText}>{projectDetails.financialProgress}%</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Start Date:</Text>
        <Text style={styles.detailsText}>{wo_date}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>End Date:</Text>
        <Text style={styles.detailsText}>{actual_end}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>File No.:</Text>
        <Text style={styles.detailsText}>{projectDetails.fileNo}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Remarks :</Text>
        <Text style={styles.detailsText}>{projectDetails.remarks}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Status:</Text>
        <Text
          style={[styles.detailsText, getStatusStyle(projectDetails.status)]}
        >
          {projectDetails.status}
        </Text>
      </View>
      <View style={styles.imageGallery}>
        <FlatList
          data={img}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  projectName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  projectDescription: {
    fontSize: 16,
    color: "#666666",
  },
  detailsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  detailsText: {
    fontSize: 16,
  },
  imageGallery: {
    marginTop: 20,
    marginBottom: 20,
  },
  imageItem: {
    width: 150,
    height: 190,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor:"#ede8e8",
    borderWidth: 2,
    borderColor: '#ede8e8',
  },
});

export default ProjectDetailsScreen;
