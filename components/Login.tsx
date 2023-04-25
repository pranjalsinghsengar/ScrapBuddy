import {Alert, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import FormInput from './LoginComponents/FormInput';
import FormButton from './LoginComponents/FormButton';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  return (
    <View>
        <FormInput 
        lableValue={email}
        onChangeText={(userEmail)=> setEmail(userEmail)}
        placeHolderText="Email"
        iconType='user'
        autoCapitalize="none"
        autoCorrect={false}
        />
        <FormInput 
        lableValue={password}
        onChangeText={(userPassword)=> setPassword(userPassword)}
        placeHolderText="Password"
        iconType='Password'
        secureTextEntry={true}
        />
        <FormButton
        buttonTitle="sign-in"
        onPress={()=> alert('Sign-inClicked')}
        />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
