import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';


const SearchIcon = ({title, IconIMG}) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ShowProducts')}>
      <Image
        source={{uri: IconIMG}}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
          borderRadius: 60,
        }}
      />
      <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 20}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}; 

export default SearchIcon;

const styles = StyleSheet.create({});
