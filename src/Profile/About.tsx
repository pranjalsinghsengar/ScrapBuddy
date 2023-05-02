import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {ContextInfo} from '../../screens/SignUpScreen';
import {useGobalContext} from '../../screens/GlobalContext';
import database, {firebase} from '@react-native-firebase/database';
import DummyData from '../../screens/DummyData';
import ImagePicker from 'react-native-image-crop-picker';

// const AboutProfile = ({user_Name, user_Bio, user_Phone}) => {
//   return (
//     <View style={{left: 10, backgroundColor:"red",height:"100%"}}>
//       <Text style={styles.about_name}>{usename}</Text>

//       <Text style={styles.about_bio}>Bio: {user_Bio}</Text>
//       <Text style={styles.about_bio}>Phone No. : {user_Phone}</Text>
//     </View>
//   );
// };

const About = ({navigation}) => {
  // const {userIdRef} = route.params;
  const {userIdRef, profileDataRef, setProfileData} = useGobalContext();
  const [listdummyData, setListDummyData] = useState(null);
  const [profile_Img, setProfile_Img] = useState(null);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const data = await database()
        .ref(`users/${userIdRef.current}`)
        .once('value');
      setListDummyData(data.val());
      console.log(data);
      // console.log(listdummyData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.about_container}>
      <View style={styles.about_innerContainer}>
        {/* Image */}
        <View style={styles.about_Image}></View>
        {/* Profile */}
        <TouchableOpacity style={styles.about_profile_Pic}>
          <Image source={{uri: profile_Img}} />
        </TouchableOpacity>
      </View>
      {/* {profileData.map((item, index) => {
        return (
          <View key={index}>
            <Image
              style={{width: 400, height: 400}}
              source={{uri: item.ImgUrl}}
            />
            <Text>{item.discription}</Text>
            <Text>{item.user_Name}</Text>
          </View>
        );
      })} */}

      <View style={{left: 10}}>
        <Text style={styles.about_name}>
          name : {listdummyData ? listdummyData.user_Name : 'Backend error'}
        </Text>
        <Text style={styles.about_bio}>
          Bio: {listdummyData ? listdummyData.user_Bio : 'Backend error'}
        </Text>
        <Text style={styles.about_bio}>
          Phone No. :{' '}
          {listdummyData ? listdummyData.user_Phone : 'Backend error'}
        </Text>
      </View>

      {/* <FlatList
        style={{flex: 1}}
        data={listdummyData}
        renderItem={({item}) => (
          <AboutProfile
            user_Name={item.user_Name}
            user_Bio={item.user_Bio}
            user_Phone={item.user_Phone}
          />
        )}
      /> */}

      {/* {profileData.map((item, index) => {
        return (
         
        );
      })} */}
    </View>
  );
};

export default About;
const h = 150;
const top = h - 50;
const styles = StyleSheet.create({
  about_container: {
    // height:'50%',
    flex: 1,
    // backgroundColor:"red",
    // justifyC
    // backgroundColor:"blue"
  },
  about_innerContainer: {
    position: 'relative',
    height: h + 50,
    color: 'black',
  },
  about_Image: {
    height: h,
    color: 'black',
    backgroundColor: 'grey',
  },
  about_profile_Pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
    position: 'absolute',
    top: top,
    left: 20,
  },
  about_name: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black',

    // backgroundColor: 'green',
  },
  about_bio: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black',
  },
});
