import React, {useEffect, useState, useRef} from 'react';
import database, {firebase} from '@react-native-firebase/database';

import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Form from './Form';
import {useGobalContext} from './GlobalContext';

export const ContextInfo = React.createContext();

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userbio, setUserBio] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [userIdSignup, setUserIdSignup] = useState(null);
  const userIdSignupRef = useRef(null);

  // const {userId, setUserId, userIdRef} = useGobalContext();

  useEffect(() => {
    userIdSignupRef.current = userIdSignup;
  }, [userIdSignup]);

  const HandleSignUp = async () => {
    if (password.length >= 8 && userName && email && userbio && phoneNo) {
      await firebase.auth().onAuthStateChanged(user => {
        console.log('Signup_UID: ', user.uid);
        console.log(user.email);

        setUserIdSignup(user.uid);
      });

      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          // console.log('userId' + user.userId);

          navigation.navigate(
            'SignInScreen',
            // , {
            //   screen: 'About',
            //   params: {setUserId, userIdRef},
            // }
          );
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Alert.alert('That email address is invalid!');
          }

          console.error(error);
        });

      await setTimeout(() => {
        // Alert.alert('Alert Shows After 5 Seconds of Delay.');
      }, 3000);
      try {
        console.log('UserID12: ' + userIdSignupRef.current);
        await database()
          .ref(`/users/${userIdSignupRef.current}`)
          .set({
            user_Name: userName,
            user_Bio: userbio,
            user_mail: email,
            user_Phone: phoneNo,
            user_pass: password,
            uid: userIdSignupRef.current,
          })
          .then(() => {
            console.log('UserID: ' + userIdSignupRef.current);
            // console.log('responce:' + responce);
          });
      } catch (e) {
        console.log(e);
      }

      // if (userIdRef.current) {
      console.log('userId_1_Current: ' + userIdSignupRef.current);
      console.log('userId_1: ' + userIdSignup);
    } else {
      Alert.alert('Fill All Detail Correctly', 'Password Will be more than 8');
    }
  };

  return (
    <View style={styles.container}>
      {/* BAck */}
      <View style={{position: 'absolute', left: 20, top: 20}}>
        <Text
          style={{color: 'black'}}
          onPress={() => navigation.navigate('SignInScreen')}>
          back
        </Text>
      </View>
      <Text style={styles.title}>Sign Up</Text>
      {/* <Text style={styles.title}>{userIdRef}</Text> */}
      <Text style={styles.title}>{userIdSignupRef.current}</Text>
      {/* <Text style={styles.title}>{userIdRef.current.userId}</Text> */}
      {/* Form */}
      <TextInput
        onChangeText={e => setUserName(e)}
        value={userName}
        placeholderTextColor="black"
        placeholder="Full Name"
        style={styles.input}
      />
      <TextInput
        onChangeText={e => setUserBio(e)}
        value={userbio}
        placeholderTextColor="black"
        placeholder="Bio"
        style={styles.input}
      />
      <TextInput
        onChangeText={e => setPhoneNo(e)}
        value={phoneNo}
        placeholderTextColor="black"
        placeholder="Phone Number"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        keyboardType="email-address"
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="black"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="black"
        value={password}
        onChangeText={e => setPassword(e)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={() => HandleSignUp()}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignUpScreen;
