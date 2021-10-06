import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SelectionScreen from '../screens/SelectionScreen';
import { Screens } from '../Utils/Configs';
import GameScreen from '../screens/GameScreen';
import InputLetters from '../screens/InputLettersScreen';
import InputLettersScreen from '../screens/InputLettersScreen';
import GameOverScreen from '../screens/GameOverScreen';
import GameRulesScreen from '../screens/GameRulesScreen';

const Stack = createNativeStackNavigator();

const GameNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={Screens.HOME}>
                <Stack.Screen
                    name={Screens.HOME}
                    component={HomeScreen}
                />
                <Stack.Screen
                    name={Screens.SELECTION}
                    component={SelectionScreen}
                />
                <Stack.Screen
                    name={Screens.GAME}
                    component={GameScreen}
                />
                <Stack.Screen
                    name={Screens.INPUT}
                    component={InputLettersScreen}
                />
                <Stack.Screen
                    name={Screens.GAME_OVER}
                    component={GameOverScreen}
                />
                <Stack.Screen
                    name={Screens.RULES}
                    component={GameRulesScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default GameNavigator

