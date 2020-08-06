import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomScreen from './CustomScreen/CustomScreen';
import EditScreen from './EditSubject/EditScreen';
import ConfigScreen from './ConfigureScreen/ConfigScreen';
import colors from '../../constants/colors'

import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import { Image } from 'native-base';


const Drawer = createDrawerNavigator();

export default MainScreen = () => {

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={{backgroundColor: colors.color5,height: 150,marginTop: -5}} />
        <View style={{flexDirection: 'row',marginTop: -40, paddingHorizontal: 20}} >
          <Image source={require('../../constants/profile.jpeg')} style={{height: 50}} />
          <Text style={{color: '#fff', fontSize: 22,fontWeight: 'bold'}}>Bunker</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }

  return (

    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} /> }
      drawerContentOptions={{
        activeTintColor: '#aaa',
      }}
      >
        <Drawer.Screen name="Home" component={CustomScreen}/>
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
