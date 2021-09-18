import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import { Colors } from '../Utils/Colors'
import { useGlobal } from '../context'
import { Ionicons } from '@expo/vector-icons';
import GameButton from '../components/GameButton';

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const SelectionScreen = () => {
    const { theme, changeTheme } = useGlobal();
    const styles = StyleSheet.create({
        selectionContainer: {
            flex: 1,
            paddingTop: phoneHeight * .05,
            backgroundColor: Colors[theme].primary,
        },
        imageHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        img: {
            width: phoneHeight * .14,
            height: phoneHeight * .14,
            marginLeft: -phoneWidth / 20
        },
        selectionHeading: {
            color: 'white',
            fontSize: phoneWidth / 24,
            letterSpacing: 0.8,
            textAlign: 'center',
            marginBottom: phoneHeight / 15,
            marginTop: phoneHeight / 20

        },
        horizontalContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        verticleContainer: {
            alignItems: 'center',
            marginTop: phoneHeight / 20
        },
        wordButton: {
            marginVertical: phoneHeight / 60
        },
        playButtonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 2,
            position: 'absolute',
            bottom: phoneHeight - (phoneHeight * .98),
            width: phoneWidth
        },
        playButton: {
            backgroundColor: Colors[theme].play,
            overflow: 'hidden',
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            width: '90%',
            alignSelf: 'center',
            margin: 0
        },
        playButtonText: {
            textAlign: 'center',
            fontSize: phoneWidth / 25
        }

    })


    const levels = ['Easy', 'Medium', 'Hard']
    const numberOfLetters = [3, 4, 5, 6]
    const [difficulty, setDifficulty] = useState('Easy')
    const [letters, setLetters] = useState(4)
    const selectDifficulty = (level) => {
        setDifficulty(level)
    }

    const setNumberOfLetters = (letters) => {
        console.log(letters)
        setLetters(letters)
    }

    return (
        <View style={styles.selectionContainer}>
            <View style={styles.imageHeader}>
                <Ionicons style={styles.backIcon} name="arrow-back" size={phoneWidth / 18} color={Colors.orange} />
                <Image style={styles.img} source={require('../assets/Logo.png')} />
                <Text></Text>
            </View>
            <Text style={styles.selectionHeading}>Select Game Type</Text>
            <View style={styles.horizontalContainer}>

                {levels.map((level) => {
                    return <GameButton propStyle={level === difficulty && { backgroundColor: Colors.orange }} param={level} func={selectDifficulty} key={level}>{level}</GameButton>
                })}

            </View>
            <View style={styles.verticleContainer}>


                {numberOfLetters.map((letter) => {

                    let buttonStyle = letter === letters && { backgroundColor: Colors.orange }
                    buttonStyle = { ...buttonStyle, ...styles.wordButton }

                    return <GameButton key={letter} propStyle={buttonStyle} param={letter} func={setNumberOfLetters}>{letter} Words</GameButton>

                })}
            </View>
            <View style={styles.playButtonContainer}>
                <GameButton btnTextProp={styles.playButtonText} propStyle={styles.playButton}>PLAY</GameButton>
            </View>
        </View >
    )
}

export default SelectionScreen


