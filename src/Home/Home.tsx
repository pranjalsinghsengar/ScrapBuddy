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
  useWindowDimensions,
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
  const [ratio, setRatio] = useState(1);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
        // console.log('=>>>>>>>>>>: ', main.data.user_Bio);
        console.log('Home_global: ', userIdRef.current);
        main.map((item, index) => {
          setImgdimension(item.imgURLs.ImgUrl);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const width = useWindowDimensions().width;
  const numColumns = Math.ceil(width / 350);

  const [imgdimension, setImgdimension] = useState();

  console.log('=>>>>>>>>>>> ', imgdimension);
  useEffect(() => {
    if (imgdimension) {
      Image.getSize(imgdimension, (width, height) => setRatio(width / height));
    }
  }, [imgdimension]);

  // console.log('Home_newData: ', userData);
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          paddingVertical: 5,
          position: 'relative',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            padding: 15,
            fontWeight: '500',
            letterSpacing: 1,
          }}>
          Scrap Buddy
        </Text>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: '#ffffff',
            fontSize: 25,
            position: 'absolute',
            bottom: 0,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            zIndex: 4,
          }}></View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderTopRightRadius: 50,

            // flexWrap: 'wrap',
          }}>
          {Array.from(Array(numColumns)).map((_, colIndex) => (
            <View style={{flex: 1}} key={colIndex}>
              {userData
                .filter((_, index) => index % numColumns === colIndex)
                .map((item, index) => {
                  // TODO 1: Element_Name, 2: UserName, 3: Image_Of_Product, 4:
                  return (
                    <View
                      key={index}
                      style={{
                        width: '98%',
                        // aspectRatio: ratio,
                        backgroundColor: 'white',
                        padding: 10,
                        borderRadius: 10,
                        // borderColor: '#1A6575',
                        // borderWidth: 1,
                        marginVertical: 5,
                      }}>
                      <View style={styles.userName_container}>
                        {item.imgURLs.elementName ? (
                          <Text style={styles.element_Name}>
                            {item.imgURLs.elementName}
                          </Text>
                        ) : null}
                        {item.data.user_Name ? (
                          <Text style={styles.userName}>
                            {item.data.user_Name}
                          </Text>
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
                            ImgUrl: item.imgURLs.ImgUrl,
                            elementName: item.imgURLs.elementName,
                            discription: item.imgURLs.discription,
                            payType: item.imgURLs.paytype,
                            user_Name: item.data.user_Name,
                            userUID: item.data.uid,
                            user_Phone: item.data.user_Phone,
                            type: item.imgURLs.type,
                          })
                        }>
                        <Image
                          style={[styles.image_style, {aspectRatio: ratio}]}
                          source={{uri: item.imgURLs.ImgUrl}}
                        />

                        <TouchableOpacity style={styles.btn_Container}>
                          <Text style={styles.Go_text_Container}>
                            {' '}
                            {item.imgURLs.paytype ? (
                              <>{item.imgURLs.paytype}</>
                            ) : (
                              'free'
                            )}{' '}
                          </Text>
                        </TouchableOpacity>
                      </TouchableOpacity>
                      {/* <Text style={styles.about_name}>{item.key.discription}</Text> */}
                    </View>
                  );
                })}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  hehe: {
    flex: 1,
    // height: '100%',
  },
  main_container: {
    backgroundColor: '#BAD7F1',
    // flex: 1,
    // width: '100%',
    height: 50,
    // display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // gap: 10,
    alignItems: 'center',
  },
  Inner_main_container: {
    fontSize: 30,

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
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
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
    width: '100%',
    // height: 250,

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
    backgroundColor: '#1A6575',
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,

    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});
export default Home;
