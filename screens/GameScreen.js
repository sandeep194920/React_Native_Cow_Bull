import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, BackHandler, ScrollView, Platform, Alert, Vibration } from 'react-native'
import { useGlobal } from '../context'
import { AdBannerTypes, Colors, commonStyles, GameAttempts, gameVoice, Screens } from '../Utils/Configs'
import Attempt from '../components/Attempt';
import GameButton from '../components/GameButton';
import Header from '../components/Header';
import InputLetters from './InputLettersScreen';
import AdBanner from '../components/AdBanner';
import Loading from '../components/Loading';

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const GameScreen = (props) => {
    const { theme, isGuessNext, guessNextWord, words, setWords, game, attempts, setAttempts, navigation, gameOver, setGameOver, resetGame, computerChoice, setHintsTaken, hintsTaken, userHintPositions, setUserHintPositions, interstitialAds, rewardAds, exitApp, setLoading, loading, playVoice, shouldVoicePlay,
        extraChancesTaken, setExtraChancesTaken, initializeGame
    } = useGlobal()
    const styles = StyleSheet.create({
        gameContainer: {
            ...commonStyles(theme, phoneHeight, phoneWidth).common.containerStyle,
            paddingTop: phoneHeight * .027,
        },
        header: commonStyles(theme, phoneHeight, phoneWidth).common.header,
        logoImg: {
            width: phoneHeight * .09,
            height: phoneHeight * .09,
        },
        loadingImgContainer: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },

        gameDescription: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: phoneHeight * .015
        },
        commonText: {
            color: 'white'
        },
        attempts: {
            ...commonStyles(theme, phoneHeight, phoneWidth).common.borderedText,
        },
        gameHeading: {
            fontSize: phoneHeight * .027
        },
        difficulty: {
            color: Colors.orange,
            fontSize: phoneWidth * .036
        },
        attemptsContainer: {
            marginLeft: phoneHeight * 0.01,
            marginRight: phoneHeight * 0.017,
            marginTop: phoneHeight * 0.02,
            borderBottomColor: 'white',
            borderBottomWidth: .5,
            marginBottom: -phoneHeight * 0.04,
        },
        horizontalContainer: {
            flexDirection: 'row',
            marginBottom: phoneHeight * 0.01,
            justifyContent: 'space-evenly'
        },
        revealBtn: {
            backgroundColor: 'transparent',
        },
        revealBtnTxt: {
            color: 'orange',
        },
        guessBtn: {
            backgroundColor: 'green',
            flex: 2,
        },
        guessBtnTxt: {
            textAlign: 'center',
            fontSize: phoneWidth * 0.035
        },
        gameBtns: {
            borderRadius: 8
        },
        hintBtn: {
            backgroundColor: 'transparent'
        },
        hintBtnTxt: {
            color: Colors.lightGreen,
        },
        quitBtn: {
            backgroundColor: 'transparent'
        },
        quitBtnTxt: {
            color: Colors.error,
        },
        ad: {
            marginBottom: phoneHeight * 0.03
        }
    })

    const increaseAttemptsHandler = () => {
        Alert.alert(
            "Nearing Last attempt",
            "Next attempt is your last chance. You deserve more chances as this game seems tricky. Feel free to use it 😍",
            [
                {
                    text: "Cancel",
                    // onPress: () => {
                    //     console.log("Cancel Pressed")
                    // },
                    style: "default"
                },
                {
                    text: "More Chances", onPress: () => {

                        // const maxAttempts = GameAttempts[game.letters][game.difficulty].chances
                        setLoading(true)
                        console.log(`From destination - The max attmpts are ${game.maxAttempts}`)

                        initializeGame({ maxAttempts: game.maxAttempts + 5 })

                        // showing video ads
                        rewardAds()

                        // to show the ad after couple of seconds
                        setTimeout(() => {
                            setLoading(false)
                            Alert.alert(`Congrats, you got 5 more attempts`)
                        }, 3000)

                        setExtraChancesTaken(true)

                    },
                    style: 'default'
                }
            ],
            { cancelable: false }
        );
    }

    // after selecting the game type, since no words are entered yet, 
    // the modal should open
    useEffect(() => {
        if (words.length === 0) {
            guessNextWord(true)
        }
        if (attempts === game['maxAttempts'] - 1 && words[words.length - 1].bull !== game.letters) {
            console.log(`Next chance is the last chance`)
            if (!extraChancesTaken) {
                // show user an option that he can take more chances
                increaseAttemptsHandler()
            }
        }

    }, [words])


    // if game over
    useEffect(() => {

        // won the game
        if (words.length > 0 && words[words.length - 1].bull === game.letters) {
            props.navigation.navigate(Screens.GAME_OVER, { gameResult: 'won', navigation })
            setGameOver(true)
            shouldVoicePlay && playVoice(gameVoice.WON)
            Vibration.vibrate(2 * 400)
        }

        // lost the game
        else if (words.length === game['maxAttempts'] && words[words.length - 1].bull !== game.letters) {

            props.navigation.navigate(Screens.GAME_OVER, { gameResult: 'lost', navigation })
            setGameOver(true)
            shouldVoicePlay && playVoice(gameVoice.LOST)
        }

    }, [words])


    const exitCurrentGame = () => {
        Alert.alert(
            "Sad to see you go 😌 ",
            "Are you sure you want to quit the game?",
            [
                {
                    text: "Keep Playing",
                    // onPress: () => {
                    //     console.log("Cancel Pressed")
                    // },
                    style: "default"
                },
                {
                    text: "Quit", onPress: () => {
                        setWords([])
                        setAttempts(0)
                        setHintsTaken(0)
                        // setFocusInput(true)
                        props.navigation.goBack()
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: false }
        );
    }

    const gameCancelConfirmHandler = () => {
        exitCurrentGame()
    }

    useEffect(() => {
        if (words.length === 5) {
            console.log("showing ad now at chance 5")
            interstitialAds()
        }
    }, [words])


    const revealGame = () => {
        Alert.alert(
            "Would you give up?",
            "Are you sure you want to reveal the letters and end the fun? You can use the hint if you want",
            [
                {
                    text: "Not at all",
                    // onPress: () => {
                    //     console.log("Cancel Pressed")
                    // },
                    style: "default"
                },
                {
                    text: "Yes, Reveal", onPress: () => {
                        setLoading(true)
                        interstitialAds()
                        setTimeout(() => {
                            props.navigation.navigate(Screens.GAME_OVER, { gameResult: 'revealed', navigation })
                            shouldVoicePlay && playVoice(gameVoice.LOST)
                            setGameOver(true)
                        }, 2000)
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: false }
        );
    }

    const hintsHandler = () => {
        setHintsTaken(prevHints => prevHints + 1)
        if (hintsTaken > GameAttempts[game.letters][game.difficulty].hints - 1) {
            console.log(`Sorry no more hints`)
            Alert.alert('Sorry, no more hints', `You've already taken ${GameAttempts[game.letters][game.difficulty].hints} hints`)
            setLoading(false)
        } else {

            let randomLetterCount = Math.floor(Math.random() * computerChoice.length)

            // if this hint is already shown then the new hint must be generated
            while (userHintPositions.includes(randomLetterCount)) {
                randomLetterCount = Math.floor(Math.random() * computerChoice.length)
            }

            setUserHintPositions(prevHints =>
                [...prevHints, randomLetterCount])

            const randomLetter = computerChoice[randomLetterCount]
            console.log(`Letter ${randomLetter} exists in hidden ${game.gameType}`)

            // showing video ads
            rewardAds()

            // to show the ad after couple of seconds
            setTimeout(() => {
                setLoading(false)
                Alert.alert(`Hint - ${hintsTaken + 1}`, `Letter ${randomLetter.toUpperCase()} exists in hidden ${game.gameType.toLowerCase()}`)
            }, 3000)
        }
    }

    const showHint = () => {
        Alert.alert(
            "Want a hint?",
            "Are you sure you want to reveal a letter",
            [
                {
                    text: "Cancel",
                    // onPress: () => {
                    //     console.log("Cancel Pressed")
                    // },
                    style: "default"
                },
                {
                    text: "Yes, Please", onPress: () => {
                        // rewardAds()
                        setLoading(true)
                        hintsHandler()
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: false }
        );
    }



    let buttons = (
        <View style={styles.horizontalContainer}>
            <GameButton func={revealGame} propStyle={{ ...styles.revealBtn, ...styles.gameBtns }} btnTextProp={styles.revealBtnTxt}>Reveal</GameButton>
            <GameButton
                func={() => guessNextWord()}
                // this above func is equal to below func and param combined
                // func={guessNextWord}
                // param={true}
                propStyle={{ ...styles.guessBtn, ...styles.gameBtns }} btnTextProp={styles.guessBtnTxt}>Guess Next {game.gameType.slice(0, 1).toUpperCase()}{game.gameType.slice(1).toLowerCase()}</GameButton>
            <GameButton func={showHint} propStyle={{ ...styles.hintBtn, ...styles.gameBtns }} btnTextProp={styles.hintBtnTxt}>Hint</GameButton>
        </View>

    )

    if (gameOver) {
        buttons = (
            <View style={styles.horizontalContainer}>
                {/* <GameButton propStyle={{ ...styles.revealBtn, ...styles.gameBtns }} btnTextProp={styles.revealBtnTxt}>Reveal</GameButton> */}
                <Text style={{ width: phoneWidth * 0.2 }}></Text>
                <GameButton
                    func={() => resetGame(props.navigation)}
                    propStyle={{ ...styles.guessBtn, ...styles.gameBtns }} btnTextProp={styles.guessBtnTxt}>Play Again</GameButton>
                {Platform.OS === 'android' && <GameButton propStyle={{ ...styles.quitBtn, ...styles.gameBtns }} func={() => exitApp(props.navigation)} btnTextProp={styles.quitBtnTxt}>Quit</GameButton>}
                {Platform.OS === 'ios' && <Text style={{ width: phoneWidth * 0.2 }}></Text>}
            </View>
        )
    }

    useEffect(() => {
        const backAction = () => {
            // Alert.alert("Hold on!", "Are you sure you want to go back?", [
            //     {
            //         text: "Cancel",
            //         onPress: () => null,
            //         style: "cancel"
            //     },
            //     { text: "YES", onPress: () => BackHandler.exitApp() }
            // ]);
            exitCurrentGame()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.gameContainer}>
            {loading && <Loading />}
            {/* Showing InputContainer which is a Modal */}
            <InputLetters visible={isGuessNext} navigation={props.navigation} />
            <Header func={gameCancelConfirmHandler} navigation={props.navigation} propHeaderImg={styles.logoImg} />
            <View style={styles.gameDescription}>
                {/* <Text style={{ ...styles.commonText, ...styles.attempts }}><Text style={{ color: Colors.orange }}>{attempts}</Text>/ <Text >{GameAttempts[game.letters][game.difficulty].chances}</Text> */}
                <Text style={{ ...styles.commonText, ...styles.attempts }}><Text style={{ color: Colors.orange }}>{attempts}</Text>/ <Text >{game['maxAttempts']}</Text>

                </Text>
                <Text style={{ ...styles.commonText, ...styles.gameHeading }}>{game.letters} Letter

                    <Text style={{ color: Colors.orange }}> {game.gameType.slice(0, 1).toUpperCase()}{game.gameType.slice(1).toLowerCase()}
                    </Text>
                </Text>

                <Text style={{ ...styles.commonText, ...styles.difficulty }}>{game.difficulty}</Text>
            </View>

            <ScrollView indicatorStyle='white' style={styles.attemptsContainer}>
                {words.map((word, index) => {
                    return <Attempt word={word} key={word + index} slno={index + 1} letters={word.userWord.toUpperCase().split('')} />
                })}
            </ScrollView>

            <View style={styles.ad}>
                <AdBanner bannerStyle={AdBannerTypes.smartBannerPortrait} />
            </View>
            {buttons}
        </View >
    )
}

export default GameScreen

