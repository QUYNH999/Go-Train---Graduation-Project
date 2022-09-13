import React, {Component} from "react";
import {TouchableOpacity, View} from "react-native";
import RtcEngine, {ChannelProfile, ClientRole, RtcLocalView, RtcRemoteView, VideoRenderMode} from "react-native-agora";
import {CameraCapturerConfiguration} from "react-native-agora/src/common/Classes";
import {CameraCaptureOutputPreference, CameraDirection} from "react-native-agora/src/common/Enums";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {callRoomStyles} from "./callRoomStyles";
import {CallConnecting} from "./callConnecting/CallConnecting";
import {supportStyles} from "../supportStyles";
// @ts-ignore
import getCallCenterStatus from "server/src/database/topic/callCenter/getCallCenterStatus";
// @ts-ignore
import updateCallCenterStatus from "server/src/database/topic/callCenter/updateCallCenterStatus";
// @ts-ignore
import CallSetupSuite from "server/src/api/topic/callCenter/CallSetupSuite";
import {CALL_CONNECTED, CALL_CONNECTING, SLEEPING} from "./definition/callRoomDefinitions";
import loadPhoneRingFile from "./utils/loadPhoneRingFile";
import KeepAwake from "react-native-keep-awake";

let phoneSound = loadPhoneRingFile();

interface State {
    callCenterStatus: any;
    isFrontCamera: boolean;
    isLocalVideoMuted: boolean;
    isLocalAudioMuted: boolean;
    isRemoteVideoMuted: boolean;
    isRemoteAudioMuted: boolean;
    isJoinSuccessful: boolean;
    peerId: any;
}

export default class CallRoom extends Component<any, State> {

    _engine?: RtcEngine;
    _callSetupSuite: CallSetupSuite;

    state = {
        callCenterStatus: undefined,
        isFrontCamera: true,
        isLocalVideoMuted: this.props.route.params.isAudioCall,
        isLocalAudioMuted: false,
        isRemoteVideoMuted: false,
        isRemoteAudioMuted: false,
        isJoinSuccessful: false,
        peerId: undefined,
    };

    componentDidMount() {
        this._preparePhoneRingSound();
        this._prepareCalling().then(() => {});
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<State>) {
        this._startOrEndCall(prevState);
        this._pauseSoundAfterStartCall(prevState);
    }

    async componentWillUnmount() {
        this._pauseSound();
        await this._leaveCallChannel();
        if(this.state.callCenterStatus !== SLEEPING){
            await updateCallCenterStatus(SLEEPING);
        }
    }

    render() {
        switch (this.state.callCenterStatus) {
            // @ts-ignore
            case CALL_CONNECTED: return (
                <View style={supportStyles.container}>
                    <KeepAwake/>
                    {this._renderHandleCameraAndMicButtons()}
                    {this._renderRemoteView()}
                    {this._renderSwitchCameraAndEndCallButtons()}
                </View>
            );
            // @ts-ignore
            case CALL_CONNECTING: return (
                <CallConnecting
                    phoneSound={phoneSound}
                    goBackSupportScreen={this._goBackSupportScreen}
                />
            );
            default: return null;
        }
    }

    _preparePhoneRingSound = () => {
        phoneSound.setVolume(1);
        return phoneSound.release;
    }

    _prepareCalling = async () => {
        await updateCallCenterStatus(CALL_CONNECTING);
        getCallCenterStatus(this._setCallCenterStatus);
        this._callSetupSuite = this.props.route.params.callSetupSuite

        this._engine = await RtcEngine.create(this._callSetupSuite.appId);
        await this._engine.enableVideo();
        await this._engine?.setChannelProfile(ChannelProfile.LiveBroadcasting);
        await this._engine?.setClientRole(ClientRole.Broadcaster);
        await this._engine?.muteLocalVideoStream(this.state.isLocalVideoMuted)

        this._addEventListeners()
    };

    _addEventListeners = () => {
        this._engine?.addListener('Warning', (warn) => {
            console.warn('Warning', warn);
        });

        this._engine?.addListener('Error', (err) => {
            console.error('Error', err);
        });

        this._engine?.addListener('UserJoined', (joinedPeerId) => {
            // If new user
            // @ts-ignore
            if (this.state.peerId == undefined) {
                // Add peer ID to state array
                this.setState({peerId: joinedPeerId});
            }
        });

        // If Local user joins RTC channel
        this._engine?.addListener('JoinChannelSuccess', () => {
            this.setState({isJoinSuccessful: true});
        });

        this._engine?.addListener('UserMuteVideo', () => {
            this.setState({isRemoteVideoMuted: !this.state.isRemoteVideoMuted})
        });

        this._engine?.addListener('UserMuteAudio', () => {
            this.setState({isRemoteAudioMuted: !this.state.isRemoteAudioMuted})
        });
    }

    _setCallCenterStatus = (statusResponse: string) => {
        this.setState({callCenterStatus: statusResponse})
    }

    _startOrEndCall = (prevState: State) => {
        if (this.state.callCenterStatus !== prevState.callCenterStatus) {
            if (this.state.callCenterStatus === CALL_CONNECTED) {
                this._startCall().then(() => {});
            }
            if (this.state.callCenterStatus === SLEEPING) {
                this._endCall().then(() => {});
            }
        }
    }

    _pauseSoundAfterStartCall = (prevState: State) => {
        if (this.state.callCenterStatus !== prevState.callCenterStatus
            && this.state.callCenterStatus === CALL_CONNECTED
        ) {
            this._pauseSound();
        }
    }

    _muteLocalVideo = () => {
        this.setState(
            {isLocalVideoMuted: !this.state.isLocalVideoMuted},
            async () => {
                await this._engine?.muteLocalVideoStream(this.state.isLocalVideoMuted)
            }
        )
    }

    _renderHandleCameraAndMicButtons = () => (
        <View style={callRoomStyles.buttonHolder}>
            <TouchableOpacity style={callRoomStyles.button} onPress={this._muteLocalVideo}>
                {this._renderIcon(this.state.isLocalVideoMuted ? "videocam-off" : "videocam")}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.muteLocalAudio} style={callRoomStyles.button}>
                {this._renderIcon(this.state.isLocalAudioMuted ? "mic-off" : "mic")}
            </TouchableOpacity>
        </View>
    )

    _renderRemoteView = () => (
        <View style={[callRoomStyles.remoteView, {backgroundColor: 'black'}]}>
            {this._renderMicStatus()}
            {
                this.state.isRemoteVideoMuted
                    ?
                    <MaterialIcon name="voice-over-off" size={100} color="white"/>
                    :
                    (
                        this.state.peerId != undefined
                            ?
                            <RtcRemoteView.SurfaceView
                                style={callRoomStyles.remoteView}
                                uid={this.state.peerId}
                                channelId={this._callSetupSuite.channelName}
                                renderMode={VideoRenderMode.Hidden}
                            />
                            :
                            <MaterialIcon name="cloud-off" size={100} color="white"/>
                    )
            }
            {this._renderLocalVideo()}
        </View>
    )

    _renderMicStatus = () => (
        this.state.peerId != undefined
        &&
        <View style={callRoomStyles.micStatusView}>
            <MaterialIcon
                name={this.state.isRemoteAudioMuted ? "mic-off" : "mic"}
                size={50}
                color="white"
            />
        </View>
    )

    _renderLocalVideo = () => {
        if(this.state.isLocalVideoMuted){
            return (
                <View style={[callRoomStyles.localView, {backgroundColor: '#1B1C32'}]}>
                    <MaterialIcon name="person" size={50} color="white"/>
                </View>
            )
        }
        return (
            this.state.isJoinSuccessful
                ?
                <RtcLocalView.SurfaceView
                    style={callRoomStyles.localView}
                    channelId={this._callSetupSuite.channelName}
                    renderMode={VideoRenderMode.Hidden}
                    zOrderMediaOverlay={true}
                />
                :
                <View style={[callRoomStyles.localView, {backgroundColor: '#1B1C32'}]}>
                    <MaterialIcon name="cloud-off" size={50} color="white"/>
                </View>
        )
    }

    _renderSwitchCameraAndEndCallButtons = () => (
        <View style={callRoomStyles.buttonHolder}>
            <TouchableOpacity onPress={this.switchCamera} style={[callRoomStyles.button, {backgroundColor: '#30D058'}]}>
                {this._renderIcon("flip-camera-ios")}
            </TouchableOpacity>
            <TouchableOpacity onPress={this._endCall} style={[callRoomStyles.button, {backgroundColor: '#EF4136'}]}>
                {this._renderIcon("call-end")}
            </TouchableOpacity>
        </View>
    )

    switchCamera = async () => {
        this.setState(
            {isFrontCamera: !this.state.isFrontCamera},
            async () => {
                await this._engine?.setCameraCapturerConfiguration(new CameraCapturerConfiguration({
                    preference: CameraCaptureOutputPreference.Auto,
                    cameraDirection: this.state.isFrontCamera ? CameraDirection.Front : CameraDirection.Rear
                }))
            }
        )
    };

    _startCall = async () => {
        await this._engine?.joinChannel(this._callSetupSuite.agoraToken,
            this._callSetupSuite.channelName,
            null,
            0
        );
    };

    _endCall = async () => {
        await this._goBackSupportScreen();
        this.setState({peerId: undefined, isJoinSuccessful: false});
    };

    muteLocalAudio = () => {
        this.setState(
            {isLocalAudioMuted: !this.state.isLocalAudioMuted},
            async () => {
                await this._engine?.muteLocalAudioStream(this.state.isLocalAudioMuted)
            }
        )
    }

    _renderIcon = (iconName: string) => <MaterialIcon name={iconName} size={30}/>

    _goBackSupportScreen = () => {
        this.props.navigation.goBack();
    }

    _pauseSound = () => {
        if (phoneSound.isPlaying()) {
            phoneSound.stop();
            phoneSound.release();
            phoneSound = loadPhoneRingFile();
        }
    }

    _leaveCallChannel = async () => {
        try {
            await this._engine?.leaveChannel();
        } catch (error) {
            console.error(error)
        }
    }
}
