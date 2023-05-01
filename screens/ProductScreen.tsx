import {StyleSheet, Text, View,Image} from 'react-native';
import React from 'react';

const ProductScreen = ({route}) => {
  const Show_Img = route.params.ShowImg;
  const Element_name = route.params.elementName; 
  console.log("Element_name",  Element_name);
  console.log("ProductScreen", route.params.ShowImg);
  return (
    <View>
      <Image style={{height:400}} source={{uri: Show_Img }} />
      <Text style={{color:"blue"}}>{Element_name}</Text>
    </View> 
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
