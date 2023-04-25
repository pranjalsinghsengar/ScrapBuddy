import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState} from 'react';
import storage from '@react-native-firebase/storage';
import PickImageBtn, {UploadImageBtn} from './Compo_Btn';
import MenuBar from './MenuBar';
// import { TextInput } from 'react-native-paper';
// import ImagePicker, {
//   launchCamera,
//   launchImageLibrary,
// } from 'react-native-image-picker';
// import firebase from "./Config";
// import storage from './Config';

const PickImage = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const ChoosePhotoFromLybrary = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadImage = async () => {
    const uploadUri = image;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);

    const task = storage().ref(fileName).putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
        ),
      );
    });
    try {
      await task;
      setUploading(false);
      Alert.alert('Image Uploaded Successfully');
    } catch (e) {
      console.log(e);
    }

    setImage(null);
  };

  return (
    <View style={styles.PickImage_Container}>
      <View style={styles.showImage}>
        {image !== null ? (
          <>
            <Image style={styles.Img} source={{uri: image}} />
            <TextInput
              editable
              multiline
              placeholder="Discription"
              // scrollEnabled= 'true'
              numberOfLines={6}
              style={{
                width: 300,
                // height: 200,
                
                fontSize: 20,
                fontWeight: '500',
                marginTop: 30,
                lineHeight: 1,
              }}
            />
          </>
        ) : null}
      </View>

      <View style={styles.uploadImage}>
        <View style={styles.PickImage_btn}>
          <PickImageBtn onPressData={takePhotoFromCamera} btn_Text={'Camera'} />
          <PickImageBtn
            onPressData={ChoosePhotoFromLybrary}
            btn_Text={'Drive'}
          />
        </View>
        {uploading ? (
          <>
            <Text>{transferred} % Completed </Text>

            <ActivityIndicator size="large" color="#000000" />
          </>
        ) : (
          <UploadImageBtn onPressData={uploadImage} btn_Text={'Upload'} />
        )}
      </View>
    </View>
  );
};

export default PickImage;
const styles = StyleSheet.create({
  PickImage_Container: {
    flex: 1,
    // backgroundColor: 'green',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  showImage: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  Img: {
    width: 350,
    height: 300,
    borderRadius: 20,
  },
  uploadImage: {
    flex: 1 / 10,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 4,
    marginBottom: 10,
  },
  PickImage_btn: {
    display: 'flex',
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 50,
    // backgroundColor:"red"
  },
  // addBtn: {
  //   // fontSize: 80,
  //   backgroundColor: 'red',
  //   width: 100,
  //   height: 100,
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 50,
  //   overflow: 'hidden',
  // },
  // addBtn_text: {
  //   fontSize: 50,
  //   // ,backgroundColor:"green"
  // },
});
