import React from 'react'
import { Image, StyleSheet, View, Dimensions } from 'react-native'
import { Colors, commonStyles, Screens } from '../Utils/Configs'
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { useGlobal } from '../context';

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const Header = (props) => {

    const { theme, changeTheme } = useGlobal()

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


    return (
        <View style={{ ...styles.header, ...props.propHeader }}>
            <Ionicons onPress={props.func ? props.func : () => props.navigation.goBack()} name="arrow-back" size={phoneWidth / 18} color={Colors.orange} />
            <Image style={{ ...styles.img, ...props.propHeaderImg }} source={require('../assets/Logo.png')} />
            <Fontisto onPress={() => changeTheme()} style={styles.toggleIcon} name={`toggle-${theme === 'black' ? 'on' : 'off'}`} size={phoneWidth / 15} color="white" />
        </View>
    )
}

export default Header

