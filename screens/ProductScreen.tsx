import {StyleSheet, Text, View,Image} from 'react-native';
import React from 'react';

const ProductScreen = ({route}) => {
  const Show_Img = route.params.ShowImg; 
  console.log("ProductScreen", route.params.ShowImg);
  return (
    <View>
      <Image style={{height:400}} source={{uri: Show_Img }} />
      <Text>ProductScreen</Text>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
