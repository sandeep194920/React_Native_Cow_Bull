import React, { useState, useEffect, useContext, createContext } from 'react'
import { GAME, GameAttempts, gameVoice, Screens, AD_KEYS } from './Utils/Configs';
import { gameWords } from './Utils/CommonText';
import { cowBullCount } from './GameLogic/cowbullCount';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { BackHandler, Vibration } from 'react-native';
import { computerWord, computerNumber } from './GameLogic/computerChoice';
import { Audio } from 'expo-av';

const AppContext = createContext()
export const AppProvider = ({ children }) => {

    const [theme, setTheme] = useState('blue')

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

    // focus input in input screen
    const [focusInput, setFocusInput] = useState(true)

    // loading

    const [loading, setLoading] = useState(false)

    // sound
    const [voice, setVoice] = useState()

    // should voice be played
    const [shouldVoicePlay, setShouldVoicePlay] = useState(true)

    // navigation

    const changeTheme = () => {
        setTheme(currentColor => currentColor === 'black' ? 'blue' : 'black')
    }

    const guessNextWord = (bool = true) => {
        setFocusInput(true)
        setIsGuessNext(bool)
    }

    const addNewWord = (userWord) => {
        // see how many bulls and cows and then set them accordingly

        console.log(`Computer choice is ${computerChoice}`)
        let { cow, bull } = cowBullCount(computerChoice, userWord)

        // FOR HARD LEVEL
        // if the user word contains even a single bull, then it becomes easy to guess. So we need to re produce the computer word if the first attempt gets atleast one bull
        while (attempts === 0 && game.difficulty === GAME.level.HARD && bull > 0) {
            let newCompChoice = ''
            if (game.gameType === GAME.type.NUMBER) {
                newCompChoice = computerNumber(game.letters)
                console.log(`The New Computer choice is ${newCompChoice}`)
            } else if (game.gameType === GAME.type.WORD) {
                newCompChoice = computerWord(game.letters)
                console.log(`The New Computer choice is ${newCompChoice}`)
            }
            setComputerChoice(newCompChoice);
            ({ bull, cow } = cowBullCount(newCompChoice, userWord))
        }

        if (bull === 1) {
            Vibration.vibrate(2 * 100)
            shouldVoicePlay && playVoice(gameVoice.GOT_BULL)
        }
        if (bull > 1 && bull < game.letters) {
            Vibration.vibrate(2 * 200)
            shouldVoicePlay && playVoice(gameVoice.MORE_BULLS)
        }

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

    const gameDefaults = (navigation) => {
        setAttempts(0)
        setHintsTaken(0)
        setWords([])
        setGameOver(false)
        navigation.navigate(Screens.HOME)
    }

    const resetGame = (navigation) => {
        gameDefaults(navigation)
    }

    const exitApp = async (navigation) => {
        gameDefaults(navigation)
        BackHandler.exitApp()
        await voice.unloadAsync();
    }

    // interstital ads

    // AD UNIT ID FOR INTERSTITIAL AD
    const interstitialID = Platform.select({

        // uncommnet below for prod

        // ios: "ca-app-pub-7296629630933757/6577668091",
        // android: "ca-app-pub-7296629630933757/2708244263",


        ios: AD_KEYS.Ios.INTERSTITIAL_ID,
        android: AD_KEYS.Android.INTERSTITIAL_ID,


        // uncommnet above for prod


        // test ads below

        // ios: "ca-app-pub-3940256099942544/1033173712",
        // android: "ca-app-pub-3940256099942544/1033173712"

        // test ads above


    });

    const interstitialAds = async () => {
        // Display an interstitial
        await AdMobInterstitial.setAdUnitID(interstitialID); // Test ID, Replace with your-admob-unit-id

        try {
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            console.log(error)
        }
    }

    // reward ads
    const rewardedAdID = Platform.select({

        // uncommnet below for prod

        // ios: "ca-app-pub-7296629630933757/4887497692",
        // android: "ca-app-pub-7296629630933757/9820447521",

        ios: AD_KEYS.Ios.REWARD_ID,
        android: AD_KEYS.Android.REWARD_ID

        // uncommnet above for prod

        // test ads below

        // ios: "ca-app-pub-3940256099942544/5224354917",
        // android: "ca-app-pub-3940256099942544/5224354917"

        // test ads above


    });

    const rewardAds = async () => {
        // Display a rewarded ad
        await AdMobRewarded.setAdUnitID(rewardedAdID); // Test ID, Replace with your-admob-unit-id
        try {
            await AdMobRewarded.requestAdAsync();
            await AdMobRewarded.showAdAsync();
        }
        catch (error) {
            console.log(error)
        }
    }

    // voices
    async function playVoice(voice) {
        let vocal = null
        switch (voice) {
            case gameVoice.WON:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/won.mp3`)
                ))
                break
            case gameVoice.LOST:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/lost.mp3`)
                ))
                break
            case gameVoice.DARK_THEME:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/darkTheme.mp3`)
                ))
                break
            case gameVoice.LIGHT_THEME:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/lightTheme.mp3`)
                ))
                break
            case gameVoice.NO_COWS_BULLS:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/noCowsBulls.mp3`)
                ))
                break
            case gameVoice.MORE_BULLS:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/moreBulls.mp3`)
                ))
                break
            case gameVoice.PLAY_WORD:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/playWord.mp3`)
                ))
                break
            case gameVoice.PLAY_NUMBER:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/playNumber.mp3`)
                ))
                break
            case gameVoice.GOT_BULL:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/gotBull.mp3`)
                ))
                break
            case gameVoice.SHOW_RULES:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/showRules.mp3`)
                ))
                break
            case gameVoice.FIRST_GUESS:
                ({ sound: vocal } = await Audio.Sound.createAsync(
                    require(`./Sounds/firstGuess.mp3`)
                ))
                break
            default:
                break
        }

        setVoice(vocal);
        console.log('Playing Sound');
        await vocal.playAsync();
    }


    // play bg sound
    const [playBg, setPlayBg] = useState(true)
    // background sound
    const [sound, setSound] = React.useState();


    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            require('./Sounds/backgroundSound.mp3'),
            { isLooping: true }
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }


    React.useEffect(() => {
        if (playBg) {
            playSound()
        } else {
            console.log("STOP BG SOUND PLEASE");
            // () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
            // }
        }
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [playBg]);



    return <AppContext.Provider value={{
        theme, changeTheme, isGuessNext, guessNextWord, words, setWords, addNewWord, errorMsg, setErrorMsg, initializeGame, game, attempts, setAttempts, GameAttempts, computerChoice, setComputerChoice, gameOver, setGameOver, resetGame, hintsTaken, setHintsTaken, userHintPositions, setUserHintPositions, interstitialAds, rewardAds, exitApp, focusInput, setFocusInput, loading, setLoading, voice, setVoice, playVoice, shouldVoicePlay, setShouldVoicePlay, setPlayBg,


    }}>
        {children}
    </AppContext.Provider >
}

export const useGlobal = () => {
    return useContext(AppContext)
}
