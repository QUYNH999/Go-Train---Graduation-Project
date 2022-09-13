import React, {Component} from "react";
import {Image, LayoutAnimation, NativeModules, View} from "react-native";
import {openingScreenStyles} from "./openingScreenStyles";
import Navigator from "../navigator/Navigator";

const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)

export default class OpeningScreen extends Component {
    state = {
        height: 1,
        width: 1,
        isOpeningFinished: false,
    }

    componentDidMount() {
        setTimeout(() => {
            LayoutAnimation.spring()
            this.setState({
                height: this.state.height + 300,
                width: this.state.width + 300
            })
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.height === 301) {
            setTimeout(() => {
                this.setState({
                    isOpeningFinished: true
                })
            }, 1000)
        }
    }

    render() {
        return(
                this.state.isOpeningFinished
                ?
                <Navigator/>
                :
                <View style={openingScreenStyles.container}>
                    <Image
                        source={require('../../assets/image/openingImage.jpg')}
                        style={{
                            height: this.state.height,
                            width: this.state.width
                        }}
                    />
                </View>
        )
    }
}
