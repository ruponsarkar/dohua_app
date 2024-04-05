/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import AuthStack from './src/navigation/homeNavigation';
import { NavigationContainer } from '@react-navigation/native';
import CSS from './src/assets/css';

import MyTabs from './src/navigation/barnav';

import Permission from './src/helper/permissions'




type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  // useEffect(()=>{
  //   Permission();
  // }, [])



  return (
    <NavigationContainer>
      <Permission />
      <MyTabs />
      {/* <AuthStack /> */}
    </NavigationContainer>

  );
}



export default App;
