import {StyleSheet, Text, View} from 'react-native';
import React from 'react';



const About = () => {
  return (
    <View style={styles.about_container}>
      <View style={styles.about_innerContainer}>
        {/* Image */}
        <View style={styles.about_Image}></View>
        {/* Profile */}
        <View style={styles.about_profile_Pic}></View>
      </View>

      <View style={{left:10}}>
        <Text style={styles.about_name}>Organisation Name</Text>
        <Text style={styles.about_bio}>Bio</Text>

      </View>
    </View>
  );
};

export default About;
const h = 150;
const top = h - 50;
const styles = StyleSheet.create({
  about_container: {
    flex: 1,
    // justifyC
    // backgroundColor:"blue"
  },
  about_innerContainer: {
    position: 'relative',
    height: h + 50,
  },
  about_Image: {
    height: h,
    backgroundColor: 'grey',
  },
  about_profile_Pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
    position: 'absolute',
    top: top,
    left: 20,
  },
  about_name: {
    fontSize: 20,
    marginVertical:10,
    
    // backgroundColor: 'green',
},
about_bio:{
    fontSize: 16,
    marginVertical:10,
    
  }
});
