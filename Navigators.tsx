import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from './BottomNav'
import screen from './screens/screen'
import Screen2 from './screens/Screen2'

const Navigators = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="s" component={screen} />
      <Stack.Screen name="sa" component={Screen2} />
      
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Navigators

const styles = StyleSheet.create({})