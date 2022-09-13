import React, {useEffect} from "react";
import {TouchableOpacity, View} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {supportStyles} from "../../supportStyles";
import {callConnectingStyles} from "./callConnectingStyles";
import {DotIndicator} from 'react-native-indicators';
import KeepAwake from "react-native-keep-awake";

export const CallConnecting = ({phoneSound, goBackSupportScreen}: any) => {

    useEffect(playSound, []);

    function playSound() {
        phoneSound.play((isFinished: boolean) => {
            if (isFinished) {
                goBackSupportScreen();
            } else {
                console.error('Playback failed due to audio decoding errors');
            }
        });
    }

    return (
        <View style={[supportStyles.container, callConnectingStyles.container]}>
            <KeepAwake/>
            <View/>
            <View style={callConnectingStyles.phoneAndIndicatorView}>
                <View style={[callConnectingStyles.callingBox, {backgroundColor: '#0093E9'}]}>
                    <MaterialIcon name="phone-enabled" size={30}/>
                </View>
                <DotIndicator color='white' size={10}/>
            </View>
            <TouchableOpacity
                style={[callConnectingStyles.callingBox, {backgroundColor: '#EF4136'}]}
                onPress={goBackSupportScreen}
            >
                <MaterialIcon name="call-end" size={30}/>
            </TouchableOpacity>
        </View>
    )
}
