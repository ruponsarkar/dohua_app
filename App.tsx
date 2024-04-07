/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
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




import AuthStack from './src/navigation/homeNavigation';
import { NavigationContainer } from '@react-navigation/native';

import MyTabs from './src/navigation/barnav';
import Address from './src/home/address';
import { Provider } from 'react-redux'

import { store } from './src/redux/store';




type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>

    </Provider>
  );
}



export default App;
