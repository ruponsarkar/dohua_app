import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Button,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

export default function Preview({ navigation }) {
  const route = useRoute();
  const { image, projectId } = route.params;

  console.log("==>>>", image.thumb);
  return (
    <>
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: `https://pageuptechnologies.com/test/thumb/${image?.thumb}`,
        }}
        style={styles.image}
      >
        <View style={styles.infoContainer}>
          {/* <Text style={styles.title}>{image.address}</Text> */}
          <Text style={styles.description}>Latitude: {image.latitude}</Text>
          <Text style={styles.description}>Longitude: {image.longitude}</Text>
          <Text style={styles.description}>Address: {image.address}</Text>
        </View>
      </ImageBackground>

      
    </View>
    <View style={styles.bottomElement}>
        <View>
          <Button onPress={()=> navigation.goBack()} title="Go back" />
        </View>
        <View>
          <Button disabled={projectId? false: true} title="Upload " onPress={()=>navigation.navigate('Gallery', {upload: image, projectId: projectId })} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  infoContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    fontSize: 16,
  },

  bottomElement: {
    // flex: 1,
    flexDirection: 'row', // Horizontal layout
    height: 50, // Adjust height as needed
    // backgroundColor: 'red', // Example background color
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
    paddingHorizontal: 20, // Horizontal padding to create space from edges
    justifyContent: 'space-between',

  },

  
});
