import React from 'react'
import { StyleSheet, Dimensions, Text, ScrollView, View, Image, BackHandler, Platform } from 'react-native'
import Header from '../components/Header'
import { useGlobal } from '../context'
import { AdBannerTypes, Colors, commonStyles, gameRulesText } from '../Utils/Configs'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GameButton from '../components/GameButton'
import AdBanner from '../components/AdBanner'

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height

const GameRulesScreen = (props) => {
    const { theme } = useGlobal()
    const styles = StyleSheet.create({
        GameRulesContainer: commonStyles(theme, phoneHeight, phoneWidth).common.containerStyle,
        rulesContainer: {
            // backgroundColor: 'blue'
        },
        heading: {
            color: Colors.lightGreen,
            textAlign: 'center',
            fontSize: phoneWidth * 0.05,
            marginVertical: phoneHeight * 0.03,
            fontStyle: 'italic',
            letterSpacing: phoneWidth * 0.003
        },
        img: {
            width: phoneHeight * .07,
            height: phoneHeight * .07,
        },
        rulePoints: {
            marginLeft: phoneWidth * 0.07,
            marginRight: phoneWidth * 0.07,

        },
        rulePoint: {
            flexDirection: 'row',
            marginBottom: phoneHeight * 0.02,

        },
        ruleText: {
            color: 'white',
            marginLeft: phoneWidth * 0.02,
            flex: 1,
            fontSize: phoneWidth * 0.038,
            letterSpacing: phoneWidth * 0.001,
            lineHeight: phoneHeight * 0.028
        },
        exampleContainer: {
            marginTop: phoneHeight * 0.02,
            marginBottom: phoneHeight * 0.04,
            marginLeft: phoneWidth * 0.08
        },
        exampleHeading: {
            color: Colors.orange,
            fontSize: phoneWidth * 0.045,
            letterSpacing: phoneWidth * 0.001,
            fontStyle: 'italic'
        },
        exampleTextContainer: {
            flexDirection: 'row',
            marginTop: phoneHeight * 0.02
        },
        exampleText: {
            color: 'white',
            fontSize: phoneWidth * 0.037,
            marginRight: phoneWidth * 0.09,
            letterSpacing: phoneWidth * 0.002
        },
        highlightText: {
            color: Colors.orange
        },
        resultText: {
            color: Colors.orange,
            marginLeft: phoneWidth * 0.09
        },
        specialText: {
            color: Colors.lightBlue,
            marginRight: phoneWidth * 0.01,
            marginTop: phoneHeight * 0.03,
            fontSize: phoneWidth * 0.032,
            fontStyle: 'italic'
        },
        btn: {
            backgroundColor: Colors[theme].light,
            marginVertical: phoneHeight * 0.02
        },
        btnTxt: {
            textAlign: 'center',
            letterSpacing: phoneWidth * 0.001,
            color: Colors.lightGreen
        },
        ad: {
            marginBottom: phoneHeight * 0.05,
            marginTop: -phoneHeight * 0.02,
        }

    })

    return (
        <View style={styles.GameRulesContainer}>
            <Header propHeaderImg={styles.img} navigation={props.navigation} />
            <ScrollView style={styles.rulesContainer}>
                <Text style={styles.heading}>How to play?</Text>
                <ScrollView style={styles.rulePoints}>
                    {/* {gameRulesText.map((rule, index) => {
                        return (
                            <View key={index} style={styles.rulePoint}>
                                <MaterialCommunityIcons name="hand-pointing-right" size={phoneWidth * 0.07} color="orange" />
                                <Text style={styles.ruleText}>{rule}</Text>
                            </View>
                        )
                    })} */}

                    <View style={styles.exampleContainer}>
                        <Text style={styles.exampleHeading}>Example 1</Text>
                        <View style={styles.exampleTextContainer}>
                            <Text style={styles.exampleText}>Hidden Word  </Text>
                            <Text style={styles.exampleText}> C A
                                <Text style={styles.highlightText}> K </Text>

                                E</Text>

                        </View>


                        <View style={styles.exampleTextContainer}>
                            <Text style={styles.exampleText}>Guessed Word</Text>
                            <Text style={styles.highlightText}> K
                                <Text style={styles.exampleText}> I
                                    N
                                    G</Text>
                            </Text>
                            <Text style={styles.resultText}>1 C (Cow)</Text>
                        </View>

                    </View>




                    <View style={styles.exampleContainer}>
                        <Text style={styles.exampleHeading}>Example 2</Text>
                        <View style={styles.exampleTextContainer}>
                            <Text style={styles.exampleText}>Hidden Word  </Text>

                            <Text style={styles.highlightText}> C A
                                <Text style={styles.exampleText}> R
                                    E</Text>
                            </Text>

                        </View>


                        <View style={styles.exampleTextContainer}>
                            <Text style={styles.exampleText}>Guessed Word</Text>
                            <Text style={styles.highlightText}> C A
                                <Text style={styles.exampleText}> L
                                    F</Text>
                            </Text>
                            <Text style={styles.resultText}>2 B (Bull)</Text>
                        </View>

                    </View>




                    <View style={styles.exampleContainer}>
                        <Text style={styles.exampleHeading}>Example 3</Text>
                        <View style={styles.exampleTextContainer}>
                            <Text style={styles.exampleText}>Hidden Word  </Text>

                            <Text style={styles.exampleText}> C A K E
                            </Text>

                        </View>


                        <View style={styles.exampleTextContainer}>
                            <Text style={styles.exampleText}>Guessed Word</Text>


                            <Text style={styles.exampleText}>S H U T</Text>
                            <Text style={styles.highlightText}>0 C, 0 B</Text>

                        </View>
                        <Text style={{ ...styles.specialText }}>Same examples apply for Number game as well</Text>
                    </View>



                    <AdBanner adStyle={styles.ad} bannerStyle={AdBannerTypes.smartBannerPortrait} />

                    {gameRulesText.map((rule, index) => {
                        return (
                            <View key={index} style={styles.rulePoint}>
                                <MaterialCommunityIcons name="hand-pointing-right" size={phoneWidth * 0.07} color="orange" />
                                <Text style={styles.ruleText}>{rule}</Text>
                            </View>
                        )
                    })}


                    <GameButton func={() => props.navigation.goBack()} propStyle={{ ...styles.revealBtn, ...styles.btn }} btnTextProp={styles.btnTxt}>Back To Game</GameButton>


                </ScrollView>


            </ScrollView>

        </View >
    )
}

export default GameRulesScreen

