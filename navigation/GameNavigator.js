import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SelectionScreen from '../screens/SelectionScreen';
import { Screens } from '../Utils/Configs';
import GameScreen from '../screens/GameScreen';
import InputLetters from '../screens/InputLetters';

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
                    component={InputLetters}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default GameNavigator

