import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, Dimensions, TextInput, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Modal } from 'react-native'
import { Colors, commonStyles } from '../Utils/Configs'
import { useGlobal } from '../context'
import GameButton from '../components/GameButton';
import Header from '../components/Header';
import Error from '../components/Error';
import { errors } from '../Utils/CommonText'
let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const InputLetters = (props) => {
    const { theme, guessNextWord, addNewWord, words, setErrorMsg } = useGlobal();
    const styles = StyleSheet.create({
        inputContainer: {
            ...commonStyles(theme, phoneHeight, phoneWidth).common.containerStyle,
        },
        inputContentContainer: {
            flexDirection: 'row',
            marginLeft: phoneWidth * 0.07,
            marginRight: phoneWidth * 0.07,
            marginTop: phoneHeight * 0.05,
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

    })

    const [lettersTyped, setLettersTyped] = useState(0)
    const [wordEntered, setWordEntered] = useState('')

    const lettersHandler = (text) => {
        setWordEntered(text)
        setLettersTyped(text.length)
    }

    const guessCancel = () => {
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
            if (checkForDuplicates(wordEntered)) {
                return setErrorMsg(errors.repeatedLetters)
            }
            if (words.includes(wordEntered)) {
                return setErrorMsg(errors.wordExists)
            }
            addNewWord(wordEntered.toLowerCase())
        }
        guessCancel()
        setErrorMsg('')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={70}>
            <Modal
                visible={props.visible} animationType="slide">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inputContainer}>
                        <Header onPress={guessCancel} />
                        <View style={styles.inputContentContainer}>
                            <TextInput
                                autoFocus value={wordEntered} autoCorrect={false} onChangeText={lettersHandler} underlineColorAndroid='transparent' placeholderTextColor={Colors.gray} style={styles.input} autoCapitalize='characters' placeholder="Type your word" />
                            <Text style={{ ...styles.commonText, ...styles.lettersLeft }}><Text style={{ color: Colors.orange }}>{lettersTyped} </Text>/ <Text >4</Text>
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

export default InputLetters
