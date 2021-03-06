import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { AppContext, AppProvider, useGlobal } from './context'
import SelectionScreen from './screens/SelectionScreen';
import GameScreen from './screens/GameScreen';
import InputLetters from './screens/InputLettersScreen';
import GameNavigator from '../cowbull/navigation/GameNavigator'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameOverScreen from './screens/GameOverScreen';
import GameRulesScreen from './screens/GameRulesScreen';
import { Audio } from 'expo-av';


const Stack = createNativeStackNavigator();

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });

  return (
    <AppProvider>
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <GameNavigator />
      </View>
      {/* <GameRulesScreen /> */}
    </AppProvider>

  );
}

