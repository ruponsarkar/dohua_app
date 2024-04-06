import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../home';
import List from '../list';
import { NavigationContainer } from '@react-navigation/native';
import Control from '../control';
import AddMember from '../control/addMember';
import ManageTeam from '../control/projectList';
import Designation from '../control/designation';

const ControlNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='ManageTeam'>
            <Stack.Screen name="ManageTeam" component={ManageTeam} options={{ headerShown: false, gestureStart: true, title: 'Overview' }} />

            <Stack.Screen name="AddMember" component={AddMember} options={{ headerShown: false, gestureStart: true, title: 'AddMember' }} />
            <Stack.Screen name="Designation" component={Designation} options={{ headerShown: false, gestureStart: true, title: 'Designation' }} />

        </Stack.Navigator>

    )




}

export default ControlNavigation;