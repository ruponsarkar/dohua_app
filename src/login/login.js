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
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../navigation/index";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const districts = ["Barpeta", " Jorhat", "Sonitpur", "Silchar", "Tinsukia"];

  const [selected, setSelected] = useState("Barpeta");

  const handleLogin = () => {
    if (!email || !password) {
      // Alert the user if any required fields are empty
      Alert.alert("Error", "Please fill in all required fields");
      return;
    } else {
      // Implement authentication logic here
      console.log("Email:", email);
      console.log("Password:", password);

      authlogin();
    }
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
        email: email,
        password: password,
        // email: "cpphookan.acs@assam.gov.in",
        // password: "Chinmoy#123",
        // email: "jorhatgisspecialist@gmail.com",
        // password: "password123@",
      },
    };

    // let api = "http://statedatacenterdispuraiidc.com:9000/api/authenticate"
    let api = "http://statedatacentreaiidc.com:8500/api/authenticate";

    try {
      const response = await axios.post(api, requestData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });

      var user = response.data.message.usr;
      // console.log("response==>>", response);
      console.log("res==>>", JSON.stringify(user));

      if (!JSON.stringify(user)) {
        console.log("login error");
        Alert.alert("Login failed !", "Wrong Email or Password ", [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
        return;
      }

      var data = [
        ["user", JSON.stringify(user)],
        ["userToken", user?.email],
      ];
      AsyncStorage.multiSet(data, (res) => {});
      dispatch({
        type: "SIGN_IN",
        user: user,
        userToken: user?.email,
        LoginType: 2,
      });
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

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/image/aiidc-logo.png")}
        style={styles.logo}
      />
      <Text style={{ color: "black", fontSize: 25, paddingBottom: 10 }}>
        State Data Center
      </Text>

      {/* <View style={styles.selectBox}>
        <Picker
          selectedValue={selected}
          onValueChange={(text, itemIndex) => setSelected(text)}
        >
          {districts && districts.map((d)=>(
            <Picker.Item label={d} value={d} />
          ))}
        </Picker>
      </View> */}

      <View>
        <Text style={{ paddingBottom: 15, fontWeight: "bold" }}>
          Barpeta/ Jorhat/ Sonitpur/ Silchar/ Tinsukia
        </Text>
      </View>

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

  selectBox: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 0,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "white",
  },
});
export default Login;
