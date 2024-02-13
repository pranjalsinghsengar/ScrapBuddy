import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import About from './About';
import ShowUserData from '../../screens/ShowUserData';

// const STab = createMaterialTopTabNavigator();

const Profile = () => {
  return (
    <ScrollView>
      <View style={styles.Profile_container}>
        <About />
        {ShowUserData ? <ShowUserData /> : null}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Profile_container: {
    flex: 1,
  },
});
