import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import GameButton from '../components/GameButton'
import { useGlobal } from '../context'
import { Colors } from '../Utils/Colors'

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const HomeScreen = () => {
    const { theme, changeTheme } = useGlobal();



    const styles = StyleSheet.create({
        homeContainer: {
            paddingTop: phoneHeight * .12,
            flex: 1,
            alignItems: 'center',
            backgroundColor: Colors[theme].primary
        },
        img: {
            marginBottom: phoneHeight / 15,
            width: phoneHeight * .15,
            height: phoneHeight * .15,
        },
        heading: {
            fontSize: phoneHeight / 20,
            letterSpacing: 1,
        },
        headingText: {
            color: 'white',
        },
        headingText2: {
            color: Colors.orange
        },
        desc: {
            color: 'white',
            fontSize: phoneWidth / 30,
            fontStyle: 'italic',
            marginTop: phoneHeight / 50,
            letterSpacing: phoneWidth / 260
        },
        btnContainer: {
            marginTop: Dimensions.get('window').height / 8,
        },
        button: {
            marginBottom: phoneHeight / 20,
        },
        ruleBtn: {
            color: 'white',
            fontSize: phoneWidth / 30,
            letterSpacing: 1,
        },
        ruleBtnContainer: {
            borderBottomColor: Colors.orange,
            paddingBottom: 6,
            borderBottomWidth: 0.5
        }
    })




    return (
        <View style={styles.homeContainer}>
            <Image style={styles.img} source={require('../assets/Logo.png')} />
            <Text style={{ ...styles.headingText, ...styles.heading }}>Cow{' '}
                <Text style={styles.headingText2}>Bull</Text>
            </Text>
            <Text style={styles.desc}> Match me if you can </Text>
            <View style={styles.btnContainer}>
                <GameButton propStyle={styles.button}>
                    Let's Play
                    <Text style={{ color: Colors.orange }}>{' '}Word</Text>
                </GameButton>
                <GameButton propStyle={styles.button}>
                    Let's Play
                    <Text style={{ color: Colors.orange }}>{' '}Number</Text>
                </GameButton>
            </View>
            <TouchableOpacity style={styles.ruleBtnContainer} activeOpacity={0.8}>
                <Text style={styles.ruleBtn}>How to Play?</Text>
            </TouchableOpacity>
        </View>
    )
}


export default HomeScreen


