import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    // Text,
    useColorScheme,
    View,
    Button,
} from 'react-native';

import { Card, Text, Divider, Badge, Icon } from '@rneui/themed';

import CSS from '../assets/css';


const List = ({ navigation }) => {
    return (
        <ScrollView>
        


            <Card>
                <Text h4 style={{ textAlign: 'center' }}>January - 2024</Text>
                {/* <hr/> */}
                <Divider style={{ marginBottom: 5 }} />

                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Paid" status="success" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Payment Due:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        01-02-2024
                    </Text>
                </View>

                <Button
                    title="View all Details"
                    onPress={() => navigation.navigate('List')}
                />

            </Card>

            <Card>
                <Text h4 style={{ textAlign: 'center' }}>December - 2023</Text>
                {/* <hr/> */}
                <Divider style={{ marginBottom: 5 }} />

                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Paid" status="success" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Rupon Sarkar:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        <Badge value="Pending" status="error" />
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                    <Text style={{ width: '50%' }}>
                        Payment Due:
                    </Text>

                    <Text style={{ width: '50%' }}>
                        01-02-2024
                    </Text>
                </View>

                <Button
                    title="View all Details"
                    onPress={() => navigation.navigate('List')}
                />

            </Card>

          


        </ScrollView>
    )
}

export default List;