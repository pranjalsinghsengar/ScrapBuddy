import React from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';

const FormInput = ({lableValue, placeHolderText, iconType, ...rest}) => {
  return (
    <View style={styles.formContainer}>
      <View style={styles.iconStyle}>
        {/* <ABCD name={iconType} size={25} color="" */}
      </View>
      <TextInput
        value={lableValue}
        numberOfLines={1}
        placeholder={placeHolderText}
        {...rest}
        style={styles.inputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '90%',
    height: 60,
    borderWidth: 1,
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    // alignItems:'center',
  },
  inputText: {
    marginLeft: 15,
    letterSpacing: 1.5,
  },
});

export default FormInput;
