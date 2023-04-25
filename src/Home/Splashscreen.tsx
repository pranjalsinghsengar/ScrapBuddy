import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

const Splashscreen = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require('')}
        style={styles.image}
      /> */}
      <Text>SCRAP BUDDY</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Splashscreen;
