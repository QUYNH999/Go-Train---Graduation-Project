import React, {Component} from "react";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {profileInfoStyles} from "./profileInfoStyles";
import Icon from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import {AVATAR_MANAGEMENT, PAYMENT, SETTING} from "../../../../navigator/definition/navigatorDefinitions";

class ProfileInfo extends Component {

    render() {
        return (
            <View style={profileInfoStyles.container}>
                {this._renderCoverPhoto()}
                {this._renderAvatarCircle()}
                {this._renderDetailBoard()}
            </View>
        )
    }

    _renderCoverPhoto = () => (
        <View style={profileInfoStyles.welcomeBackground}>
            <ImageBackground
                source={require('../image/trainCoverPhoto.jpg')}
                resizeMode="stretch"
                style={profileInfoStyles.coverPhoto}
            />
        </View>
    )

    _renderAvatarCircle = () => (
        <View style={profileInfoStyles.avatarCircleRim}>
            <TouchableOpacity
                style={profileInfoStyles.avatarCircleCore}
                onPress={() => this.props.navigation.navigate(AVATAR_MANAGEMENT)}
            >
                {this._renderUserAvatar()}
            </TouchableOpacity>
        </View>
    )

    _renderUserAvatar = () => (
        this.props.appReducer.account.avatarURL == ''
            ?
            <Icon name='add-a-photo' color='#555555' size={60}/>
            :
            <View style={{height: '100%', width: '100%', borderRadius: 100, borderColor: '#C2C2C2', borderWidth: 3}}>
                <Image
                    source={{uri: this.props.appReducer.account.avatarURL}}
                    style={{flex: 1, borderRadius: 100}}
                />
            </View>

    )

    _renderDetailBoard = () => {
        const {fullname, phoneNumber} = this.props.appReducer.account
        return (
            <View style={profileInfoStyles.detailBoard}>
                {this._renderInfoItem('badge', 'Name', fullname)}
                {this._renderInfoItem('phone-iphone', 'Phone number', phoneNumber)}
                {this._renderInfoItem('payments', 'Payment method')}
                {this._renderInfoItem('settings', 'Setting')}
            </View>
        )
    }

    _renderInfoItem = (iconName, infoTitle, info = null) => (
        <TouchableOpacity
            style={profileInfoStyles.infoItemView}
            disabled={info !== null}
            onPress={() => {
                this.props.navigation.navigate(this._classifyInfoTitle(infoTitle))
            }}
        >
            <Icon name={iconName} size={35} color='#4E3F8A'/>
            <Text style={profileInfoStyles.infoItemText}>{infoTitle}</Text>
            {
                info &&
                <View style={profileInfoStyles.infoContent}>
                    <Text style={profileInfoStyles.infoContentText}> : {info}</Text>
                </View>
            }
        </TouchableOpacity>
    )

    _classifyInfoTitle = (infoTitle) => (infoTitle === 'Payment method') ? PAYMENT : SETTING
}

const mapStateToProps = ({appReducer}) => ({appReducer})

export default connect(mapStateToProps)(ProfileInfo)
