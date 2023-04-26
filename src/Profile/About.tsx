import {StyleSheet, Text, View} from 'react-native';
import React,{useState} from 'react';



const About = ({route,navigation}) => {
  const {userIdRef} = route.params;
  const [listdummyData, setListDummyData] = useState(null);


  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const data = await database().ref(`users/${userIdRef}`).once('value');
      setListDummyData(data.val());
      console.log(data);
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
        <View style={styles.about_profile_Pic}></View>
      </View>

      <View style={{left:10}}>
        <Text style={styles.about_name}>{listdummyData.user_Name} </Text>
        <Text style={styles.about_bio}>Bio</Text>

      </View>
    </View>
  );
};

export default About;
const h = 150;
const top = h - 50;
const styles = StyleSheet.create({
  about_container: {
    flex: 1,
    // justifyC
    // backgroundColor:"blue"
  },
  about_innerContainer: {
    position: 'relative',
    height: h + 50,
  },
  about_Image: {
    height: h,
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
    marginVertical:10,
    
    // backgroundColor: 'green',
},
about_bio:{
    fontSize: 16,
    marginVertical:10,
    
  }
});
