import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Main from './pages/Main';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

const styles = StyleSheet.create({
  addDevsButton: {
    padding: 8,
    marginRight: 15,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
  },
});

const Routes = createAppContainer(

  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: 'DevRadar',
          headerRight: (
            <TouchableOpacity>
            
            </TouchableOpacity>
          ),
        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: 'Perfil Github',
        },
      },
      Admin: {
        screen: Admin,
        navigationOptions: {
          title: 'Gerenciar Devs',
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#28a745',
        },
      },
    }
  )
);

export default Routes;
