import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./barnav";
import Login from "../login/login";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth = () => {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState("");


   const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log("token", value);
        setToken(value)
      }
    } catch (error) {
      console.log("error to get token", error);
    }
  };

  useEffect(()=>{
    retrieveData()
  },[token]);
 


  return (
    <>
      {token === "123" ? (
        <MyTabs />
      ) : (
        <>
          
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, gestureStart: true, title: "Login" }}
          />
        </Stack.Navigator>
        </>
      )}
    </>
  );
};

export default Auth;
