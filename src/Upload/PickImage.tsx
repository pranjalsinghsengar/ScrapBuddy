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
import React, {useState, useRef, useEffect} from 'react';
import storage from '@react-native-firebase/storage';
import PickImageBtn, {UploadImageBtn} from './Compo_Btn';
import MenuBar from './MenuBar';
import {useGobalContext} from '../../screens/GlobalContext';
import database, {firebase} from '@react-native-firebase/database';

// import { TextInput } from 'react-native-paper';
// import ImagePicker, {
//   launchCamera,
//   launchImageLibrary,
// } from 'react-native-image-picker';
// import firebase from "./Config";
// import storage from './Config';

const PickImage = () => {
  const {userIdRef} = useGobalContext();
  const [discription, setDiscription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const uploadedUrlRef = useRef(null);
  const[elementName, setElementName] =useState("")

  useEffect(() => {
    uploadedUrlRef.current = uploadedUrl;
  }, [uploadedUrl]);

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
  // Submit Post
  const SubmitPost = async () => {
    const ImageUrl = await uploadImage();

    setUploadedUrl(ImageUrl);
    // setUril(ImageUrl)
    console.log('imageUrl: ', ImageUrl);
    // Uplaod DATA
    await setTimeout(() => {}, 1000);
    await SendData();
  };
  const SendData = async () => {
    try {
      await database()
        .ref(`/users/${userIdRef.current}/uplaod`)
        .push({
          ImgUrl: uploadedUrlRef.current,
          elementName : elementName,
          discription: discription,
        })
        .then(() => {
          console.log('UserID: ' + userIdRef.current);
          console.log('uploadedUrlRef>current: ' + uploadedUrlRef.current);
          console.log('Done');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImage = async () => {
    const uploadUri = image;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // const extension = fileName.split(".").pop();
    // const name = fileName.split(".").slice(0,-1).join(".");
    // fileName = name + Date.now() + '.' + extension;

    setUploading(true);

    const StorageRef = storage().ref(`profile/${fileName}`);
    const task = StorageRef.putFile(uploadUri);
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
      const url = await StorageRef.getDownloadURL();

      setUploading(false);
      Alert.alert('Image Uploaded Successfully');
      setImage(null);
      return url;
    } catch (e) {
      console.log(e);
      // return null;
    }
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
              placeholder="Element Name"
              placeholderTextColor="black"
              onChangeText={e => setElementName(e)}
              value={elementName}
              // scrollEnabled= 'true'
              style={{
                width: 300,
                // height: 200,

                fontSize: 24,
                fontWeight: '500',
                marginTop: 30,
              }}
              />
            <TextInput
              editable
              multiline
              placeholder="Discription"
              placeholderTextColor="black"
              onChangeText={e => setDiscription(e)}
              value={discription}
              // scrollEnabled= 'true'
              numberOfLines={6}
              style={{
                width: 300,
                // height: 200,

                fontSize: 20,
                // fontWeight: '500',
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
          <UploadImageBtn onPressData={SubmitPost} btn_Text={'Upload'} />
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
