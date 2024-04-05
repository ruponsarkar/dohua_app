import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native';
import { Card, Divider, Badge, Icon, Button } from '@rneui/themed';
import CSS from '../assets/css';

import ModalView from '../component/modal';
import ChangeEMI from './chnageEMI';
import ChangeRole from './changeRole';

const ManageTeam = ({ navigation }) => {

    const [modal1, setModal1] = useState('');
    const [modal2, setModal2] = useState('');


    return (
        <ScrollView>
            <Card>
                <View>
                    <Text style={[CSS.textCenter, CSS.fontBold]}>Manage Team</Text>
                </View>
            </Card>
            <Card>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 2,
                    flexWrap: 'wrap'
                }}>
                    <View style={{ padding: 2 }}>
                        <Button size='sm' onPress={() => navigation.navigate('AddMember')}>+Add Member</Button>
                    </View>
                    <View style={{ padding: 2 }}>
                        <Button size='sm' onPress={() => navigation.navigate('Designation')}>+Add Designation</Button>
                    </View>
                </View>
            </Card>

            <Card>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 2,
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <View style={{ padding: 2 }}>
                        <Text style={CSS.fontBold}> Current EMI: 2000 </Text>
                    </View>
                    <View style={{ padding: 2 }}>
                        <Button size='sm' onPress={() => setModal1(true)}>Change EMI</Button>
                    </View>
                </View>
            </Card>
            <Card>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 2,
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <View style={{ padding: 2 }}>
                        <Text style={CSS.fontBold}> Current Target: 500000 </Text>
                    </View>
                    <View style={{ padding: 2 }}>
                        <Button size='sm' onPress={() => setModal1(true)}>Change Target</Button>
                    </View>
                </View>
            </Card>


            <Card>
                <Text h4 style={{ textAlign: 'center' }}>All Members</Text>
                <Divider style={{ marginBottom: 5 }} />

                <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>

                    <Text style={{ width: '70%' }}>
                        Rupon Sarkar <Text style={CSS.fontBold}>(Member)</Text>
                    </Text>

                    <Text style={{ width: '30%' }}>
                        <View style={{ padding: 2 }}>
                            <Button size='sm' onPress={()=>setModal2(true)}>Change</Button>
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

            <ModalView open={modal1} close={setModal1} data={<ChangeEMI />} />
            <ModalView open={modal2} close={setModal2} data={<ChangeRole />} />





        </ScrollView>
    )
}

export default ManageTeam;