import React, {Component} from "react";
import {loadingIndicatorStyles} from "./loadingIndicatorStyles";
import {View} from "react-native";
import {WaveIndicator} from "react-native-indicators";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default class LoadingIndicator extends Component{
    render() {
        return(
            <View style={loadingIndicatorStyles.container}>
                <View style={loadingIndicatorStyles.backgroundView}/>
                <WaveIndicator
                    waveMode='outline'
                    color='black'
                    size={80}
                    count={3}
                />
                <View style={{position: "absolute"}}>
                    <MaterialIcon
                        name='train'
                        size={30}
                    />
                </View>
            </View>
        )
    }
}
