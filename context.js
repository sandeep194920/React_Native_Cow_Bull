import React, { useState, useContext } from 'react'
import { GAME, GameAttempts } from './Utils/Configs';
import { gameWords } from './Utils/CommonText';
import { cowBullCount } from './GameLogic/cowbullCount';

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

    // computer word/number
    const [computerChoice, setComputerChoice] = useState(null);

    const changeTheme = () => {
        setTheme(currentColor => currentColor === 'black' ? 'blue' : 'black')
    }

    const guessNextWord = (bool = true) => {
        console.log('setting the guessNext word to ', bool)
        setIsGuessNext(bool)
    }

    const addNewWord = (userWord) => {
        // see how many bulls and cows and then set them accordingly

        console.log(`We have access to comp word which is ${computerChoice}`)
        let { cow, bull } = cowBullCount(computerChoice, userWord)

        let word = {
            userWord,
            cow,
            bull
        }
        setWords(prevWords => [...prevWords, word])
    }

    const initializeGame = (game) => {
        setGame(prevGame => {
            return {
                ...prevGame,
                ...game
            }
        })
    }

    return <AppContext.Provider value={{ theme, changeTheme, isGuessNext, guessNextWord, words, setWords, addNewWord, errorMsg, setErrorMsg, initializeGame, game, attempts, setAttempts, GameAttempts, computerChoice, setComputerChoice }}>
        {children}
    </AppContext.Provider >
}

export const useGlobal = () => {
    return useContext(AppContext)
}
