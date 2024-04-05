import React from 'react'
import { View, Text, ScrollView } from 'react-native';
import { Card, Divider, Badge, Icon, Button } from '@rneui/themed';
import CSS from '../assets/css';

const Notifications = () => {
    return (
        <ScrollView>

            <Card>
                <View>
                    <View>
                        <Text>
                            Please pay your EMI for <Text style={CSS.fontBold}> December 2024</Text>
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 2
                        }}>
                            <View style={{ padding: 2 }}>
                                <Button color="success" size='sm'>Pay Now</Button>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'right' }}>05-Jan-24</Text>
                    </View>
                </View>
            </Card>

            <Card>
                <View>
                    <View>
                        <Text>
                            Rupon Sarkar Paid Rs <Text style={CSS.fontBold}> 2000 </Text>for the Month of <Text style={CSS.fontBold}> December 2024</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'right' }}>05-Jan-24</Text>
                    </View>
                </View>
            </Card>

            <Card>
                <View>
                    <View>
                        <Text>
                            Rupon Sarkar wanted to change EMI to <Text style={CSS.fontBold}> 2500 </Text>
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 2
                        }}>
                            <View style={{ padding: 2 }}>
                                <Button color="success" size='sm'>Accept</Button>
                            </View>
                            <View style={{ padding: 2 }}>
                                <Button color="error" size='sm'>Reject </Button>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'right' }}>05-Jan-24</Text>
                    </View>
                </View>
            </Card>

            <Card>
                <View>
                    <View>
                        <Text>
                            Rupon Sarkar made <Text style={CSS.fontBold}> Muzzadid MD Akbar </Text>as  <Text style={CSS.fontBold}> Member </Text>
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 2
                        }}>
                            <View style={{ padding: 2 }}>
                                <Button color="success" size='sm'>Accept</Button>
                            </View>
                            <View style={{ padding: 2 }}>
                                <Button color="error" size='sm'>Reject </Button>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'right' }}>05-Jan-24</Text>
                    </View>
                </View>
            </Card>
            <Card>
                <View>
                    <View>
                        <Text>
                            Rupon Sarkar Paid Rs <Text style={CSS.fontBold}> 2000 </Text>for the Month of <Text style={CSS.fontBold}> December 2024</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'right' }}>05-Jan-24</Text>
                    </View>
                </View>
            </Card>
            <Card>
                <View>
                    <View>
                        <Text>
                            Rupon Sarkar Paid Rs <Text style={CSS.fontBold}> 2000 </Text>for the Month of <Text style={CSS.fontBold}> December 2024</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'right' }}>05-Jan-24</Text>
                    </View>
                </View>
            </Card>
            <Card>
                <View>
                    <View>
                        <Text>
                            Rupon Sarkar Paid Rs <Text style={CSS.fontBold}> 2000 </Text>for the Month of <Text style={CSS.fontBold}> December 2024</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={{ textAlign: 'right' }}>05-Jan-24</Text>
                    </View>
                </View>
            </Card>

        </ScrollView>
    )
}

export default Notifications;