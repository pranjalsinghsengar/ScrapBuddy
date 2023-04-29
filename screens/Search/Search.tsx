import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import SearchIcon from './SearchIcon';

const DummyImage = `'../assets/Frame.png'`;
const Search = () => {
  const [searchProduct, setSearchProduct] = useState();
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
        <SearchIcon title="Wood" IconIMG={DummyImage} />
        <SearchIcon title="Cotton" />
        <SearchIcon title="Silk" />
        <SearchIcon title="Plastic" />
        <SearchIcon title="Cloth" />
        <SearchIcon title="Rubber" />
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
