import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import GameButton from '../components/GameButton'
import { useGlobal } from '../context'
import { AdBannerTypes, Colors, commonStyles, gameSounds, Screens } from '../Utils/Configs'
import { Ionicons } from '@expo/vector-icons';
import { GAME } from '../Utils/Configs'
import { Audio } from 'expo-av';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';
import AdBanner from '../components/AdBanner'

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height
const HomeScreen = (props) => {
    const { navigation } = props
    const { theme, changeTheme, initializeGame, setLoading, sound, playSound } = useGlobal();
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
        },
        toggleIcon: {
            ...commonStyles(theme, phoneHeight, phoneWidth).common.iconStyle,
        },

    })

    const playGame = (gameType) => {
        // console.log(`The game type is ${gameType}`)
        if (gameType === 'word') {
            playSound(gameSounds.PLAY_WORD)
            initializeGame({ gameType: GAME.type.WORD })
        } else if (gameType === 'number') {
            playSound(gameSounds.PLAY_NUMBER)
            initializeGame({ gameType: GAME.type.NUMBER })
        } else {
            throw new Error('Invalid Game Type')
        }
        navigation.navigate(Screens.SELECTION)
    }
    useEffect(() => {
        setLoading(false)
    }, [])

    const showGameRules = () => {
        console.log("Here's the rules")
        playSound(gameSounds.SHOW_RULES)
        props.navigation.navigate(Screens.RULES)
    }

    const themeHandler = () => {
        theme === 'blue' ? playSound(gameSounds.DARK_THEME) : playSound(gameSounds.LIGHT_THEME)
        changeTheme()
    }

    return (
        <View style={styles.homeContainer}>
            <View>
                <TouchableOpacity onPress={showGameRules}>
                    <Image style={styles.img} source={require('../assets/Logo.png')} />
                </TouchableOpacity>
                {/* <Fontisto onPress={() => changeTheme()} style={styles.toggleIcon} name={`toggle-${theme === 'black' ? 'on' : 'off'}`} size={34} color="white" /> */}

                <Ionicons onPress={themeHandler} style={styles.toggleIcon} name={theme === "black" ? "sunny" : "moon-sharp"} size={phoneWidth * 0.07} color={Colors.orange} />

            </View>
            <Text style={{ ...styles.headingText, ...styles.heading }}>Cow{' '}
                <Text style={styles.headingText2}>Bull</Text>
            </Text>
            <Text style={styles.desc}> Match me if you can </Text>
            <View style={styles.btnContainer}>
                <GameButton func={() => { playGame('word') }} propStyle={styles.button}>
                    Let's Play
                    <Text style={{ color: Colors.orange }}>{' '}Word</Text>
                </GameButton>
                <GameButton func={() => { playGame('number') }} propStyle={styles.button}>
                    Let's Play
                    <Text style={{ color: Colors.orange }}>{' '}Number</Text>
                </GameButton>
            </View>
            <TouchableOpacity style={styles.ruleBtnContainer} activeOpacity={0.8}>
                <Text onPress={showGameRules} style={styles.ruleBtn}>How to Play?</Text>
            </TouchableOpacity>
            <AdBanner bannerStyle={AdBannerTypes.smartBannerPortrait} />
        </View>
    )
}


export default HomeScreen


