import React, {useEffect, useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProjectListScreen from "../projectList/ProjectListScreen";
import Profile from "../profile";

const Tab = createBottomTabNavigator();


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
        component={ProjectListScreen}
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