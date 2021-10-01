import React, { useState, useContext } from 'react'
import { GAME } from './Utils/Configs';
import { gameWords } from './Utils/CommonText';

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {

    const [theme, setTheme] = useState('black')

    // Modal opens when guess btn is pressed
    const [isGuessNext, setIsGuessNext] = useState(false)

    // words
    const [words, setWords] = useState(gameWords);

    // Error
    const [errorMsg, setErrorMsg] = useState('')

    // game
    const [game, setGame] = useState({ gameType: GAME.type.WORD, letters: GAME.letters['4'], difficulty: GAME.level.EASY });

    // number of attempts
    const [attempts, setAttempts] = useState(0)

    const changeTheme = () => {
        setTheme(currentColor => currentColor === 'black' ? 'blue' : 'black')
    }

    const guessNextWord = (bool = true) => {
        console.log('setting the guessNext word to ', bool)
        setIsGuessNext(bool)
    }

    const addNewWord = (newWord) => {
        setWords(prevWords => [...prevWords, newWord])
    }

    const initializeGame = (game) => {
        setGame(prevGame => {
            return {
                ...prevGame,
                ...game
            }
        })
    }

    return <AppContext.Provider value={{ theme, changeTheme, isGuessNext, guessNextWord, words, addNewWord, errorMsg, setErrorMsg, initializeGame, game, attempts, setAttempts }}>
        {children}
    </AppContext.Provider >
}

export const useGlobal = () => {
    return useContext(AppContext)
}
