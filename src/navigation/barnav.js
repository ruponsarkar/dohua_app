import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { Icon } from '@rneui/themed';
import Home from "../home";
import HomeNavigation from "./homeNavigation";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Notifications from "../notification/nitification";
import Profile from "../profile";
import Control from "../control";
import ControlNavigation from "./ControlNavigation";
import Login from "../login/login";
import ProjectListScreen from "../projectList/ProjectListScreen";
import ProjectDetailsScreen from "../ProjectDetails/projectDetails";

import ProjectNavigation from "./projectNav";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Project List"
          component={ProjectNavigation}
          options={{
            headerShown: false,
            tabBarLabel: "Project List",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />

        {/* <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarLabel: "Login",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </>
  );
}

export default MyTabs;
