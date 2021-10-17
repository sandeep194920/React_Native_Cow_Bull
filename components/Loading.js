import React from 'react'
import { StyleSheet, Text, View, Modal, Animated, Easing, Dimensions } from 'react-native'

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const Loading = () => {


    const styles = StyleSheet.create({
        loadingContainer: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            width: '90%',
            height: phoneHeight / 3,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: phoneHeight / 3,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    })




    let spinValue = new Animated.Value(0);

    // Set up animation 
    // to continuosly rotate we use loop
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 7000,

                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
        )
    ).start()

    // Interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        // <View style={{ backgroundColor: 'blue' }}>
        <Modal transparent>
            <View style={styles.loadingContainer}>
                <Animated.Image
                    resizeMode="contain"
                    style={{ transform: [{ rotate: spin }] }}
                    source={require('../assets/Logo.png')} />
            </View>
        </Modal>
        // </View>
    )
}

export default Loading

