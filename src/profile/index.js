import React, {useEffect, useContext} from 'react'
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


  const logout=()=>{

    
    dispatch({
      type: "SIGN_OUT",
    });
    
    AsyncStorage.clear();
    return;
    

    
  }



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
      <Text style={styles.username}>John Doe</Text>
      <Text style={styles.bio}>Designation</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>john.doe@example.com</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Location:</Text>
        <Text style={styles.infoText}>New York, USA</Text>
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