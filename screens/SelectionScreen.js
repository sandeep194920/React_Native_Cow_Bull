import React from 'react'
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import { Colors } from '../Utils/Colors'
import { useGlobal } from '../context'
import { Ionicons } from '@expo/vector-icons';
import GameButton from '../components/GameButton';

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const SelectionScreen = () => {
    const { theme, changeTheme } = useGlobal();
    console.log(phoneWidth)
    console.log(phoneHeight)
    const styles = StyleSheet.create({
        selectionContainer: {
            flex: 1,
            paddingTop: phoneHeight * .1,

            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: Colors[theme].primary,
        },
        imageHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        img: {
            width: phoneHeight * .1,
            height: phoneHeight * .1,
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
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        playButton: {
            backgroundColor: Colors.lightGreen,
            overflow: 'hidden',
            borderRadius: 0,
            marginTop: phoneHeight - (phoneHeight * .95),
            width: '90%',
        },
        playButtonText: {
            textAlign: 'center',
            fontSize: phoneWidth / 25
        }

    })


    return (
        <View style={styles.selectionContainer}>
            <View style={styles.imageHeader}>
                <Ionicons style={styles.backIcon} name="arrow-back" size={phoneWidth / 18} color={Colors.orange} />
                <Image style={styles.img} source={require('../assets/Logo.png')} />
                <Text></Text>
            </View>
            <Text style={styles.selectionHeading}>Select Game Type</Text>
            <View style={styles.horizontalContainer}>
                <GameButton>Easy</GameButton>
                <GameButton>Medium</GameButton>
                <GameButton>Hard</GameButton>
            </View>
            <View style={styles.verticleContainer}>
                <GameButton propStyle={styles.wordButton}>3 Words</GameButton>
                <GameButton propStyle={styles.wordButton}>4 Words</GameButton>
                <GameButton propStyle={styles.wordButton}>5 Words</GameButton>
                <GameButton propStyle={styles.wordButton}>6 Words</GameButton>
            </View>
            <View style={styles.playButtonContainer}>
                <GameButton btnTextProp={styles.playButtonText} propStyle={styles.playButton}>PLAY</GameButton>
            </View>
        </View>
    )
}

export default SelectionScreen


