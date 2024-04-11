import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyTabs from './barnav';
import Login from '../login/login';


import { NavigationContainer } from '@react-navigation/native';

const HomeNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Homepage" component={MyTabs} options={{ headerShown: false, gestureStart: true, title: 'Overview' }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureStart: true, title: 'Login' }} />

        </Stack.Navigator>

    )




}

export default HomeNavigation;