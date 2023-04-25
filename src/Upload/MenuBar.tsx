import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import PickImageBtn from './Compo_Btn';
import PickImage from './PickImage';

const MenuBar = () => {
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);


 
  return (
    <View style={styles.MenuContainer}>

      {uploading ? (
        <>
          <Text>{transferred} % Completed </Text>

          <ActivityIndicator size="large" color="#000000" />
        </>
      ) : (
        <PickImageBtn onPressData={Menu_Handler} btn_Text={'Upload'} />
      )}
    </View>
  );
};

export default MenuBar;

const styles = StyleSheet.create({
  MenuContainer: {
    // position: 'absolute',
    // right: 0,
    // height:'100%',
    // top: 650,
  },
});
