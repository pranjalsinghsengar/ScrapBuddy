import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
// import Height from "./FormDimention"
const FormButton = ({buttonTitle, ...rest}) => {
  // const Height = 60;
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    height: 60,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormButton;
