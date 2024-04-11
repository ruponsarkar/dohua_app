import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";


import { AuthContext } from "../navigation/index";

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => {
    // Implement authentication logic here
    console.log("Email:", email);
    console.log("Password:", password);

    authlogin();
    return;

    storeData();

    // navigation.navigate('home')
  };

  const authlogin = async () => {
    // const response = await axios.post(
    //   "https://learnoindia.zakticonsulting.in/backend/public/api/login?email=admin@admin.com&password=admin",
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );

    const requestData = {
      requestObject: {
        email: "cpphookan.acs@assam.gov.in",
        password: "Chinmoy#123",
      },
    };

    try {
      const response = await axios.post(
        "http://statedatacenterdispuraiidc.com:9000/api/authenticate",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      var user = response.data.message.usr;
      console.log("==>>", JSON.stringify(user));

      console.log("Response:", user?.email);

// return;
      AsyncStorage.setItem("userToken", JSON.stringify(user?.email));
      dispatch({
        type: "SIGN_IN",
        user: user,
        token: user?.email,
        LoginType: 2,
      });


      // storeData(response.data.message.usr.email);

      // saveToken(response.data.message.usr, response.data.message.usr.email);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Login failed !", "Wrong Email or Password ", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  const storeData = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      console.log("token saved");
      navigation.navigate("Home");
    } catch (error) {
      // Error saving data
      console.log("error store token", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/image/aiidc-logo.png")}
        style={styles.logo}
      />
      <Text style={{ color: "black", fontSize: 25, paddingBottom: 10 }}>
        AIIDC GIS DISPUR
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#e6e6e6",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#003f5c",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
export default Login;
