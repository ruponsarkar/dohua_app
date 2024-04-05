import React from 'react'
import { View, Text, ScrollView } from 'react-native';
import ManageTeam from './manageTeam';
// import AddMember from './addMember';

const Control = () => {
    return (
        <ScrollView>
            <View>
                <ManageTeam/>
            </View>
        </ScrollView>
    )
}

export default Control;