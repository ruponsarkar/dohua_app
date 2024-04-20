import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Preview from "../gallery/preview";

import Login from "../login/login";
import TabNav from "./barnav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GalleryView from "../gallery";

export const AuthContext = React.createContext();
const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const isLoggedIn = true;

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      {
        console.log("action==>>", action);
      }
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.userToken,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.userToken,
            user: action.user,
            // token: action.token,
            // LoginType: 2,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // userToken = await AsyncStorage.getItemAsync("userToken");
        const userToken = await AsyncStorage.getItem("userToken");
        dispatch({ type: "RESTORE_TOKEN", userToken: userToken });
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      //   dispatch({ type: "RESTORE_TOKEN", userToken: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        let user;
        user = null;
        try {
          user = await AsyncStorage.getItem("user");
          userToken = await AsyncStorage.getItem("userToken");
          const modifiedUser = JSON.parse(user);
          console.log("modifiiedUser=index=>", modifiedUser);
          dispatch({
            type: "SIGN_IN",
            user: modifiedUser,
            userToken: userToken,
          });
          //   dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        } catch (e) {
          console.log(e);
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ authContext, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken ? (
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={TabNav}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Gallery"
                component={GalleryView}
                options={{
                  headerShown: true,
                  gestureStart: true,
                  title: "Gallery",
                }}
              />
              <Stack.Screen
                name="Preview"
                component={Preview}
                options={{
                  headerShown: true,
                  StackAnimationTypes: "fullScreenModal",
                  animation: "fade",
                }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Login" component={Login} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
