import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import GameButton from '../components/GameButton'
import { useGlobal } from '../context'
import { AdBannerTypes, Colors, commonStyles, gameVoice, Screens } from '../Utils/Configs'
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { GAME } from '../Utils/Configs'
import AdBanner from '../components/AdBanner'

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height
const HomeScreen = (props) => {
    const { navigation } = props
    const { theme, changeTheme, initializeGame, setLoading, playVoice, shouldVoicePlay, setShouldVoicePlay, setPlayBg } = useGlobal();
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
            borderBottomWidth: 1
        },
        ruleBtnContainer: {
            borderBottomColor: Colors.orange,
            paddingBottom: 6,
            borderBottomWidth: 0.5
        },
        iconContainer: {
            flexDirection: 'row',
            marginTop: -phoneHeight * 0.06,
            width: phoneWidth * 0.88,
            justifyContent: 'space-between',
        }

    })

    const playGame = (gameType) => {
        // console.log(`The game type is ${gameType}`)
        if (gameType === 'word') {
            shouldVoicePlay && playVoice(gameVoice.PLAY_WORD)
            initializeGame({ gameType: GAME.type.WORD })
        } else if (gameType === 'number') {
            shouldVoicePlay && playVoice(gameVoice.PLAY_NUMBER)
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
        shouldVoicePlay && playVoice(gameVoice.SHOW_RULES)
        props.navigation.navigate(Screens.RULES)
    }

    const themeHandler = () => {
        console.log(shouldVoicePlay)
        if (shouldVoicePlay) {
            theme === 'blue' ? playVoice(gameVoice.DARK_THEME) : playVoice(gameVoice.LIGHT_THEME)
        }
        changeTheme()
    }

    const voiceMuteHandler = () => {
        setShouldVoicePlay(preVal => !preVal)
        setPlayBg(preVal => !preVal)
    }


    return (
        <View style={styles.homeContainer}>
            <View style={styles.iconContainer}>
                {/* {shouldVoicePlay ? <GiSoundOn onPress={voiceMuteHandler} style={styles.sound} name="sound" size={phoneWidth * 0.06} color={Colors.orange} />
                    :
                    <GiSoundOff onPress={voiceMuteHandler} style={styles.sound} name="sound-mute" size={phoneWidth * 0.07} color={Colors.gray} />} */}

                {/* <GiSoundOn /> */}

                {shouldVoicePlay ? <AntDesign onPress={voiceMuteHandler} name="sound" size={phoneWidth * 0.07} color={Colors.orange} />
                    :
                    <AntDesign onPress={voiceMuteHandler} name="sound" size={phoneWidth * 0.07} color={Colors.gray} />}


                <Ionicons onPress={themeHandler} style={styles.theme} name={theme === "black" ? "sunny" : "moon-sharp"} size={phoneWidth * 0.07} color={Colors.orange} />
            </View>

            <View>
                <TouchableOpacity onPress={showGameRules}>
                    <Image style={styles.img} source={require('../assets/Logo.png')} />
                </TouchableOpacity>

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


