import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { Colors } from './Utils/Colors';
import { AppContext, AppProvider } from './context'
import SelectionScreen from './screens/SelectionScreen';

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
        <SelectionScreen />
      </AppProvider>
    </View >
  );
}


