import {StyleSheet, Picker, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Button, TouchableRipple} from 'react-native-paper';

const Form = ({navigation}) => {
  const [form, setForm] = useState('');

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <View>
            <Picker selectedValue = {form} onValueChange = {(e) => setForm(e)}>
               <Picker.Item label = "Steve" value = "steve" />
               <Picker.Item label = "Ellen" value = "ellen" />
               <Picker.Item label = "Maria" value = "maria" />
            </Picker >
            <Text style = {styles.text}>{form}</Text>
         </View> */}

      <TextInput
        onChangeText={e => setForm(e)}
        value={form}
        placeholder="Full Name"
        style={styles.input}
      />
      <TextInput
        onChangeText={e => setForm(e)}
        value={form}
        placeholder="Bio"
        style={styles.input}
      />
      <TextInput
        onChangeText={e => setForm(e)}
        value={form}
        placeholder="Organisation Number"
        style={styles.input}
        keyboardType="numeric"
      />
      
      <View></View>
      <TouchableRipple
        style={{
          backgroundColor: 'green',
          paddingHorizontal: 50,
          paddingVertical: 15,
          borderRadius: 5,
        
        }}
        onPress={() => navigation.navigate('BottomNav')}
        
        >
        <Text
          style={{color: 'white', fontSize:16}}>
          Next
        </Text>
      </TouchableRipple>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
    fontSize: 16,
  },
});
