import React from 'react'
import { StyleSheet, Dimensions, Text, View, Image, BackHandler } from 'react-native'
import GameButton from '../components/GameButton'
import Header from '../components/Header'
import { useGlobal } from '../context'
import { Colors, commonStyles, gameResultTxt } from '../Utils/Configs'

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height


const GameOverScreen = (route, props) => {
    const { gameResultText, gameResultImg } = props
    const { gameResult } = route.route.params
    const { computerChoice, attempts, resetGame } = useGlobal()
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
            marginTop: phoneHeight * 0.03,
            lineHeight: phoneHeight * 0.045
        },
        attemptInfo: {
            color: 'white',
            marginTop: phoneHeight * 0.02,
            fontSize: phoneWidth * 0.037,

        },
        attempt: {
            color: Colors.orange,

        },
        wordInfo: {
            color: 'white',
            fontSize: phoneWidth * 0.04,

        },
        word: {
            color: Colors.orange,
            fontSize: phoneWidth * 0.06,
            letterSpacing: phoneWidth * 0.005
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
        },

    })

    console.log(`Prop nav is `)
    console.log(route.navigation)

    const exitApp = () => {
        BackHandler.exitApp()
    }

    return (
        <View style={styles.gameOverContainer}>
            <Header navigation={route.navigation} />
            <View style={styles.gameInfoContainer}>
                <Text style={styles.gameInfo}>
                    {gameResultTxt[gameResult]}
                </Text>

                <Text style={styles.wordInfo}>The word is
                    <Text style={styles.word}> {computerChoice.toUpperCase()}</Text>
                </Text>

                <Text style={styles.attemptInfo}>Attempts taken -
                    <Text style={styles.attempt}> {attempts} </Text>
                </Text>

            </View>
            <View style={styles.imgContainer}>
                {gameResult === 'won' ?
                    <Image style={styles.img} source={require(`../assets/won.jpeg`)} /> :
                    <Image style={styles.img} source={require(`../assets/lost.jpeg`)} />
                }
            </View>
            <View style={styles.buttonContainer}>
                <GameButton
                    func={() => resetGame(route.navigation)}
                    propStyle={{ ...styles.playBtn, ...styles.gameBtns }} btnTextProp={styles.playBtnTxt}>Play Again</GameButton>
                {Platform.OS === 'android' && <GameButton func={exitApp} propStyle={{ ...styles.quitBtn, ...styles.gameBtns }} btnTextProp={styles.quitBtnTxt}>Quit</GameButton>}
            </View>
        </View>
    )
}

export default GameOverScreen

