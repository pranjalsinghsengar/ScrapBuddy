import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
// import {firebase} from '@react-native-firebase/database';
import {useGobalContext} from './GlobalContext';
import database, {firebase} from '@react-native-firebase/database';

// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: 'YOUR_WEB_CLIENT_ID',
//   offlineAccess: true,
// });

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUserId} = useGobalContext();
  const {userIdRef} = useGobalContext();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const navigation = useNavigation();

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {});

  const Navi = async () => {
    await setTimeout(() => {
      // Alert.alert('I am appearing...', 'After 5 seconds!');
      navigation.navigate('ConfirmNewUser');
      setLoading(false);
    }, 2000);
  };

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

  const handleSignIn = async () => {
    if ((email, password)) {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        // navigation.navigate(userData ? 'BottomNav' : 'ConfirmNewUser');
        setLoading(true);
        Navi();

        await firebase.auth().onAuthStateChanged(user => {
          setUserId(user.uid);
          console.log('useruid ', user.uid);
          console.log(user.email);
        });
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="black"
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholderTextColor="black"
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        {loading ? (
          <ActivityIndicator />
          ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
        <Text style={styles.buttonText}>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
        <Text style={styles.buttonText}>FaceBook</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{marginTop: 30}}
        onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={{color: 'black'}}>
          Don't have Account?/Create a new account
        </Text>
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
    color: 'black',
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
    width: '100%',
    backgroundColor: '#007AFF',
    // paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});

export default SignInScreen;
