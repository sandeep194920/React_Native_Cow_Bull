import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useGlobal } from '../context'
import { Colors } from '../Utils/Configs'

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const Error = () => {
    const { errorMsg } = useGlobal();
    const styles = StyleSheet.create({
        errorContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: phoneWidth * 0.05,
            marginRight: phoneWidth * 0.05,
        },
        error: {
            color: Colors.error,
            fontSize: phoneWidth * 0.04,
            marginTop: phoneHeight * 0.04
        }
    })

    return (
        <View style={styles.errorContainer}>
            <Text style={styles.error}>{errorMsg}</Text>
        </View>
    )
}

export default Error

