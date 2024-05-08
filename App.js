// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Questions from './src/pages/Questions';
import {ROUTE_NAME} from './src/constants';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={ROUTE_NAME.HOME} component={Home} />
        <Stack.Screen name={ROUTE_NAME.QUESTIONS} component={Questions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
