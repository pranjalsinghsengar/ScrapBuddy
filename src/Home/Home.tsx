import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useGobalContext} from '../../screens/GlobalContext';
import ShowUserData from '../../screens/ShowUserData';
// import Header from '../../components/Home/Header';
import database, {firebase} from '@react-native-firebase/database';

// import SplashScreen from './SplashScreen';

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const {userIdRef} = useGobalContext();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const FetchDB = await database().ref(`/users`).orderByKey();
      // FetchDB.keepSynced(true);
      FetchDB.on('value', querySnapshot => {
        const main = [];
        querySnapshot.forEach(child => {
          // console.log('Home_child.Key=> ', child.key);
          console.log('Home_child.val=> ', child.val());
          // let keyname = child.key;

          let data = child.val();
          var key = child.child('uplaod').forEach(Snapshot => {
            Snapshot.forEach(child => {
              var imgURLs = child.val();
              console.log('imgURLs: ', imgURLs);

              main.push({
                data: data,
                imgURLs: imgURLs,
                // data: upload,
                // });
              });
            });
          });
          // var key = child
          //   .child('uplaod')
          //   .child('apple')
          //   .forEach(child => {
          //     var imgURLs = child.val();
          //     console.log('Banana: ', imgURLs);

          //     main.push({
          //       data: data,
          //       imgURLs: imgURLs,
          //       // data: upload,
          //       // });
          //     });
          //   });
          // console.log('key: ', key);

          // let uploadData = child.child('upload')

          // let upload = child.child("uplaod").forEach(child => {
          // let lt = child.val();
        });
        setUserData(main);
        // console.log('val: ', main);
        console.log('Home_newData: ', main);
        console.log('Home_global: ', userIdRef.current);
      });
    } catch (e) {
      console.log(e);
    }
  };
  // console.log('Home_newData: ', userData);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{flex: 1}}>
        <View style={styles.hehe}>
          <View style={styles.main_container}>
            <Text style={{color: 'black'}}>Home</Text>
          </View>
        </View>
      </View>
      {/* <ShowUserData /> */}
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
                {item.imgURLs.elementName ? (
                  <Text style={styles.element_Name}>
                    {item.imgURLs.elementName}
                  </Text>
                ) : null}

                {item.data.user_Name ? (
                  <Text style={styles.userName}>{item.data.user_Name}</Text>
                ) : null}
                {item.imgURLs.type ? (
                  <Text style={styles.type}>{item.imgURLs.type}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                // onPress={()=> navigate('home')}
                style={styles.image_Container}
                onPress={() =>
                  navigation.navigate('BuyPage', {
                    Show_Img: item.imgURLs.ImgUrl,
                    elementName: item.imgURLs.elementName,
                    discription: item.imgURLs.discription,
                  })
                }>
                <Image
                  style={styles.image_style}
                  source={{uri: item.imgURLs.ImgUrl}}
                />

                <TouchableOpacity style={styles.btn_Container}>
                  <Text style={styles.Go_text_Container}> Go </Text>
                </TouchableOpacity>
              </TouchableOpacity>
              {/* <Text style={styles.about_name}>{item.key.discription}</Text> */}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

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
    color: '#0B490A',
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
export default Home;
