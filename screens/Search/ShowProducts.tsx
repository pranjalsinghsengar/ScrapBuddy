import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';

const ShowProducts = ({route, navigation}) => {
  const Data = route.params.Data;
  console.log('ShowProducts', route.params.Data);
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {/* {userData} */}
        {Data.map((item, index) => {
          // TODO 1: Element_Name, 2: UserName, 3: Image_Of_Product, 4:
          return (
            <View
              key={index}
              style={{
                width: '48%',
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 15,
                marginVertical: 5,
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
                    user_Name: item.data.user_Name,
                    ImgUrl: item.imgURLs.ImgUrl,
                    elementName: item.imgURLs.elementName,
                    discription: item.imgURLs.discription,
                    type: item.imgURLs.type,
                    payType: item.imgURLs.paytype,
                  })
                }>
                <Image
                  style={styles.image_style}
                  source={{uri: item.imgURLs.ImgUrl}}
                />

                <TouchableOpacity style={styles.btn_Container}>
                  {item.imgURLs.paytype ? (
                    <Text style={styles.Go_text_Container}>
                      {item.imgURLs.paytype}
                    </Text>
                  ) : (
                    <Text style={styles.Free_text_Container}>Free</Text>
                  )}
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

export default ShowProducts;

const styles = StyleSheet.create({
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
    alignItems: 'center',
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
    backgroundColor: '#ACD5FA',
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,

    color: 'white',
    fontSize: 20,
    fontWeight: 500,
  },
  Free_text_Container: {
    backgroundColor: '#EB9371',
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,

    color: 'white',
    fontSize: 20,
    fontWeight: 500,
  },
});
