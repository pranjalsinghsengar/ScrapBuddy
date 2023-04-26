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

const DummyData = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [listdummyData, setListDummyData] = useState(null);
const [userId, setUserId] = useState(null)

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const data = await database().ref(`users/`).once('value');
      setListDummyData(data.val());
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

   firebase.auth().onAuthStateChanged(user => {
    setUserId(user.uid)
    console.log(userId);
    // console.log(user.uid);
    console.log(user.email);
  });
  
  const SignUp = async () => {
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
  };

  // console.log('stored is : ' + listdummyData);

  // const List = dummyData.ma

  return (
    <View style={styles.container}>
      {/* {listdummyData.map } */}
      <Text style={styles.title}>
        {listdummyData ? listdummyData.user_Name : 'looding'}
        {listdummyData ? listdummyData.user_mail : 'looding'}
        {/* {listdummyData ? listdummyData.b : 'looding'} */}
        {/* email data is: {listdummyData.e} */}
        {/* {listdummyData} */}
      </Text>
      <Text style={styles.title}>Dummy Data</Text>
      <TextInput
        // keyboardType="email-address"
        style={styles.input}
        placeholder="User name"
        onChangeText={e => setUserName(e)}
      />
      <TextInput
        // keyboardType="email-address"
        style={styles.input}
        placeholder="Email"
        onChangeText={e => setEmail(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={e => setPassword(e)}
        // secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={() => SignUp()}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DummyData;

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
