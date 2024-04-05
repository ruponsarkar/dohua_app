import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Button, Divider } from '@rneui/themed';
import ModalView from '../component/modal';
import CSS from '../assets/css';

const Designation = () => {

    const [name, onChangeName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [phone, onChangePhone] = React.useState('');
    const [designation, onChangeDesignation] = React.useState('');
    const [address, onChangeAddress] = React.useState('');


    const [text, setText] = React.useState('');

    const handleSubmit = () => {
        const data = {
            name, email, phone, designation, address
        }
        setText(data);
        console.log(data);
    }

    return (
        <ScrollView>
            <Card>
                <View>
                    <Text style={[CSS.textCenter, CSS.fontBold, { padding: 10 }]}>Add New Designation</Text>
                </View>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        placeholder="Enter New Designation"
                        value={name}
                    />


                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding: 2,
                        flexWrap: 'wrap'
                    }}>
                        <View style={{ padding: 5 }}>
                            <Button size='sm' onPress={handleSubmit}>Add Designation</Button>
                        </View>
                    </View>

                    {/* <View>
                        <Text>aa = {text.name}</Text>
                    </View> */}


                </SafeAreaView>

            </Card>

            <Card>
                <Text h4 style={{ textAlign: 'center' }}>All Designation</Text>
                <Divider style={{ marginBottom: 5 }} />

                <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>

                    <Text style={{ width: '70%' }}>
                        Rupon Sarkar <Text style={CSS.fontBold}>(Member)</Text>
                    </Text>

                    <Text style={{ width: '30%' }}>
                        <View style={{ padding: 2 }}>
                            <Button size='sm'>Change</Button>
                        </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>

                    <Text style={{ width: '70%' }}>
                        Rupon Sarkar <Text style={CSS.fontBold}>(Member)</Text>
                    </Text>

                    <Text style={{ width: '30%' }}>
                        <View style={{ padding: 2 }}>
                            <Button size='sm'>Change</Button>
                        </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>

                    <Text style={{ width: '70%' }}>
                        Rupon Sarkar <Text style={CSS.fontBold}>(Member)</Text>
                    </Text>

                    <Text style={{ width: '30%' }}>
                        <View style={{ padding: 2 }}>
                            <Button size='sm'>Change</Button>
                        </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>

                    <Text style={{ width: '70%' }}>
                        Rupon Sarkar <Text style={CSS.fontBold}>(Member)</Text>
                    </Text>

                    <Text style={{ width: '30%' }}>
                        <View style={{ padding: 2 }}>
                            <Button size='sm'>Change</Button>
                        </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>

                    <Text style={{ width: '70%' }}>
                        Rupon Sarkar <Text style={CSS.fontBold}>(Member)</Text>
                    </Text>

                    <Text style={{ width: '30%' }}>
                        <View style={{ padding: 2 }}>
                            <Button size='sm'>Change</Button>
                        </View>
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>

                    <Text style={{ width: '70%' }}>
                        Rupon Sarkar <Text style={CSS.fontBold}>(Member)</Text>
                    </Text>

                    <Text style={{ width: '30%' }}>
                        <View style={{ padding: 2 }}>
                            <Button size='sm'>Change</Button>
                        </View>
                    </Text>
                </View>


            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: "100%",
        margin: 5,
        borderWidth: 1,
        padding: 10,
    },
});

export default Designation;