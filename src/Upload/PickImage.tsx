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
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState, useRef, useEffect} from 'react';
import storage from '@react-native-firebase/storage';
import PickImageBtn, {
  UnSubmitUploadImageBtn,
  UploadImageBtn,
} from './Compo_Btn';
import MenuBar from './MenuBar';
import {useGobalContext} from '../../screens/GlobalContext';
import database, {firebase} from '@react-native-firebase/database';

import DropDownPicker from 'react-native-dropdown-picker';

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
  const [elementName, setElementName] = useState('');

  const [open, setOpen] = useState(false);
  const [selectvalue, setSelectvalue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

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
        .ref(`/users/${userIdRef.current}/uplaod/${selectvalue}`)
        .push({
          ImgUrl: uploadedUrlRef.current,
          elementName: elementName,
          discription: discription,
        })
        .then(() => {
          console.log('UserID: ' + userIdRef.current);
          console.log('uploadedUrlRef>current: ' + uploadedUrlRef.current);
          console.log('Done');
          setElementName('');
          setDiscription('');
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
            <View style={{height: IMG_height, position: 'relative'}}>
              <Image style={styles.Img} source={{uri: image}} />
              {selectvalue ? (
                <Text style={styles.ShowText}>{selectvalue}</Text>
              ) : null}
            </View>

            <View style={styles.form_Container}>
              {selectvalue ? (
                <ScrollView>
                  <View style={{marginTop: 20}}>
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
                        // marginTop: 30,
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
                      numberOfLines={3}
                      style={{
                        width: 300,
                        // height: 200,

                        fontSize: 20,
                        // fontWeight: '500',
                        // marginTop: 30,
                        // lineHeight: 1,
                      }}
                    />
                  </View>
                </ScrollView>
              ) : (
                <View style={{width: 200}}>
                  <DropDownPicker
                    open={open}
                    value={selectvalue}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectvalue}
                    setItems={setItems}
                    style={{borderColor: 'transparent'}}
                    translation={{
                      PLACEHOLDER: 'Select Category',
                    }}
                    dropDownContainerStyle={{
                      // backgroundColor: "#D30505"
                      // ,width:"80%"
                      borderColor: 'transparent',
                    }}
                    placeholderStyle={{
                      color: 'grey',
                      fontWeight: 'bold',
                      padding: 0,
                      // width:100
                    }}
                  />
                </View>
              )}
            </View>
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
        {selectvalue ? (
          uploading ? (
            <>
              <Text>{transferred} % Completed </Text>

              <ActivityIndicator size="large" color="#000000" />
            </>
          ) : (
            <UploadImageBtn onPressData={SubmitPost} btn_Text={'Upload'} />
          )
        ) : (
          <UnSubmitUploadImageBtn btn_Text={'Upload'} />
        )}
      </View>
    </View>
  );
};

export default PickImage;
const IMG_Width = 300;
const IMG_height = 250;
const ShowTextLocation_W = IMG_Width / 4;
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

    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: 300,
  },
  Img: {
    width: 300,
    height: 250,
    borderRadius: 20,
  },
  ShowText: {
    fontSize: 30,
    marginTop: 10,
    color: '#288D01',
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 1,
    borderRadius: 50,
    left: ShowTextLocation_W,
    bottom: 0,
    transform: [{translateX: 0}, {translateY: 20}],
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
  form_Container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
