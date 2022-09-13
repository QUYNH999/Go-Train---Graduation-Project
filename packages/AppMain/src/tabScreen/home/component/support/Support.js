import React, {Component} from "react";
import {Image, Platform, Text, TouchableOpacity, View} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {supportStyles} from "./supportStyles";
import {CALL_ROOM} from "../../../../navigator/definition/navigatorDefinitions";
import {AUDIO_CALL, SUPPORT_DESCRIPTION, VIDEO_CALL} from "./definition/supportDefinitions";
import getCallSetupSuite from "server/src/api/topic/callCenter/getCallSetupSuite";
import LoadingIndicator from "../../../../common/component/loadingIndicator/LoadingIndicator";
import requestCameraAndAudioPermission from "./utils/requestCameraAndAudioPermission";

export default class Support extends Component{
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!');
            });
        }
    }

    _callSetupSuite = {};

    state = {
        isLoading: true
    }

    async componentDidMount() {
        this._callSetupSuite = await getCallSetupSuite()
        this.setState({isLoading: false})
    }

    render() {
        return(
            <View style={supportStyles.container}>
                {this.state.isLoading && <LoadingIndicator/>}
                {this._renderAgentView()}
                {this._renderDescriptionView()}
                {this._renderCallButtonView()}
            </View>
        )
    }

    _renderAgentView = () => (
        <View style={supportStyles.agentView}>
            <Image source={require('./image/agent.png')} style={supportStyles.agentImage}/>
        </View>
    )

    _renderDescriptionView = () => (
        <View style={supportStyles.descriptionView}>
            <Text style={supportStyles.descriptionText}>{SUPPORT_DESCRIPTION}</Text>
        </View>
    )

    _renderCallButtonView = () => (
        <View style={supportStyles.callButtonView}>
            {this._renderButton("perm-phone-msg", '#38D951', AUDIO_CALL)}
            {this._renderButton("videocam", '#733DFC', VIDEO_CALL)}
        </View>
    )

    _renderButton = (iconName, iconColor, title) => (
        <TouchableOpacity
            style={supportStyles.callBox}
            onPress={() => {
                this.props.navigation.navigate(CALL_ROOM, {
                    isAudioCall: (title === AUDIO_CALL),
                    callSetupSuite: this._callSetupSuite
                })
            }}
        >
            <MaterialIcon name={iconName} size={50} color={iconColor}/>
            <Text style={{color: 'white'}}>{title}</Text>
        </TouchableOpacity>
    )
}
