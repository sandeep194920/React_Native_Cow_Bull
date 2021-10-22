import React from 'react'
import { StyleSheet, Text, View, Dimensions, Platform, } from 'react-native'
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { AD_KEYS } from '../Utils/Configs';

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

                // prod ad below. Uncomment it for prod

                // adUnitID={Platform.OS === "ios" ? "ca-app-pub-7296629630933757/2926375308" : "ca-app-pub-7296629630933757/7382535185"}

                adUnitID={Platform.OS === "ios" ?
                    AD_KEYS.Ios.BANNER_ID :
                    AD_KEYS.Android.BANNER_ID}

                // prod ad above. Uncomment it for prod


                //test ad below. comment it for prod
                // adUnitID="ca-app-pub-3940256099942544/6300978111"
                //test ad above. comment it for prod

                servePersonalizedAds
                onDidFailToReceiveAdWithError={(e) => console.log(e)} />
        </View>
    )
}

export default AdBanner


