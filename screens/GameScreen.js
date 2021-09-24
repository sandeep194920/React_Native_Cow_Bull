import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, Platform, Modal } from 'react-native'
import { useGlobal } from '../context'
import { Colors, commonStyles } from '../Utils/Configs'
import Attempt from '../components/Attempt';
import GameButton from '../components/GameButton';
import Header from '../components/Header';
import InputLetters from './InputLetters';

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const GameScreen = () => {
    const { theme, isGuessNext, guessNextWord, words, addNewWord } = useGlobal()
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
            flex: 2
        },
        guessBtnTxt: {
            textAlign: 'center'
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

    // const [isGuessNext, setIsGuessNext] = useState(false)
    return (
        <View style={styles.gameContainer}>

            {/* Showing InputContainer which is a Modal */}

            <InputLetters visible={isGuessNext} />
            <Header propHeaderImg={styles.img} />
            <View style={styles.gameDescription}>
                <Text style={{ ...styles.commonText, ...styles.attempts }}><Text style={{ color: Colors.orange }}>12 </Text>/ <Text >14</Text>
                </Text>
                <Text style={{ ...styles.commonText, ...styles.gameHeading }}>4 Letter Game</Text>

                <Text style={{ ...styles.commonText, ...styles.difficulty }}>Hard</Text>
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
                    propStyle={{ ...styles.guessBtn, ...styles.gameBtns }} btnTextProp={styles.guessBtnTxt}>Guess Next</GameButton>
                <GameButton propStyle={{ ...styles.hintBtn, ...styles.gameBtns }} btnTextProp={styles.hintBtnTxt}>Hint</GameButton>
            </View>
        </View >
    )
}

export default GameScreen

