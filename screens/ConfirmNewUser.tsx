import {StyleSheet, Text, Alert, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomNav from '../BottomNav';
import database, {firebase} from '@react-native-firebase/database';
import {useGobalContext} from './GlobalContext';
import {useNavigation} from '@react-navigation/native';
import WelcomeScreen from './WelcomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BuyPage from '../src/NewuserDisplay/BuyPage';
import Page1 from '../src/BordingPage/Page1';

const Stack = createNativeStackNavigator();

const ConfirmNewUser = () => {
  const {userIdRef} = useGobalContext();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const db = await database();
      db.ref(`/users/${userIdRef.current}/uplaod`).once(
        'value',
        querySnapshot => {
          const main = [];
          querySnapshot.val();
          console.log('=ConfirmNewUser==> ', querySnapshot.val());

          setUserData(querySnapshot.val());

          //   console.log('ConfirmNewUser: ', main);
          console.log('global: ', userIdRef.current);
        },
      );
    } catch (e) {
      console.log(e);
    }
  };
  if (userData) {
    console.log('userData=> ', userData);
  }
  // useEffect(() => {
  //   closeActivityIndicator();
  // }, [loading]);
  // const closeActivityIndicator = () => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {
        userData ? (
          // <ActivityIndicator

          <Stack.Screen name="Page_1" component={Page1} />
        ) : (
          // <Text style={{color: 'blue'}}>sad</Text>
          <Stack.Screen name="BottomNav" component={BottomNav} />
        )
        // User is signed in
      }
    </Stack.Navigator>
  );
};

export default ConfirmNewUser;

const styles = StyleSheet.create({});
