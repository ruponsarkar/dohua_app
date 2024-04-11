import React, {useEffect, useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProjectListScreen from "../projectList/ProjectListScreen";
import ProjectDetailsScreen from "../ProjectDetails/projectDetails";
import Profile from "../profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const ProjectListNav=()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProjectListScreen"
        component={ProjectListScreen}
        options={{ headerShown: true, gestureStart: true, title: "Projects" }}
      />
      <Stack.Screen
        name="ProjectDetailsScreen"
        component={ProjectDetailsScreen}
        options={{ headerShown: true, gestureStart: true, title : 'Project Details' }}
      />
    </Stack.Navigator>
  );

}


function TabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home Page"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Project List"
        component={ProjectListNav}
        options={{
          headerShown: false,
          tabBarLabel: "Project List",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNav;