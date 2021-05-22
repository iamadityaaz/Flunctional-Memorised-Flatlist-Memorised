/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Signin from './src/screens/Signin';
import Home from './src/screens/Home';

const Stack = createStackNavigator();

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuth = () => {};

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="signin" component={Signin} />
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
