import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useGlobal } from '../context'
import { Colors } from '../Utils/Configs'

const Attempt = () => {

    let phoneWidth = Dimensions.get('window').width
    let phoneHeight = Dimensions.get('window').height

    const { theme } = useGlobal()

    const styles = StyleSheet.create({
        attempt: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'green',
            alignItems: 'center',
            marginVertical: phoneHeight * 0.015

        },
        attemptTextContainer: {
            flexDirection: 'row',
            // backgroundColor: 'grey',

        },
        attemptNumber: {
            marginRight: phoneWidth * 0.02,
            padding: phoneWidth * 0.02,
        },
        commonText: {
            color: 'white',
            fontSize: phoneWidth * .04
        },
        letter: {
            marginRight: phoneWidth * 0.025,
            backgroundColor: Colors[theme].light,
            borderRadius: 4,
            overflow: 'hidden',
            height: phoneWidth * 0.09, // for android
            lineHeight: phoneWidth * 0.09, // for ios
            width: phoneWidth * 0.09,
            textAlignVertical: 'center',
            textAlign: 'center',

        },
        result: {
            flexDirection: 'row'
        },
        orangeCol: {
            color: Colors.orange
        },
        bull: {
            color: Colors.lightBlue,
        },
        cow: {
            color: Colors.lightGreen
        }
    })

    const [letters, setLetters] = useState(['I', 'A', 'N', 'G', 'L', 'E'])

    return (
        <View style={styles.attempt}>
            <View style={styles.attemptTextContainer}>
                <Text style={{ ...styles.commonText, ...styles.attemptNumber }} >1.</Text>
                {letters.map((letter) => {
                    return (
                        <Text key={letter} style={{ ...styles.commonText, ...styles.letter }} >{letter}</Text>
                    )
                })}

            </View>
            <View style={styles.result}>
                <Text style={{ ...styles.commonText, ...styles.orangeCol }}>{' '}2
                    <Text style={styles.bull}> B{' '} </Text>
                </Text>
                <Text style={{ ...styles.commonText, ...styles.orangeCol }}>{' '}2
                    <Text style={styles.cow}> C{' '} </Text>
                </Text>
            </View>
        </View>
    )
}

export default Attempt

