import {StyleSheet, Text, View} from 'react-native';
import React,{useEffect}from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ShowUploads from './ShowUploads';
import ProfileSettings from './ProfileSettings';
import About from './About';

const STab = createMaterialTopTabNavigator();




const Profile = () => {

 

  return (
    <View style={styles.Profile_container}>
      <About />
      {/*  */}
      <ProfileSettings/>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Profile_container:{
    flex:1,
  }
});
