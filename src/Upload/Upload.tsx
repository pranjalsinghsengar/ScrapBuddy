import {StyleSheet, View} from 'react-native';
import React from 'react';
import PickImage from './PickImage';

const Upload = () => {
  return (
    <View style={styles.Upload_Container}>
      <PickImage />
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
  Upload_Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"green",
  },
});
