import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, Platform, Modal, Alert } from 'react-native'
import { useGlobal } from '../context'
import { Colors, commonStyles, Screens } from '../Utils/Configs'
import Attempt from '../components/Attempt';
import GameButton from '../components/GameButton';
import Header from '../components/Header';
import InputLetters from './InputLetters';

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const GameScreen = (props) => {
    const { theme, isGuessNext, guessNextWord, words, addNewWord, game, attempts } = useGlobal()
    const styles = StyleSheet.create({
        gameContainer: {
            ...commonStyles(theme, phoneHeight, phoneWidth).common.containerStyle,
            paddingTop: phoneHeight * .027,
        },
        header: commonStyles(theme, phoneHeight, phoneWidth).common.header,
        img: {
            width: phoneHeight * .07,
            height: phoneHeight * .07,
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
            borderBottomWidth: .4,
            marginBottom: 20
        },
        horizontalContainer: {
            flexDirection: 'row',
            marginBottom: phoneHeight * 0.03,
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

    })

    // after selecting the game type, since no words are entered yet, 
    // the modal should open
    useEffect(() => {
        if (words.length === 0) {
            guessNextWord(true)
        }
    }, [words])

    const gameCancelConfirmHandler = () => {
        Alert.alert(
            "Sad to see you go 😌 ",
            "Are you sure you want to quit the game?",
            [
                {
                    text: "Keep Playing",
                    onPress: () => {
                        console.log("Cancel Pressed")
                    },
                    style: "default"
                },
                {
                    text: "Quit", onPress: () => {
                        console.log("OK Pressed")
                        props.navigation.goBack()
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.gameContainer}>
            {/* Showing InputContainer which is a Modal */}
            <InputLetters visible={isGuessNext} />
            <Header func={gameCancelConfirmHandler} navigation={props.navigation} propHeaderImg={styles.img} />
            <View style={styles.gameDescription}>
                <Text style={{ ...styles.commonText, ...styles.attempts }}><Text style={{ color: Colors.orange }}>{attempts}</Text>/ <Text >14</Text>
                </Text>
                <Text style={{ ...styles.commonText, ...styles.gameHeading }}>{game.letters} Letter

                    <Text style={{ color: Colors.orange }}> {game.gameType.slice(0, 1).toUpperCase()}{game.gameType.slice(1).toLowerCase()}
                    </Text>
                </Text>

                <Text style={{ ...styles.commonText, ...styles.difficulty }}>{game.difficulty}</Text>
            </View>

            <ScrollView indicatorStyle='white' style={styles.attemptsContainer}>
                {words.map((word, index) => {
                    return <Attempt key={word + index} slno={index + 1} letters={word.toUpperCase().split('')} />
                })}
            </ScrollView>

            <View style={styles.horizontalContainer}>
                <GameButton propStyle={{ ...styles.revealBtn, ...styles.gameBtns }} btnTextProp={styles.revealBtnTxt}>Reveal</GameButton>
                <GameButton
                    func={() => guessNextWord()}
                    // this above func is equal to below func and param combined
                    // func={guessNextWord}
                    // param={true}
                    propStyle={{ ...styles.guessBtn, ...styles.gameBtns }} btnTextProp={styles.guessBtnTxt}>Guess Next {game.gameType.slice(0, 1).toUpperCase()}{game.gameType.slice(1).toLowerCase()}</GameButton>
                <GameButton propStyle={{ ...styles.hintBtn, ...styles.gameBtns }} btnTextProp={styles.hintBtnTxt}>Hint</GameButton>
            </View>
        </View >
    )
}

export default GameScreen

