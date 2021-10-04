import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { AppContext, AppProvider, useGlobal } from './context'
import SelectionScreen from './screens/SelectionScreen';
import GameScreen from './screens/GameScreen';
import InputLetters from './screens/InputLetters';
import GameNavigator from '../cowbull/navigation/GameNavigator'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameOverScreen from './screens/GameOverScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });


  return (
    <AppProvider>
      <GameNavigator />
      {/* <GameOverScreen /> */}
    </AppProvider>

  );
}

