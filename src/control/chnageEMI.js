import React from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Button } from '@rneui/themed';
import ModalView from '../component/modal';
import CSS from '../assets/css';

const ChangeEMI = () => {

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
        <View style={{width: '80%', height: '50%'}}>
            {/* // <ScrollView> */}
            <View >
                <Text style={[CSS.textCenter, CSS.fontBold, { padding: 10 }]}>Change EMI</Text>
            </View>
            <SafeAreaView>
                <Text>Current EMI 2000</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    placeholder="Entrt New EMI"
                    value={email}
                    keyboardType="numeric"
                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 2,
                    flexWrap: 'wrap'
                }}>
                    <View style={{ padding: 5 }}>
                        <Button size='sm' onPress={handleSubmit}>Update</Button>
                    </View>
                </View>


            </SafeAreaView>

            {/* </ScrollView> */}
        </View>
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

export default ChangeEMI;