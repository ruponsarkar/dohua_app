import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProjectListScreen from "../projectList/ProjectListScreen";
import ProjectDetailsScreen from "../ProjectDetails/projectDetails";

import { NavigationContainer } from "@react-navigation/native";

const ProjectNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ProjectListScreen">
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
};

export default ProjectNavigation;
