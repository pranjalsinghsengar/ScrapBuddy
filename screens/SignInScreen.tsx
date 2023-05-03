import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
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
  const {userIdRef, ScrapBuddyLOGO} = useGobalContext();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const navigation = useNavigation();

  useEffect(() => {
    FetchData();
  }, []);

  // useEffect(() => {
  //   Navi();
  // },[]);

  const Navi = async () => {
    await setTimeout(() => {
      // Alert.alert('I am appearing...', 'After 5 seconds!');
      navigation.navigate('BottomNav');
      setLoading(false);
    }, 700);
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
        setLoading(true);
        Navi();

        await auth().signInWithEmailAndPassword(email, password);
        // navigation.navigate(userData ? 'BottomNav' : 'ConfirmNewUser');

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
      <View
        style={{
          marginBottom: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '20%',
            aspectRatio: 2 / 2.5,
            // height: '30%',
            marginRight: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={ScrapBuddyLOGO}
          />
        </View>
        <Text style={{color: '#1A6575', fontSize: 30}}>ScrapBuddy</Text>
      </View>

      <View style={styles.SignIn_container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#C6C6C68D"
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholderTextColor="#C6C6C68D"
          style={styles.input}
          placeholder="Password"
          keyboardAppearance="default"
          keyboardType="decimal-pad"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    backgroundColor: '#BAD7DF',
  },
  SignIn_container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1A6575',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    fontSize: 16,
    color: '#86B6C3',
  },
  button: {
    width: '100%',
    backgroundColor: '#1A6575',
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
