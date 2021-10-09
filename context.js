import React, { useState, useContext } from 'react'
import { GAME, GameAttempts, Screens } from './Utils/Configs';
import { gameWords } from './Utils/CommonText';
import { cowBullCount } from './GameLogic/cowbullCount';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';

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

    // hint
    const [hintsTaken, setHintsTaken] = useState(0)

    const [userHintPositions, setUserHintPositions] = useState([])

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
        setHintsTaken(0)
        setWords([])
        setGameOver(false)
        navigation.navigate(Screens.HOME)
    }

    // interstital ads
    const interstitialAds = async () => {
        // Display an interstitial
        await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id

        try {
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            console.log(error)
        }
    }

    // reward ads
    const rewardAds = async () => {
        // Display a rewarded ad
        await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
        try {
            await AdMobRewarded.requestAdAsync();
            await AdMobRewarded.showAdAsync();
        }
        catch (error) {
            console.log(error)
        }
    }

    return <AppContext.Provider value={{ theme, changeTheme, isGuessNext, guessNextWord, words, setWords, addNewWord, errorMsg, setErrorMsg, initializeGame, game, attempts, setAttempts, GameAttempts, computerChoice, setComputerChoice, gameOver, setGameOver, resetGame, hintsTaken, setHintsTaken, userHintPositions, setUserHintPositions, interstitialAds, rewardAds }}>
        {children}
    </AppContext.Provider >
}

export const useGlobal = () => {
    return useContext(AppContext)
}
