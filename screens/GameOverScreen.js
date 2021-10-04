import React from 'react'
import { StyleSheet, Dimensions, Text, View, Image } from 'react-native'
import GameButton from '../components/GameButton'
import Header from '../components/Header'
import { useGlobal } from '../context'
import { Colors, commonStyles } from '../Utils/Configs'

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height


const GameOverScreen = (props) => {
    const { navigation, gameResultText, gameResultImg } = props

    const { theme } = useGlobal()

    const styles = StyleSheet.create({
        gameOverContainer: commonStyles(theme, phoneHeight, phoneWidth).common.containerStyle,
        header: commonStyles(theme, phoneHeight, phoneWidth).common.header,
        gameInfoContainer: {
            alignItems: 'center',
            marginLeft: phoneWidth * 0.04,
            marginRight: phoneWidth * 0.04,
        },
        gameInfo: {
            color: 'white',
            fontSize: phoneWidth * 0.04,
            letterSpacing: phoneWidth * 0.001,
            marginVertical: phoneHeight * 0.04,
            lineHeight: phoneHeight * 0.03

        },
        wordInfo: {
            color: 'white',
            fontSize: phoneWidth * 0.04,
        },
        word: {
            color: Colors.orange,
            fontSize: phoneWidth * 0.06,
            letterSpacing: phoneWidth * 0.01
        },
        buttonContainer: {
            marginLeft: phoneWidth * 0.2,
            marginRight: phoneWidth * 0.2,
        },
        playBtn: {
            backgroundColor: 'green',
            marginVertical: phoneHeight * 0.01

        },
        playBtnTxt: {
            textAlign: 'center',

        },
        gameBtns: {
            borderRadius: 8
        },
        quitBtn: {
            backgroundColor: 'transparent',
        },
        quitBtnTxt: {
            color: Colors.error,
            textAlign: 'center',
            fontSize: phoneHeight * 0.02

        },
        imgContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: phoneHeight * 0.04
        },
        img: {
            alignItems: 'center',
            height: phoneHeight * 0.3,
            width: phoneWidth * 0.8
        }
    })

    return (
        <View style={styles.gameOverContainer}>
            <Header navigation={navigation} />
            <View style={styles.gameInfoContainer}>
                <Text style={styles.gameInfo}>
                    Hurray! You're a genius 😁 You guessed it right 😁
                </Text>
                {/* <Text style={styles.gameInfo}>
                    Sorry, You lost the game 😥 Better luck next time
                </Text> */}
                <Text style={styles.wordInfo}>The word is
                    <Text style={styles.word}> MINE</Text>
                </Text>
            </View>
            <View style={styles.imgContainer}>
                {/* <Image style={styles.img} source={require('../assets/lost.jpeg')} /> */}
                <Image style={styles.img} source={require('../assets/won.jpeg')} />
            </View>
            <View style={styles.buttonContainer}>
                <GameButton
                    func={() => console.log("clicked ")}
                    propStyle={{ ...styles.playBtn, ...styles.gameBtns }} btnTextProp={styles.playBtnTxt}>Play Again</GameButton>
                <GameButton propStyle={{ ...styles.quitBtn, ...styles.gameBtns }} btnTextProp={styles.quitBtnTxt}>Quit</GameButton>

            </View>
        </View>
    )
}

export default GameOverScreen

