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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [dummyData, setDummyData] = useState('');

useEffect(()=>{
    HandleSignUp();
},[])

  const HandleSignUp = async () => {
    try {
      const data = await database().ref('users/1').once('value');
      console.log(data);
      setDummyData(data.val())
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>

<Text>{dummyData} </Text>
<Text>{email} </Text>
<Text>{password} </Text>
      <Text style={styles.title}>Dummy Data</Text>
      <TextInput
        // keyboardType="email-address"
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
        // secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={() => HandleSignUp}>
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
