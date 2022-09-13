import React, {Component} from "react";
import {
    AsyncStorage,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {forgetPasswordStyles} from "./forgetPasswordStyles";
import checkExistingUserAccount from "server/src/database/topic/userAccount/checkExistingUserAccount";
import createLocalPushNotification from "../../../common/utils/pushNotification/local/createLocalPushNotification";
import createLocalChannels from "../../../common/utils/pushNotification/local/createLocalChannels";
import {SUCCESSFUL_PASSWORD_RESET} from "./definition/forgetPasswordDefinitions";
import getCurrentDateTimeFromTimeServer from "server/src/api/topic/currentDateTime/getCurrentDateTimeFromTimeServer";
import saveNewPassword from "server/src/database/topic/password/saveNewPassword";
import {OTP_VERIFICATION} from "../../../navigator/definition/navigatorDefinitions";
import {connect} from "react-redux";
import closeScreenWhenLoggedIn from "../../../common/utils/navigation/closeScreenWhenLoggedIn";
import resetNavigation from "../../../common/utils/navigation/resetNavigation";

class ForgetPassword extends Component {

    state = {
        phoneNumber: '',
        isPhoneNumberExisting: undefined,
        isSubmitPressed: false,
        password: '',
        confirmPassword: '',
        isChangePressed: false,
    }

    _tabScreen = this.props.navigation.getState().routes[0].name

    componentDidMount() {
        createLocalChannels(SUCCESSFUL_PASSWORD_RESET)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.isPhoneNumberExisting == true){
            this.props.navigation.navigate(OTP_VERIFICATION, {
                    phoneNumber: this.state.phoneNumber
                }
            )
            this.setState({isPhoneNumberExisting: undefined})
        }
        closeScreenWhenLoggedIn(this.props.appReducer.isLogin,this.props.navigation, this._tabScreen)
    }

    render() {
        return(
            <KeyboardAvoidingView
                style={forgetPasswordStyles.container}
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={forgetPasswordStyles.container}>
                        {this._renderScreenType()}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        )
    }

    _renderScreenType = () => (
        (this.props.route?.params?.isOTPSuccessful != true)
            ?
            <View style={{flex: 1}}>
                {this._renderTitleBeforeOTPScreen()}
                {this._renderInputBoxBeforeOTPScreen()}
                {this._renderButtonBeforeOTPScreen()}
            </View>
            :
            <View style={{flex: 1}}>
                {this._renderTitleAfterOTPScreen()}
                {this._renderInputBoxAfterOTPScreen()}
                {this._renderButtonAfterOTPScreen()}
            </View>
    )

    _renderTitleBeforeOTPScreen = () => (
        <View style={forgetPasswordStyles.titleView}>
            <Text style={forgetPasswordStyles.introTitleText}>Forget Your Password ?</Text>
            <Text style={forgetPasswordStyles.mainTitleText}>Please Input Your Phone Number</Text>
        </View>
    )

    _renderInputBoxBeforeOTPScreen = () => (
        <View style={forgetPasswordStyles.inputView}>
            <View style={forgetPasswordStyles.inputBoxView}>
                <View style={forgetPasswordStyles.iconView}>
                    <Icon name='phone' size={25} color='#184785'/>
                </View>
                <View style={{flex: 10}}>
                    <TextInput
                        placeholderTextColor='#A0A0A0'
                        placeholder='Phone Number'
                        keyboardType='numeric'
                        maxLength={10}
                        value={this.state.phoneNumber}
                        onChangeText={(text) => {
                            this.setState({phoneNumber: text.replace(/[^0-9]/g, '')})
                        }}
                        onFocus={() => {
                            this.setState({
                                isSubmitPressed: false,
                                isPhoneNumberExisting: undefined
                            })
                        }}
                        style={forgetPasswordStyles.inputBoxContentView}
                    />
                    <Text style={forgetPasswordStyles.warningText}>
                        {this.state.isSubmitPressed && this._showPhoneNumberWarning()}
                    </Text>
                </View>
            </View>
        </View>
    )

    _renderButtonBeforeOTPScreen = () => {
        const isPhoneNumberFormatTrue = (this.state.phoneNumber.length == 10)
        return(
            <View style={forgetPasswordStyles.buttonView}>
                <TouchableOpacity
                    style={[forgetPasswordStyles.buttonSubmitBoxView, {opacity: isPhoneNumberFormatTrue ? 1 : 0.6}]}
                    disabled={!isPhoneNumberFormatTrue}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.setState({isSubmitPressed: true})
                        if (this._showPhoneNumberWarning() == false) {
                            checkExistingUserAccount(this.state.phoneNumber, this._setIsPhoneNumberExisting)
                        }
                    }}
                >
                    <Text style={forgetPasswordStyles.buttonBoxText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _showPhoneNumberWarning() {
        if (this.state.phoneNumber[0] != 0) {
            return 'Invalid phone number'
        }else if(this.state.isPhoneNumberExisting == false){
            return 'Phone number not registered'
        }
        return false
    }

    _setIsPhoneNumberExisting = (isPhoneNumberExistingResponse) => {
        this.setState({isPhoneNumberExisting: isPhoneNumberExistingResponse})
    }

    _renderTitleAfterOTPScreen = () => (
        <View style={forgetPasswordStyles.titleView}>
            <Text style={forgetPasswordStyles.mainTitleText}>Please Input New Password</Text>
        </View>
    )

    _renderInputBoxAfterOTPScreen = () => (
        <View style={forgetPasswordStyles.inputPasswordView}>
            <View style={{height: 0, width: 0}}><TextInput/></View>
            {this._renderInputPasswordBox(
                'vpn-key',
                'Password',
                this.state.password,
                (text) => this.setState({password: text})
            )}
            {this._renderInputPasswordBox(
                'confirmation-number',
                'Confirm Password',
                this.state.confirmPassword,
                (text) => this.setState({confirmPassword: text})
            )}
            <Text style={[forgetPasswordStyles.warningText, {marginLeft: 60}]}>
                {this.state.isChangePressed && this._arePasswordsMatching()}
            </Text>
        </View>
    )

    _renderInputPasswordBox = (iconName, placeholder, value, onChangeText) => (
        <View style={forgetPasswordStyles.inputPasswordBoxView}>
            <View style={forgetPasswordStyles.iconView}>
                <Icon name={iconName} size={25} color='#184785' style={{marginRight: 4}}/>
            </View>
            <View style={{flex: 12}}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor='#A0A0A0'
                    secureTextEntry={true}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => {
                        this.setState({ isChangePressed: false })
                    }}
                    style={forgetPasswordStyles.inputBoxContentView}
                />
            </View>
        </View>
    )

    _arePasswordsMatching = () => {
        if(this.state.confirmPassword !== this.state.password) {
            return 'Not matching passwords'
        }
        return true
    }

    _renderButtonAfterOTPScreen = () => {
        const isChangeNotTouchable = (this.state.password == '' || this.state.confirmPassword == '')
        return(
            <View style={forgetPasswordStyles.buttonView}>
                <TouchableOpacity
                    style={[forgetPasswordStyles.buttonChangeBoxView, {opacity: isChangeNotTouchable ? 0.6 : 1}]}
                    disabled={isChangeNotTouchable}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.setState({ isChangePressed: true })
                        if(this._arePasswordsMatching() == true){
                            saveNewPassword(
                                this.state.phoneNumber,
                                this.state.password,
                                this._createPushNotification,
                                this._storeNewAccount
                            )
                        }
                    }}
                >
                    <Text style={forgetPasswordStyles.buttonBoxText}>Change</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _storeNewAccount = async (newPassword) => {
        try {
            await AsyncStorage.setItem('@account', JSON.stringify({
                phoneNumber: this.state.phoneNumber,
                password: newPassword
            }))
            this.setState({
                phoneNumber: '',
                isChangePressed: false
            })
            resetNavigation(this.props.navigation, this._tabScreen)
        }catch (error) {
            console.error(error)
        }
    }

    _createPushNotification = async () => {
        const currentDateTime = await getCurrentDateTimeFromTimeServer()
        createLocalPushNotification(
            SUCCESSFUL_PASSWORD_RESET,
            'Successful password reset',
            'You have reset password successfully',
            currentDateTime,
        )
    }
}

const mapStateToProps = ({appReducer}) => ({appReducer})

export default connect(mapStateToProps)(ForgetPassword)
