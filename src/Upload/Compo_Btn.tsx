import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export const UploadImageBtn = ({onPressData, btn_Text, ...rest})=>{
return(
  <View>
      <TouchableOpacity style={styles.upload_addBtn} onPress={onPressData}>
        <Text style={styles.addBtn_text}>{btn_Text}</Text>
      </TouchableOpacity>
    </View>
)
}
export const UnSubmitUploadImageBtn = ({onPressData, btn_Text, ...rest})=>{
  return(
    <View>
        <TouchableOpacity style={styles.UnSubmitupload_addBtn} onPress={onPressData}>
          <Text style={styles.UnSubmitaddBtn_text}>{btn_Text}</Text>
        </TouchableOpacity>
      </View>
  )
  }

const PickImageBtn = ({onPressData, btn_Text, ...rest}) => {
  return (
    <View>
      <TouchableOpacity style={styles.addBtn} onPress={onPressData}>
        <Text style={styles.addBtn_text}>{btn_Text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PickImageBtn;

const styles = StyleSheet.create({
  addBtn: {
    // fontSize: 80,
    // backgroundColor: 'blue',
    paddingHorizontal:30,
    paddingVertical:10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor:"orange",
  },
  
  addBtn_text: {
    fontSize: 20,
    // ,backgroundColor:"green"
    color:"#144301E2"
  },
  upload_addBtn:{
    paddingHorizontal:30,
    paddingVertical:10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor:"#9EEF7EE2",
  },
  UnSubmitaddBtn_text:{
    fontSize: 20,
    color:"white"
  }
  
  ,UnSubmitupload_addBtn:{
    paddingHorizontal:30,
    paddingVertical:10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor:"#F25B5B",
  }
});
