import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNav from './BottomNav';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import Form from './screens/Form';
import auth from '@react-native-firebase/auth';
import DummyData from './screens/DummyData';
import About from './src/Profile/About';
import {ContextProvider} from './screens/GlobalContext';
import PickImage from './src/Upload/PickImage';
import ShowUserData from './screens/ShowUserData';
import Profile from './src/Profile/Profile';
import Search from './screens/Search/Search';
import ProductScreen from './screens/ProductScreen';
import ShowProducts from './screens/Search/ShowProducts';
import SearchIcon from './screens/Search/SearchIcon';
import ConfirmNewUser from './screens/ConfirmNewUser';
import BuyPage from './src/NewuserDisplay/BuyPage';
const Stack = createNativeStackNavigator();

const App = () => {
  // constructor(props){
  //   super(props)
  //   this.state= {

  //   }
  // }
  // const  = useContext(AuthContext);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // const [userId, setUserId] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // ============================================================================================

  // ============================================================================================

  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="WelcomeScreen">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="BottomNav" component={BottomNav} />
          <Stack.Screen name="ConfirmNewUser" component={ConfirmNewUser} />

          {/* Profile */}

          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="About" component={About} />
          </Stack.Group>
          {/* User DATA */}
          <Stack.Group>
            <Stack.Screen name="ShowUserData" component={ShowUserData} />
            <Stack.Screen name="BuyPage" component={BuyPage} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
          </Stack.Group>
          {/* upload */}
          <Stack.Group>
            <Stack.Screen name="PickImage" component={PickImage} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SearchIcon" component={SearchIcon} />
            <Stack.Screen name="ShowProducts" component={ShowProducts} />
          </Stack.Group>
          {/* Login Screeen\
           */}
          <Stack.Group>
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </Stack.Group>

          {/* <Stack.Screen name="DummyData" component={DummyData} /> */}
          <Stack.Screen name="Form" component={Form} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    // marginTop: 32,
    // paddingHorizontal: 24,
    // backgroundColor: 'red',
  },
});

export default App;
