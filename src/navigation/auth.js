import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./barnav";
import Login from "../login/login";
import HomeNavigation from "./homeNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState("");

  const user = useSelector((state) => state.user);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        console.log("token", value);
        setToken(value);
      }
      console.log("main token", token);
    } catch (error) {
      console.log("error to get token", error);
    }
  };

  useEffect(() => {
    console.log("ohooo===>>>", user);
    retrieveData();
  }, [user, token]);

  return (
    <>
      <>
        {user.token? (
          <>
            <Stack.Navigator initialRouteName="HomeNavigation">
              <Stack.Screen
                name="Home"
                component={HomeNavigation}
                options={{
                  headerShown: false,
                  gestureStart: true,
                  title: "HomeNavigation",
                }}
              />
            </Stack.Navigator>
          </>
        ) : (
          <>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                  gestureStart: true,
                  title: "Login",
                }}
              />
            </Stack.Navigator>
          </>
        )}

        {/* <Stack.Navigator initialRouteName="Login">

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, gestureStart: true, title: "Login" }}
          />
         
            <Stack.Screen
              name="Home"
              component={HomeNavigation}
              options={{
                headerShown: false,
                gestureStart: true,
                title: "HomeNavigation",
              }}
            />
        </Stack.Navigator> */}
      </>
    </>
  );
};

export default Auth;
