import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import database, {firebase} from '@react-native-firebase/database';
import {useGobalContext} from './GlobalContext';
// import { withNavigation } from 'reactnaviga';
import {useNavigation} from '@react-navigation/native';

const ShowUserData = ({}) => {
  const {userIdRef} = useGobalContext();
  const [userData, setUserData] = useState([]);
  const [listdummyData, setListDummyData] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const db = await database();
      db.ref(`/users/${userIdRef.current}/uplaod`)
        .orderByKey()
        .on('value', querySnapshot => {
          const main = [];
          querySnapshot.forEach(child => {
            let key = child.forEach(child => {
              // let data = child.val();

              console.log('= ==> ', child.val());
              main.push({
                key: child.val(),
              });
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

  // const { navigate } = this.props.navigation;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {userData.map((item, index) => {
        // TODO 1: Element_Name, 2: UserName, 3: Image_Of_Product, 4:
        return (
          <View
            key={index}
            style={{
              width: '90%',
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 15,
              marginVertical: 10,
            }}>
            <View style={styles.userName_container}>
              {item.key.elementName ? (
                <Text style={styles.element_Name}>{item.key.elementName}</Text>
              ) : null}

              {item.key.user_Name ? (
                <Text style={styles.userName}>{item.key.user_Name}</Text>
              ) : null}
              {item.key.type ? (
                <Text style={styles.type}>{item.key.type}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              // onPress={()=> navigate('home')}
              style={styles.image_Container}
              onPress={() =>
                navigation.navigate('BuyPage', {
                  ImgUrl: item.key.ImgUrl,
                  elementName: item.key.elementName,
                  discription: item.key.discription,
                  payType: item.key.paytype,
                  user_Name: item.key.user_Name,
                  type: item.key.type,
                })
              }>
              <Image
                style={styles.image_style}
                source={{uri: item.key.ImgUrl}}
              />

              <TouchableOpacity style={styles.btn_Container}>
                <Text style={styles.Go_text_Container}>
                  {' '}
                  {item.key.paytype ? <>{item.key.paytype}</> : 'free'}{' '}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
            {/* <Text style={styles.about_name}>{item.key.discription}</Text> */}
          </View>
        );
      })}
    </View>
  );
};

export default ShowUserData;

const styles = StyleSheet.create({
  hehe: {
    flex: 1,
    // height: '100%',
  },
  main_container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  Inner_main_container: {
    flex: 1,
    width: '90%',
    // height: '100%',
  },
  element_Name: {
    fontSize: 25,
    color: 'black',
    // marginLeft: 10,
    fontWeight: 500,
  },
  // about_name: {
  //   fontSize: 20,
  //   marginVertical: 10,
  //   color: 'black',
  //   // backgroundColor: 'green',
  // },
  // about_bio: {
  //   fontSize: 16,
  //   color: 'black',
  //   marginVertical: 10,
  // },
  userName_container: {
    // backgroundColor:"orange",
    // ,width:'30%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginLeft: 5,
    marginBottom: 5,
    // padding:20,
  },
  userName: {
    color: '#095707',
    fontSize: 8,
    paddingHorizontal: 18,
    paddingVertical: 3,
    borderRadius: 50,
    backgroundColor: '#60FFA87E',
    letterSpacing: 1,
    marginLeft: 10,
  },
  type: {
    color: '#095707',
    fontSize: 11,
    fontWeight: '500',
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderRadius: 50,
    backgroundColor: '#C2FF607E',
    letterSpacing: 1,
    marginLeft: 10,
  },
  image_Container: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image_style: {
    // width: 400,
    // width:"80%",
    height: 250,

    backgroundColor: '#5F5F5F3B',
  },
  btn_Container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  Go_text_Container: {
    backgroundColor: '#F47723',
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,

    color: 'white',
    fontSize: 20,
    fontWeight: 500,
  },
});
