import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native'
import { useGlobal } from '../context'
import { Colors } from '../Utils/Colors'

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const GameButton = (props) => {

    const { theme } = useGlobal()


    const styles = StyleSheet.create({
        button: {
            backgroundColor: Colors[theme].light,
            padding: phoneWidth / 15,
            paddingBottom: phoneHeight / 60,
            paddingTop: phoneHeight / 60,
            borderRadius: 100,
        },
        buttonText: {
            color: 'white',
            fontSize: phoneWidth / 28,
            letterSpacing: phoneWidth / 300
        }
    })

    return (
        <TouchableOpacity onPress={() => props.func(props.param)} activeOpacity={1} style={{ ...styles.button, ...props.propStyle }}>
            <Text style={{ ...styles.buttonText, ...props.btnTextProp }} >{props.children}</Text>
        </TouchableOpacity>
    )
}

export default GameButton


