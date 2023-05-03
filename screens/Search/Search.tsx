import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

import SearchIcon from './SearchIcon';
import database, {firebase} from '@react-native-firebase/database';

const ironImg = require('../assets/Abstract.png');
const SteelBeam = require('../assets/SteelBeam.png');
const CopperBars = require('../assets/CopperBars.png');
const plasticBottle = require('../assets/Oceanpollution.png');
// const plasticBottle = require('../assets/plasticbottlewitharedcap.png');
const Others = require('../assets/Plasticwastesorting.png');
const stackpaper = require('../assets/stackpaper.png');
const woodblock = require('../assets/WoodenBeerKeg.png');

const Search = () => {
  const [searchProduct, setSearchProduct] = useState();
  const [ironData, setIronData] = useState([]);
  const [stealData, setstealData] = useState([]);
  const [copperData, setcopperData] = useState([]);
  const [woodData, setwoodData] = useState([]);
  const [paperData, setpaperData] = useState([]);
  const [plasticData, setplacticData] = useState([]);
  const [otherData, setotherData] = useState([]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const FetchDB = await database().ref(`/users`).orderByKey();
      // FetchDB.keepSynced(true);
      FetchDB.on('value', querySnapshot => {
        const Iron = [];
        const Steel = [];
        const Copper = [];
        const Wood = [];
        const Paper = [];
        const Plastic = [];
        const Other = [];
        querySnapshot.forEach(child => {
          // console.log('Home_child.Key=> ', child.key);
          console.log('Home_child.val=> ', child.val());
          // let keyname = child.key;
          let data = child.val();

          child
            .child('uplaod')
            .child('Iron')
            .forEach(child => {
              var imgURLs = child.val();
              console.log('Iron: ', imgURLs);

              Iron.push({
                data: data,
                imgURLs: imgURLs,
                // data: upload,
                // });
              });
            });
          child
            .child('uplaod')
            .child('Steel')
            .forEach(child => {
              var imgURLs = child.val();
              console.log('Steel: ', imgURLs);

              Steel.push({
                data: data,
                imgURLs: imgURLs,
                // data: upload,
                // });
              });
            });
          child
            .child('uplaod')
            .child('Copper')
            .forEach(child => {
              var imgURLs = child.val();
              console.log('Copper: ', imgURLs);

              Copper.push({
                data: data,
                imgURLs: imgURLs,
                // data: upload,
                // });
              });
            });
          child
            .child('uplaod')
            .child('Wood')
            .forEach(child => {
              var imgURLs = child.val();
              console.log('Wood: ', imgURLs);

              Wood.push({
                data: data,
                imgURLs: imgURLs,
                // data: upload,
                // });
              });
            });
          child
            .child('uplaod')
            .child('Paper')
            .forEach(child => {
              var imgURLs = child.val();
              console.log('Paper: ', imgURLs);

              Paper.push({
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
          child
            .child('uplaod')
            .child('Other')
            .forEach(child => {
              var imgURLs = child.val();
              console.log('Other: ', imgURLs);

              Other.push({
                data: data,
                imgURLs: imgURLs,
                // data: upload,
                // });
              });
            });
        });
        setIronData(Iron);
        setstealData(Steel);
        setcopperData(Copper);
        setwoodData(Wood);
        setpaperData(Paper);
        setplacticData(Plastic);
        setotherData(Other);
        // console.log('val: ', main);
        // console.log('Wood: ', Wood);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          gap: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 0.8,
            borderRadius: 10,
            borderColor: '#1A6575',
            width: '90%',
            // height: 40,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginVertical: 10,
            color: '#1A6575',
            letterSpacing: 2,
            textTransform: 'capitalize',
          }}
          placeholderTextColor="#1A6575"
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
          <SearchIcon title="Iron" Data={ironData} IconIMG={ironImg} />
          <SearchIcon title="Steel" Data={stealData} IconIMG={SteelBeam} />
          <SearchIcon title="Copper" Data={copperData} IconIMG={CopperBars} />
          <SearchIcon title="Wood" Data={woodData} IconIMG={woodblock} />
          <SearchIcon title="Paper" Data={paperData} IconIMG={stackpaper} />
          <SearchIcon
            title="Plastic"
            Data={plasticData}
            IconIMG={plasticBottle}
          />
          <SearchIcon title="Other" Data={otherData} IconIMG={Others} />
          {/* <SearchIcon title="Rubber" Data={}/> */}
        </View>
        <View
          style={{
            width: '90%',
            height: 500,
            backgroundColor: '#BAD7F1BD',
            borderRadius: 10,
            marginTop: 20,
          }}></View>
        {/* <View style={{width: '90%', height: 200, backgroundColor: 'red'}}></View> */}
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({});
