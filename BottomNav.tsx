import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/Ionicons';
import Home from './src/Home/Home';
import Profile from './src/Profile/Profile';
import Upload from './src/Upload/Upload';
import Search from './screens/Search/Search';
import Icon from 'react-native-vector-icons/FontAwesome';
// import FontAwesome, {RegularIcons} from 'react-native-fontawesome';

const Tab = createBottomTabNavigator();

const BottomNav = ({navigation}) => {
  // const {userId, setUserId } = route.params;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1A6575',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 50,
          position: 'absolute',
          bottom: 20,
          marginRight: 15,
          marginLeft: 15,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          // tabBarLabel: 'Upload',
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          // tabBarLabel: 'Upload',
          tabBarIcon: ({color}) => (
            <Icon name="upload" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        // initialParams={userId,}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});
