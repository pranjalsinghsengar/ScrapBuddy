import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Text style={styles.title}>Welcome to MyApp</Text>
        <Text style={styles.subtitle}>
          MyApp is the best way to stay organized and productive.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  innercontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'orange',
    fontSize: 16,
  },
});

export default WelcomeScreen;
