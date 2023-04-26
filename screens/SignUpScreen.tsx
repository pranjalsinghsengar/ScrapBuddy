import React, {useEffect, useState} from 'react';
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

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
const [userId, setUserId] = useState(null)


  const HandleSignUp = async () => {
    if ((email, password)) {
      if (password.length < 8) {
        Alert.alert('Password is more than 7');
      }

      
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        // var user = {
        //   name: userName,
        //   phone: phoneNo,
        //   bio: bio,
        //   uid: userAuth.uid,
        //   email: userAuth.email,
        // }
        // writeUserData(user)
        .then(() => {
          console.log('User account created & signed in!');
          // console.log('userId' + user.userId);

          navigation.navigate('Form');
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
      firebase.auth().onAuthStateChanged(user => {
        setUserId(user.uid);
        console.log(userId);
        // console.log(user.uid);
        console.log(user.email);
      });
      try {
        const responce = await database()
          .ref(`/users/${userId}`)
          .set({
            user_Name: userName,
            user_mail: email,
            user_pass: password,
            uid: userId,
          })
          .then(() => {
            console.log('UserID: ' + userId);
            console.log('responce:' + responce);
          });
      } catch (e) {
        console.log(e);
      }

    }
  };

  return (
    <View style={styles.container}>
      {/* BAck */}
      <View style={{position: 'absolute', left: 20, top: 20}}>
        <Text onPress={() => navigation.navigate('SignInScreen')}>back</Text>
      </View>
      <Text style={styles.title}>Sign Up</Text>
      {/* Form */}
      <TextInput
        onChangeText={e => setUserName(e)}
        value={userName}
        placeholder="Full Name"
        style={styles.input}
      />
      <TextInput
        onChangeText={e => setBio(e)}
        value={bio}
        placeholder="Bio"
        style={styles.input}
      />
      <TextInput
        onChangeText={e => setPhoneNo(e)}
        value={phoneNo}
        placeholder="Organisation Number"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        keyboardType="email-address"
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
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
