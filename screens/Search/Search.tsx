import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';

import SearchIcon from './SearchIcon';
import database, {firebase} from '@react-native-firebase/database';

const DummyImage = `'../assets/Frame.png'`;
const Search = () => {
  const [searchProduct, setSearchProduct] = useState();
  const [userWoodData, setUserData] = useState([]);
  const [PlasticData, setplacticData] = useState([]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const FetchDB = await database().ref(`/users`).orderByKey();
      // FetchDB.keepSynced(true);
      FetchDB.on('value', querySnapshot => {
        const Wood = [];
        const Plastic = [];
        querySnapshot.forEach(child => {
          // console.log('Home_child.Key=> ', child.key);
          console.log('Home_child.val=> ', child.val());
          // let keyname = child.key;

          let data = child.val();

          child
            .child('uplaod')
            .child('Wood')
            .forEach(child => {
              var imgURLs = child.val();
              console.log('WoodData: ', imgURLs);

              Wood.push({
                data: data,
                imgURLs: imgURLs,
                // data: upload,
                // });
              });
            });
            child
            .child('uplaod')
            .child('Plastic')
            .forEach(child => {
              var imgURLs = child.val();
              console.log('PlasticData: ', imgURLs);

              Plastic.push({
                data: data,
                imgURLs: imgURLs,
                // data: upload,
                // });
              });
            });
        });
        setUserData(Wood);
        setplacticData(Plastic);
        // console.log('val: ', main);
        console.log('Wood: ', Wood);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{flex: 1, alignItems: 'center', flexDirection: 'column', gap: 10}}>
      <TextInput
        style={{
          borderWidth: 0.8,
          borderRadius: 50,
          borderColor: 'orange',
          width: '90%',
          height: 40,
          paddingHorizontal: 20,
          paddingVertical: 0,
          marginVertical: 10,
          color: '#F77300',
          letterSpacing: 2,
          textTransform: 'capitalize',
        }}
        placeholderTextColor="orange"
        placeholder="Search"
        value={searchProduct}
        onChangeText={text => setSearchProduct(text)}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          width: '90%',
          gap: 10,
        }}>
        <SearchIcon
          title="Wood"
          IconIMG={DummyImage}
          Data={userWoodData}
        />
        {/* <SearchIcon title="Cotton"  />
        <SearchIcon title="Silk" /> */}
        <SearchIcon title="Plastic" Data={PlasticData} />
        {/* <SearchIcon title="Cloth" />
        <SearchIcon title="Rubber" /> */}
      </View>
      <View
        style={{
          width: '90%',
          height: 200,
          backgroundColor: 'red',
          borderRadius: 10,
        }}></View>
      {/* <View style={{width: '90%', height: 200, backgroundColor: 'red'}}></View> */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
