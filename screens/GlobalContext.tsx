import {StyleSheet, Text, View} from 'react-native';
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useReducer,
} from 'react';
import database, {firebase} from '@react-native-firebase/database';

const Context = React.createContext();

// const intialState= {
//     userId: ""
//     setUsr
// }

const ContextProvider = ({children}) => {
  const [userId, setUserId] = useState(null);
  const userIdRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const profileDataRef = useRef(null);
  // const [uploadedUrl, setUploadedUrl] = useState(null);
  // const uploadedUrlRef = useRef(null);

  // const [state, dispatch] = useReducer(reducer, intialState)
  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  useEffect(() => {
    profileDataRef.current = profileData;
  }, [profileData]);

  // useEffect(() => {
  //   FetchData();
  // }, []);

  // const FetchData = async () => {
  // try {
  //   await database()
  //     .ref(`/users/${userIdRef.current}/uplaod`)
  //     .on('value', snapshot => {
  //       var main = [];
  //       snapshot.forEach(child => {
  //         console.log(child.val());
  //         main.push({
  //           key: child.val(),
  //         });
  //       });
  // const data = snapshot.val();
  // const newData = Object.keys(data).map(key => ({
  //   id: key,
  //   ...data[key],
  // }));
  // console.log('User data: ', snapshot.val());
  //   console.log('newData: ', main);
  //   console.log('global: ', userIdRef.current);
  //   setUserData(main);
  // });

  // const data = await database()
  //   .ref(`/users/${userIdRef.current}/uplaod`)
  //   .once('value');
  // setUserData(data.val());
  // console.log(data);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const profile = await database()
  //     .ref(`users/${userIdRef.current}`)
  //     .once('value');

  //   setProfileData(profile);
  //   console.log('global_profile: ', profile);
  //   console.log('userIdRef: ', userIdRef.current);
  //   console.log('useID: ', userId);
  // } catch (e) {
  //   console.log(e);
  // }

  // };

  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        userIdRef,
        setUserData,
        userData,
      }}>
      {children}
    </Context.Provider>
  );
};

const useGobalContext = () => {
  return useContext(Context);
};
export {Context, ContextProvider, useGobalContext};
