import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import Header from '../../components/Home/Header';


// import SplashScreen from './SplashScreen';

const Home = () => {
  // const [Active, setActive] = useState(' ');

  return (
    <View style={{height: '100%'}}>
      <View style={styles.hehe}>
         <View style={styles.main_container}>
          <View style={styles.Inner_main_container}>
            <Text>Home</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hehe: {
    height: '100%',
  },
  main_container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  Inner_main_container: {
    width: '90%',
    height: '100%',
  },
});
export default Home;
