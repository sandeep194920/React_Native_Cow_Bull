import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, Dimensions, TextInput, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Modal } from 'react-native'
import { Colors, commonStyles, GameAttempts, GAME } from '../Utils/Configs'
import { useGlobal } from '../context'
import GameButton from '../components/GameButton';
import Header from '../components/Header';
import Error from '../components/Error';
import { errors } from '../Utils/Configs'
import isValidWord from '../GameLogic/checkWordValidity';
let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const InputLettersScreen = (props) => {
    const { theme, guessNextWord, addNewWord, words, attempts, setErrorMsg, setAttempts, game } = useGlobal();
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
            letterSpacing: phoneWidth * 0.007,
            padding: Platform.OS === 'ios' ? phoneWidth * 0.03 : 0,
            flex: 2,
            marginRight: phoneWidth * 0.03,
            fontSize: phoneHeight * 0.02
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
            marginTop: phoneHeight * 0.08,
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
        console.log('reached guess cancel')
        guessNextWord(false)
        setLettersTyped(0)
        setWordEntered('')
        setErrorMsg('')
    }

    const checkForDuplicates = (wordEntered) => {
        return wordEntered.split('').some((letter, ind, lettersArr) => {
            return ind !== lettersArr.lastIndexOf(letter)
        })
    }

    const addWordHandler = () => {
        if (wordEntered) {
            if (wordEntered.length < game.letters) {
                return setErrorMsg(errors.noMinLetters)
            }
            if (checkForDuplicates(wordEntered)) {
                return setErrorMsg(errors.repeatedLetters)
            }

            // check if the word already exists (applies only
            // for words and not numbers)
            if (game.gameType === GAME.type.WORD) {
                console.log("REACHED WORD TESTER")
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
    const [firstAttempt, setFirstAttempt] = useState(false)
    useEffect(() => {
        if (words.length === 0) {
            return setFirstAttempt(true)
        }
        setFirstAttempt(false)
    }, [words])


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={70}>
            <Modal
                visible={props.visible} animationType="slide">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inputContainer}>
                        {/* <Header navigation={props.navigation} /> */}
                        <Header func={guessCancel} />
                        {/* navigation={props.navigation} */}
                        {firstAttempt && <Text style={styles.welcomeMsg}>Make your first guess</Text>}
                        <View style={styles.attemptsContainer}>
                            <Text style={styles.attemptInfo}>Attempt - </Text>
                            <Text style={styles.attempt}> {GameAttempts[game.letters][game.difficulty].chances === attempts + 1 ? 'Last Chance' : attempts + 1}</Text>
                        </View>
                        <View style={styles.inputContentContainer}>

                            <TextInput

                                keyboardType={game.gameType === GAME.type.NUMBER ? "number-pad" : 'default'}
                                maxLength={game.letters}
                                autoFocus value={wordEntered} autoCorrect={false} onChangeText={lettersHandler} underlineColorAndroid='transparent' placeholderTextColor={Colors.gray} style={styles.input} autoCapitalize='characters' placeholder="Type your word" />
                            <Text style={{ ...styles.commonText, ...styles.lettersLeft }}><Text style={{ color: Colors.orange }}>{lettersTyped} </Text>/ <Text >{game.letters}</Text>
                            </Text>
                        </View>

                        <Error />

                        <View style={styles.horizontalContainer}>
                            <GameButton func={addWordHandler} propStyle={styles.confirm}>Confirm</GameButton>
                            <GameButton func={guessCancel} propStyle={styles.cancel}>Cancel</GameButton>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </KeyboardAvoidingView>

    )
}

export default InputLettersScreen
