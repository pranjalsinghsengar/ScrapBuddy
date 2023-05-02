import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useGobalContext} from './GlobalContext';

const WelcomeScreen = ({navigation}) => {
  const {ScrapBuddyLOGO} = useGobalContext();
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <View style={{width: 100, aspectRatio: 2 / 2.5}}>
          <Image
            source={ScrapBuddyLOGO}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <Text style={styles.title}>Welcome to Scrap Buddy</Text>
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
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    color: '#99DDCC',
    backgroundColor: '#BAD7DF',
  },
  innercontainer: {
    flexDirection: 'column',
    gap: 12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212A3E',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#394867',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
  },
  buttonText: {
    color: '#212A3E',
    fontSize: 16,
  },
});

export default WelcomeScreen;
