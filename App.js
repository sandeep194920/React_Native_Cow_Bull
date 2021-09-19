import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { AppContext, AppProvider, useGlobal } from './context'
import SelectionScreen from './screens/SelectionScreen';
import GameScreen from './screens/GameScreen';

let theme;
export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });


  return (
    <View style={styles.container}>
      <AppProvider>
        {/* <HomeScreen /> */}
        {/* <SelectionScreen /> */}
        <GameScreen />
      </AppProvider>
    </View >
  );
}


export { theme }