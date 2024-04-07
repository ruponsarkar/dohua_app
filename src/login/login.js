import React,{ useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput, 
    TouchableOpacity,
    Image
} from 'react-native';

const Login = () => {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement authentication logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Example: You can use libraries like Firebase or your backend API for authentication
  };

    return (
        <View style={styles.container}>
        <Image source={require('../assets/image/aiidc-logo.png')} style={styles.logo} />
        <Text style={{ color: "black", fontSize: 25, paddingBottom: 10}}>AIIDC GIS DISPUR</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 40,
    },
    inputView: {
      width: '80%',
      backgroundColor: '#e6e6e6',
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      justifyContent: 'center',
      padding: 20,
    },
    inputText: {
      height: 50,
      color: '#003f5c',
    },
    loginBtn: {
      width: '80%',
      backgroundColor: '#003f5c',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      marginBottom: 10,
    },
    loginText: {
      color: 'white',
    },
  });
export default Login;