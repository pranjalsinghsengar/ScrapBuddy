import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ShowOrderDetails = ({route}) => {
  const user_Phone = route.params.user_Phone;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          backgroundColor: 'green',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          Contact:
        </Text>
        <Text
          style={{
            color: 'white',
          }}>
          {user_Phone}
        </Text>
      </View>
    </View>
  );
};

export default ShowOrderDetails;

const styles = StyleSheet.create({});
