import React, { useState, useContext } from 'react'
import { Fontisto } from '@expo/vector-icons';
import { Dimensions, StyleSheet } from 'react-native';
import { errors, gameWords } from './Utils/CommonText';

const AppContext = React.createContext()

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

export const AppProvider = ({ children }) => {

    const [theme, setTheme] = useState('black')
    // Modal opens when guess btn is pressed
    const [isGuessNext, setIsGuessNext] = useState(false)

    // words
    const [words, setWords] = useState(gameWords);

    // Error
    const [errorMsg, setErrorMsg] = useState('')

    const changeTheme = () => {
        setTheme(currentColor => currentColor === 'black' ? 'blue' : 'black')
    }

    const guessNextWord = (bool = true) => {
        setIsGuessNext(bool)
    }

    const addNewWord = (newWord) => {
        setWords(prevWords => [...prevWords, newWord])
    }

    return <AppContext.Provider value={{ theme, changeTheme, isGuessNext, guessNextWord, words, addNewWord, errorMsg, setErrorMsg }}>
        {children}
    </AppContext.Provider>
}

export const useGlobal = () => {
    return useContext(AppContext)
}
