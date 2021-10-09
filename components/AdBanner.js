import React from 'react'
import { StyleSheet, Text, View, Dimensions, Platform, } from 'react-native'
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

    let adUnit = Platform.OS === "ios" ? "ca-app-pub-7296629630933757/2926375308" : "ca-app-pub-7296629630933757/5957036786"

    return (
        <View style={styles.adBannerContainer}>
            <AdMobBanner
                style={{ ...styles.ad, ...props.adStyle }}
                bannerSize={props.bannerStyle}
                adUnitID={adUnit}
                servePersonalizedAds
                onDidFailToReceiveAdWithError={() => console.log("Banner error")} />
        </View>
    )
}

export default AdBanner


