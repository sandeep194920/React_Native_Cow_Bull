import React from 'react'
import { Image, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import { Colors, commonStyles, gameVoice, Screens } from '../Utils/Configs'
import { Ionicons } from '@expo/vector-icons';
import { useGlobal } from '../context';
let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height
const Header = (props) => {
    const { theme, changeTheme, guessNextWord, isGuessNext, playVoice, shouldVoicePlay } = useGlobal()

    const styles = StyleSheet.create({
        header: commonStyles(theme, phoneHeight, phoneWidth).common.header,
        img: {
            width: phoneHeight * .14,
            height: phoneHeight * .14,
        },
        toggleIcon: {
            ...commonStyles(theme, phoneHeight, phoneWidth).common.iconStyle,
            left: 2,
            bottom: 3,
            position: 'relative'
        },
        icon: {
            // backgroundColor: 'white',
            // padding: phoneWidth * 0.012
        }
    })

    const showGameRules = () => {
        // If the modal is open then it must first be closed and then the rules 
        // screen must appear
        if (isGuessNext) {
            console.log("Here's the  srules")
            guessNextWord(false)
        }
        props.navigation.navigate(Screens.RULES)
    }

    const themeHandler = () => {

        if (shouldVoicePlay) {
            theme === 'blue' ? playVoice(gameVoice.DARK_THEME) : playVoice(gameVoice.LIGHT_THEME)
        }
        changeTheme()
    }

    return (
        <View style={{ ...styles.header, ...props.propHeader }}>
            <Ionicons onPress={props.func ? props.func : () => props.navigation.goBack()} name="arrow-back" size={phoneWidth * 0.07} color={Colors.orange} style={styles.icon} />

            <TouchableOpacity onPress={showGameRules}>
                <Image style={{ ...styles.img, ...props.propHeaderImg }} source={require('../assets/Logo.png')} />
            </TouchableOpacity>

            <Ionicons onPress={themeHandler} style={styles.toggleIcon} name={theme === "black" ? "sunny" : "moon-sharp"} size={phoneWidth * 0.07} color={Colors.orange} />

        </View>
    )
}

export default Header

