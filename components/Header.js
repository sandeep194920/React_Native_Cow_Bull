import React from 'react'
import { Image, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import { Colors, commonStyles, Screens } from '../Utils/Configs'
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { useGlobal } from '../context';
let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height
import { CommonActions } from '@react-navigation/native';
const Header = (props) => {
    const { theme, changeTheme, guessNextWord, isGuessNext } = useGlobal()

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

    return (
        <View style={{ ...styles.header, ...props.propHeader }}>
            <Ionicons onPress={props.func ? props.func : () => props.navigation.goBack()} name="arrow-back" size={phoneWidth * 0.06} color={Colors.orange} />
            <TouchableOpacity onPress={showGameRules}>
                <Image style={{ ...styles.img, ...props.propHeaderImg }} source={require('../assets/Logo.png')} />
            </TouchableOpacity>
            <Fontisto onPress={() => changeTheme()} style={styles.toggleIcon} name={`toggle-${theme === 'black' ? 'on' : 'off'}`} size={phoneWidth / 15} color="white" />
        </View>
    )
}

export default Header

