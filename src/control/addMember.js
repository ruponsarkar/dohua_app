import React from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Button } from '@rneui/themed';
import ModalView from '../component/modal';
import CSS from '../assets/css';


const AddMember = () => {

    const [name, onChangeName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [phone, onChangePhone] = React.useState('');
    const [designation, onChangeDesignation] = React.useState('');
    const [address, onChangeAddress] = React.useState('');


    const [text, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');

    const handleSubmit = () => {
        const data = {
            name, email, phone, designation, address
        }
        console.log(data);
    }

    return (
        <ScrollView>
            <Card>
                <View>
                    <Text style={[CSS.textCenter, CSS.fontBold, {padding: 10}]}>Add New Member</Text>
                </View>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        placeholder="Full Name"
                        value={name}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        placeholder="Email"
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePhone}
                        value={phone}
                        placeholder="Phone Number"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeDesignation}
                        value={designation}
                        placeholder="Designation"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeAddress}
                        placeholder="Full Address"
                        value={address}
                    />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding: 2,
                        flexWrap: 'wrap'
                    }}>
                        <View style={{ padding: 5 }}>
                            <Button size='sm' onPress={handleSubmit}>Add Member</Button>
                        </View>
                    </View>


                </SafeAreaView>

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

export default AddMember;