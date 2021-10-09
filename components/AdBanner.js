import React from 'react'
import { StyleSheet, Text, View, Dimensions, } from 'react-native'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';

let phoneWidth = Dimensions.get('window').width
let phoneHeight = Dimensions.get('window').height
const AdBanner = (props) => {
    const styles = StyleSheet.create({
        adBannerContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        ad: {
            marginTop: phoneHeight * 0.05,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
    return (
        <View style={styles.adBannerContainer}>
            <AdMobBanner
                style={{ ...styles.ad, ...props.adStyle }}
                bannerSize={props.bannerStyle}
                adUnitID="ca-app-pub-3940256099942544/6300978111"
                servePersonalizedAds
                onDidFailToReceiveAdWithError={() => console.log("Banner error")} />
        </View>
    )
}

export default AdBanner


