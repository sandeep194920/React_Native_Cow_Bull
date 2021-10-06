import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Colors, commonStyles, GAME, Screens } from '../Utils/Configs'
import { useGlobal } from '../context'
import GameButton from '../components/GameButton';
import Header from '../components/Header';
import { computerWord, computerNumber } from '../GameLogic/computerChoice';

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const SelectionScreen = (props) => {
    const { navigation } = props
    const { theme, game, initializeGame, GameAttempts, setComputerChoice } = useGlobal();
    const styles = StyleSheet.create({
        selectionContainer: commonStyles(theme, phoneHeight, phoneWidth).common.containerStyle,
        header: commonStyles(theme, phoneHeight, phoneWidth).common.header,
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
            justifyContent: 'space-evenly',
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
        },
        gameType: {
            color: Colors.orange
        }
    })

    const levels = ['Easy', 'Medium', 'Hard']
    const numberOfLetters = [3, 4, 5, 6]

    const selectDifficulty = (level) => {
        initializeGame({ difficulty: level.toUpperCase() })
    }
    const setNumberOfLetters = (letters) => {
        initializeGame({ letters })
    }
    const playGame = () => {
        // game logic where computer generates a word/number and remembers it

        // console.log(`The letters are ${game.letters} and the level is ${game.difficulty} and the game type is ${game.gameType}`)
        // console.log(GameAttempts[game.letters][game.difficulty].chances)
        let compChoice = ''
        if (game.gameType === GAME.type.NUMBER) {
            compChoice = computerNumber(game.letters)
            console.log(`The comp number is ${compChoice}`)
        } else if (game.gameType === GAME.type.WORD) {
            compChoice = computerWord(game.letters)
            console.log(`The comp word is ${compChoice}`)
        }
        setComputerChoice(compChoice)
        // navigate to game screen
        navigation.navigate(Screens.GAME)
    }

    return (
        <View style={styles.selectionContainer}>
            <Header navigation={props.navigation} />
            <Text style={styles.selectionHeading}>Select
                <Text style={styles.gameType}> {game.gameType[0].toUpperCase()}{game.gameType.slice(1).toLowerCase()} </Text>

                Game Type</Text>
            <View style={styles.horizontalContainer}>

                {levels.map((level) => {
                    return <GameButton propStyle={level.toUpperCase() === game.difficulty && { backgroundColor: Colors.orange }} param={level} func={selectDifficulty} key={level}>{level}</GameButton>
                })}

            </View>
            <View style={styles.verticleContainer}>
                {numberOfLetters.map((letter) => {
                    let buttonStyle = letter === game.letters && { backgroundColor: Colors.orange }
                    buttonStyle = { ...buttonStyle, ...styles.wordButton }

                    return <GameButton key={letter} propStyle={buttonStyle} param={letter} func={setNumberOfLetters}>{letter} Letters</GameButton>

                })}
            </View>
            <View style={styles.playButtonContainer}>
                <GameButton func={playGame} btnTextProp={styles.playButtonText} propStyle={styles.playButton}>PLAY</GameButton>
            </View>
        </View >
    )
}

export default SelectionScreen


