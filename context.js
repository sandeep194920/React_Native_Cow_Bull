import React, { useState, useContext } from 'react'
import { GAME, GameAttempts, Screens } from './Utils/Configs';
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

    // game over
    const [gameOver, setGameOver] = useState(false)

    // number of attempts
    const [attempts, setAttempts] = useState(0)

    // computer word/number
    const [computerChoice, setComputerChoice] = useState(null);

    // navigation

    const changeTheme = () => {
        setTheme(currentColor => currentColor === 'black' ? 'blue' : 'black')
    }

    const guessNextWord = (bool = true) => {
        setIsGuessNext(bool)
    }

    const addNewWord = (userWord) => {
        // see how many bulls and cows and then set them accordingly

        console.log(`Computer choice is ${computerChoice}`)
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

    const resetGame = (navigation) => {
        setAttempts(0)
        setWords([])
        setGameOver(false)
        navigation.navigate(Screens.HOME)
    }

    return <AppContext.Provider value={{ theme, changeTheme, isGuessNext, guessNextWord, words, setWords, addNewWord, errorMsg, setErrorMsg, initializeGame, game, attempts, setAttempts, GameAttempts, computerChoice, setComputerChoice, gameOver, setGameOver, resetGame }}>
        {children}
    </AppContext.Provider >
}

export const useGlobal = () => {
    return useContext(AppContext)
}
