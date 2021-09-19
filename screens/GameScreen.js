import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native'
import { useGlobal } from '../context'
import { Colors, commonStyles } from '../Utils/Configs'
import { Ionicons, Fontisto } from '@expo/vector-icons';
import Attempt from '../components/Attempt';
import GameButton from '../components/GameButton';

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const GameScreen = () => {
    const { theme, changeTheme } = useGlobal()
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
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 20,
            padding: phoneHeight * 0.01,
            fontSize: phoneHeight * .017
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
        }
    })

    return (

        <View style={styles.gameContainer}>
            <View style={styles.header}>
                <Ionicons style={styles.backIcon} name="arrow-back" size={phoneWidth / 18} color={Colors.orange} />
                <Image style={styles.img} source={require('../assets/Logo.png')} />
                <Fontisto onPress={() => changeTheme()} style={styles.toggleIcon} name={`toggle-${theme === 'black' ? 'on' : 'off'}`} size={34} color="white" />
            </View>
            <View style={styles.gameDescription}>
                <Text style={{ ...styles.commonText, ...styles.attempts }}><Text style={{ color: Colors.orange }}>12 </Text>/ <Text >14</Text>
                </Text>

                <Text style={{ ...styles.commonText, ...styles.gameHeading }}>4 Letter Game</Text>

                <Text style={{ ...styles.commonText, ...styles.difficulty }}>Hard</Text>

            </View>


            <ScrollView style={styles.attemptsContainer}>
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
                <Attempt />
            </ScrollView>

            <View style={styles.horizontalContainer}>
                <GameButton propStyle={{ ...styles.revealBtn, ...styles.gameBtns }} btnTextProp={styles.revealBtnTxt}>Reveal</GameButton>
                <GameButton propStyle={{ ...styles.guessBtn, ...styles.gameBtns }} btnTextProp={styles.guessBtnTxt}>Guess Next</GameButton>
                <GameButton propStyle={{ ...styles.hintBtn, ...styles.gameBtns }} btnTextProp={styles.hintBtnTxt}>Hint</GameButton>
            </View>
        </View >
    )
}

export default GameScreen

