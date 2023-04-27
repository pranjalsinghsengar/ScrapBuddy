import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {useGobalContext} from '../../screens/GlobalContext';
import ShowUserData from '../../screens/ShowUserData';
// import Header from '../../components/Home/Header';

// import SplashScreen from './SplashScreen';

const Home = () => {
  // const [Active, setActive] = useState(' ');
  

  // const image= {userData ? userData.ImgUrl : 'loading...'};

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={styles.hehe}>
          <View style={styles.main_container}>
            <View style={styles.Inner_main_container}>
              <Text>Home</Text>

                <ShowUserData/>
              
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  hehe: {
    // height: '100%',
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
    // height: '100%',
  },
});
export default Home;
