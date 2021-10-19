import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Modal } from 'react-native'
import { Colors, commonStyles, GameAttempts, GAME, AdBannerTypes, gameVoice } from '../Utils/Configs'
import { useGlobal } from '../context'
import GameButton from '../components/GameButton';
import Header from '../components/Header';
import Error from '../components/Error';
import { errors } from '../Utils/Configs'
import isValidWord from '../GameLogic/checkWordValidity';
import AdBanner from '../components/AdBanner';
let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const InputLettersScreen = (props) => {
    const { theme, guessNextWord, addNewWord, words, attempts, setErrorMsg, setAttempts, game, focusInput, setFocusInput, gameOver, shouldVoicePlay, playVoice, firstAttemptDone, setFirstAttemptDone } = useGlobal();
    const styles = StyleSheet.create({
        inputContainer: {
            ...commonStyles(theme, phoneHeight, phoneWidth).common.containerStyle,
        },
        inputContentContainer: {
            flexDirection: 'row',
            marginLeft: phoneWidth * 0.07,
            marginRight: phoneWidth * 0.07,
            marginTop: phoneHeight * 0.03,
            justifyContent: 'space-around',
        },
        input: {
            borderWidth: .9,
            borderColor: Colors.orange,
            borderRadius: 8,
            paddingLeft: phoneWidth * 0.05,
            color: 'white',
            letterSpacing: phoneWidth * 0.0023,
            padding: Platform.OS === 'ios' ? phoneWidth * 0.03 : 0,
            flex: 2,
            marginRight: phoneWidth * 0.03,
            fontSize: phoneHeight * 0.025,

        },
        lettersLeft: {
            ...commonStyles(theme, phoneHeight, phoneWidth).common.borderedText,
            textAlignVertical: 'center',
            lineHeight: phoneHeight * 0.03
        },
        commonText: {
            color: 'white'
        },
        horizontalContainer: {
            flexDirection: 'row',
            marginTop: phoneHeight * 0.06,
            justifyContent: 'space-evenly',
            marginBottom: 4
        },
        confirm: {
            backgroundColor: Colors[theme].play,
        },
        cancel: {
            backgroundColor: Colors.red
        },
        welcomeMsg: {
            color: Colors.lightBlue,
            textAlign: 'center',
            marginTop: phoneHeight * 0.03,
            fontSize: phoneWidth * 0.04,
            letterSpacing: phoneWidth * 0.004
        },
        attemptsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: phoneHeight * 0.03,
        },
        attemptInfo: {
            color: 'white',
            fontSize: phoneWidth * 0.043,
            letterSpacing: phoneWidth * 0.001
        },
        attempt: {
            color: Colors.orange,
            fontSize: phoneWidth * 0.043,
            letterSpacing: phoneWidth * 0.001
        }

    })

    const [lettersTyped, setLettersTyped] = useState(0)
    const [wordEntered, setWordEntered] = useState('')
    const [firstAttempt, setFirstAttempt] = useState(false)


    const lettersHandler = (text) => {
        const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; `
        const isSpecialCharsPresent = specialChars.split('').some(char => text.includes(char))

        if (isSpecialCharsPresent) {
            return setErrorMsg(errors.specialChars)
        }
        setWordEntered(text)
        setLettersTyped(text.length)
    }

    const guessCancel = () => {
        guessNextWord(false)
        setLettersTyped(0)
        setWordEntered('')
        setFocusInput(false)
        setErrorMsg('')
    }

    const checkForDuplicates = (wordEntered) => {
        return wordEntered.split('').some((letter, ind, lettersArr) => {
            return ind !== lettersArr.lastIndexOf(letter)
        })
    }
    const addWordHandler = () => {
        if (!wordEntered) {
            return setErrorMsg(errors.noMinLetters)
        }
        if (wordEntered) {
            if (wordEntered.length < game.letters) {
                return setErrorMsg(errors.noMinLetters)
            }
            if (checkForDuplicates(wordEntered)) {
                return setErrorMsg(errors.repeatedLetters)
            }

            // check if the word already exists (applies only
            // for words and not numbers)
            if (game.gameType === GAME.type.WORD || game.gameType === GAME.type.NUMBER) {
                for (const word of words) {
                    if (word.userWord === wordEntered.toLowerCase()) {
                        return setErrorMsg(errors.wordExists)
                    }
                }
            }

            // check if the word already exists (applies only
            // for words and not numbers)
            if (game.gameType === GAME.type.WORD) {
                if (!isValidWord(wordEntered.toLowerCase())) {
                    return setErrorMsg(errors.invalidWord)
                }
            }
            addNewWord(wordEntered.toLowerCase())
        }
        setAttempts(prevAttempts => prevAttempts + 1)
        guessCancel()
        setErrorMsg('')

    }
    // let playedFirstAttemptSound = false

    useEffect(() => {
        // first attempt voice
        if (!firstAttemptDone) {
            shouldVoicePlay && playVoice(gameVoice.FIRST_GUESS)
            setFirstAttemptDone(true)
        }
        if (words.length === 0) {
            return setFirstAttempt(true)
        }
        setFirstAttempt(false)
    }, [words])


    // to open the keyboard automatically

    const inputEl = React.useRef(null);
    useEffect(() => {
        if (focusInput && !gameOver) {
            setTimeout(() => {
                // if (inputEl.current) {
                inputEl.current?.focus()
                // }
            }, 100)
            setFocusInput(false)
        }

    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={70}>
            <Modal
                onRequestClose={guessCancel}
                visible={props.visible} animationType="slide">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inputContainer}>
                        <Header
                            navigation={props.navigation}
                            func={guessCancel} />
                        {firstAttempt && <Text style={styles.welcomeMsg}>Make your first guess</Text>}
                        <View style={styles.attemptsContainer}>
                            <Text style={styles.attemptInfo}>Attempt - </Text>
                            <Text style={styles.attempt}> {GameAttempts[game.letters][game.difficulty].chances === attempts + 1 ? 'Last Chance' : attempts + 1}</Text>
                        </View>
                        <View style={styles.inputContentContainer}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                // autoFocus
                                ref={inputEl}
                                onSubmitEditing={addWordHandler}
                                keyboardType={game.gameType === GAME.type.NUMBER ? "number-pad" : 'default'}
                                maxLength={game.letters}
                                value={wordEntered} autoCorrect={false} onChangeText={lettersHandler}
                                placeholderTextColor={Colors.gray}
                                style={styles.input}
                                autoCapitalize='characters'
                                placeholder="Input letters (Press here)"
                                autoCorrect={false}
                                // editable={false}
                                selectionColor={Colors.orange}
                            // underlineColorAndroid='transparent'
                            />

                            <Text style={{ ...styles.commonText, ...styles.lettersLeft }}><Text style={{ color: Colors.orange }}>{lettersTyped} </Text>/ <Text >{game.letters}</Text>
                            </Text>
                        </View>
                        <Error />
                        <View style={{ ...styles.horizontalContainer, marginTop: firstAttempt ? phoneHeight * 0.023 : phoneHeight * 0.07 }}>
                            <GameButton func={addWordHandler} propStyle={styles.confirm}>Confirm</GameButton>
                            <GameButton func={guessCancel} propStyle={styles.cancel}>Cancel</GameButton>
                        </View>
                        <AdBanner bannerStyle={AdBannerTypes.smartBannerPortrait} />
                    </View>

                </TouchableWithoutFeedback>
            </Modal>
        </KeyboardAvoidingView >

    )
}

export default InputLettersScreen
