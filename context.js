import React, { useState, useContext } from 'react'
import { Fontisto } from '@expo/vector-icons';
import { Dimensions, StyleSheet } from 'react-native';

const AppContext = React.createContext()

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

export const AppProvider = ({ children }) => {

    const [theme, setTheme] = useState('blue')

    const changeTheme = () => {
        setTheme(currentColor => currentColor === 'black' ? 'blue' : 'black')
    }


    return <AppContext.Provider value={{ theme, changeTheme }}>
        {children}
    </AppContext.Provider>
}

export const useGlobal = () => {
    return useContext(AppContext)
}
