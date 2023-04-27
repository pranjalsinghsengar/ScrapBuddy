import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import database, {firebase} from '@react-native-firebase/database';
import {useGobalContext} from './GlobalContext';

const ShowUserData = () => {
  const {userIdRef} = useGobalContext();
  const [userData, setUserData] = useState([]);
  const [listdummyData, setListDummyData] = useState(null);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      await database()
        .ref(`/users/${userIdRef.current}/uplaod`)
        .on('value', snapshot => {
          const main = [];
          snapshot.forEach(child => {
            console.log(child.val());
            main.push({
              key: child.val(),
            });
          });
          console.log('newData: ', main);
          console.log('global: ', userIdRef.current);
          setUserData(main);
        });
    } catch (e) {
      console.log(e);
    }
    try {
      const data = await database()
        .ref(`users/${userIdRef.current}`)
        .once('value');
      setListDummyData(data.val());
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1}}>
      {userData.map((item, index) => {
        return (
          <View key={index} style={{flex: 1,}}>
            <Text style={styles.about_name}>
            {listdummyData ? listdummyData.user_Name : 's'}
            </Text>
            <Image
              style={{width: 400, height: 400, backgroundColor: 'red'}}
              source={{uri: item.key.ImgUrl}}
            />
            <Text style={styles.about_name}>{item.key.elementName}</Text>
            <Text style={styles.about_name}>{item.key.discription}</Text>
            <Text style={styles.about_name}>{item.key.user_Name}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ShowUserData;

const styles = StyleSheet.create({
  about_name: {
    fontSize: 20,
    marginVertical: 10,
color:"black",
    // backgroundColor: 'green',
  },
  about_bio: {
    fontSize: 16,
color:"black",
marginVertical: 10,
  },
});
