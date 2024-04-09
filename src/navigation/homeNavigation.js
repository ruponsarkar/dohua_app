import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../home';
import List from '../list';
import MyTabs from './barnav';
import { NavigationContainer } from '@react-navigation/native';

const HomeNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Homepage" component={MyTabs} options={{ headerShown: false, gestureStart: true, title: 'Overview' }} />
            <Stack.Screen name="List" component={List} options={{ headerShown: false, gestureStart: true, title: 'List' }} />

        </Stack.Navigator>

    )




}

export default HomeNavigation;