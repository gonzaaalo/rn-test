import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/Home";
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import {store, persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Star wars characters', 
            headerStyle: {
              backgroundColor: "#1B1A1A",              
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}

