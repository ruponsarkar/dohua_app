import React from 'react'
import { View, Text, ScrollView } from 'react-native';
import Projects from './projectList';
// import AddMember from './addMember';

const Control = () => {
    return (
        <ScrollView>
            <View>
                <Projects/>
            </View>
        </ScrollView>
    )
}

export default Control;