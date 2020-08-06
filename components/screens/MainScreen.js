import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomScreen from './CustomScreen/CustomScreen';
import EditScreen from './EditSubject/EditScreen';
import ConfigScreen from './ConfigureScreen/ConfigScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default MainScreen = () => {


  return (

    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={CustomScreen} />
        <Drawer.Screen name="Edit Subjects" component={EditScreen} />
        <Drawer.Screen name="Configure" component={ConfigScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
