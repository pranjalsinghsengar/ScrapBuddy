import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useGobalContext} from '../../screens/GlobalContext';
import ShowUserData from '../../screens/ShowUserData';
// import Header from '../../components/Home/Header';

// import SplashScreen from './SplashScreen';

const Home = () => {
  // const [Active, setActive] = useState(' ');

  // const image= {userData ? userData.ImgUrl : 'loading...'};
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{flex: 1}}>
        <View style={styles.hehe}>
          <View style={styles.main_container}>
            <Text style={{color: 'black'}}>Home</Text>
          </View>
        </View>
      </View>
      <ShowUserData />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  hehe: {
    flex: 1,
    // height: '100%',
  },
  main_container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  Inner_main_container: {
    flex: 1,
    width: '90%',
    // height: '100%',
  },
});
export default Home;
