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

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleSignUp = () => {
    if ((email, password)) {
      if (password.length < 8) {
        Alert.alert('Password is more than 7');
      }

      useEffect(() => {
        // const reference = database().ref('/users/123').push();
        firebase
          .database()
          .ref('Users/')
          .set({
            email,
          })
          .then(data => {
            //success callback
            console.log('data ', data);
          })
          .catch(error => {
            //error callback
            console.log('error ', error);
          });
      });

      auth()
        .createUserWithEmailAndPassword(email, password)

        .then(() => {
          // reference
          //   .ref('users')
          //   .push({
          //     email: email,
          //   })
          //   .then(() => {
          //     console.log('Data sent successfully');
          //   })
          //   .catch(error => {
          //     console.error('Error sending data: ', error);
          //   });

          navigation.navigate('Form');
          console.log('User account created & signed in!');
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
    }
  };

  return (
    <View style={styles.container}>
      {/* BAck */}
      <View style={{position: 'absolute', left: 20, top: 20}}>
        <Text onPress={() => navigation.navigate('SignInScreen')}>back</Text>
      </View>
      <Text style={styles.title}>Sign Up</Text>
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
      <TouchableOpacity style={styles.button} onPress={()=>HandleSignUp}>
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
