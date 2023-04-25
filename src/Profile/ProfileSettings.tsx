import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProfileSettings = () => {
  return (
    <View style={styles.ProfileSettings_container}>
      <Text>ProfileSettings</Text>
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  ProfileSettings_container:{
    flex:1,
  }
});
