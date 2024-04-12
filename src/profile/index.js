import React, {useEffect, useContext, useState} from 'react'
import {
  
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from "../navigation/index";
import { AuthContext } from '../navigation';



const Profile = ({navigation}) => {

  const { dispatch } = useContext(AuthContext);
const [user, setUser] = useState();

  const logout=()=>{
    dispatch({
      type: "SIGN_OUT",
    });
    AsyncStorage.clear();
    return;
  }


  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        console.log("value", value);
        setUser(JSON.parse(value))
      }
    } catch (error) {
    }
  };

  useEffect(()=>{
    retrieveData();
  },[]);



    const imageExists = () => {
        try {
          return profileImage && profileImage.uri;
        } catch (error) {
          return false;
        }
      };



      
    return (
        <View style={styles.container}>
      {imageExists() ? (
        <Image source={profileImage} style={styles.profileImage} />
      ) : (
        <Image source={require('../assets/image/aiidc-logo.png')} style={styles.profileImage} />
      )}
      <Text style={styles.username}>{user?.name}</Text>
      <Text style={styles.bio}>Designation</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{user?.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Phone:</Text>
        <Text style={styles.infoText}>{user?.phone_no}</Text>
      </View>

      <View>
        <Button title='Logout' onPress={logout} />

      </View>
      {/* Add more information as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 18,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
  },
});

export default Profile;