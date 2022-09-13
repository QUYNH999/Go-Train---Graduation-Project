import React, {Component} from "react";
import {
    Alert,
    Animated,
    AsyncStorage,
    Dimensions,
    Image,
    ImageBackground,
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
import {registerStyles} from "./registerStyles";
import {loginStyles} from "../loginStyles";
import saveNewAccount from "server/src/database/topic/userAccount/saveNewAccount";
import checkExistingUserAccount from "server/src/database/topic/userAccount/checkExistingUserAccount";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {saveAccount, saveIsLogin} from "../../../reduxSagaShop/action/appActions";
import Account from "../../../common/entity/account/Account";
import getCurrentDateTimeFromTimeServer from "server/src/api/topic/currentDateTime/getCurrentDateTimeFromTimeServer";
import createLocalPushNotification from "../../../common/utils/pushNotification/local/createLocalPushNotification";
import createLocalChannels from "../../../common/utils/pushNotification/local/createLocalChannels";
import {SUCCESSFUL_REGISTER} from "./definition/registerDefinitions";
import {HOME, OTP_VERIFICATION} from "../../../navigator/definition/navigatorDefinitions";
import resetNavigation from "../../../common/utils/navigation/resetNavigation";
import {saveUnseenNotificationQuantity} from "../../../reduxSagaShop/action/notificationActions";
import getUnseenBookingQuantity from "server/src/database/topic/bookingHistory/getUnseenBookingQuantity";
import closeScreenWhenLoggedIn from "../../../common/utils/navigation/closeScreenWhenLoggedIn";

const trainPosition = new Animated.ValueXY({x: -300, y: 0})

class Register extends Component {

    state = {
        fullname: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        isPressed: false,
        isPhoneNumberRegistered: undefined,
        showWarning: false,
        isOTPSuccessful: false,
        isLoginAllowed: false,
    }

    _tabScreen = this.props.navigation.getState().routes[0].name

    componentDidMount() {
        this._moveTrain(500)
        createLocalChannels(SUCCESSFUL_REGISTER)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this._areAllValuesValid() === true && this.state.isPressed === true) {
            if (this.state.isPhoneNumberRegistered === true) {
                this._renderExistingPhoneNumberAlert()
            }
            this._operateBeforeOTPSuccessful()
            this._operateAfterOTPSuccessful()
        }
        await this._autoLoginAfterRegistering(prevState)
        closeScreenWhenLoggedIn(this.props.appReducer.isLogin, this.props.navigation, this._tabScreen)
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={registerStyles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ImageBackground
                        source={require('../image/loginImage.jpg')}
                        style={{flex: 1}}
                        resizeMode="stretch"
                    >
                        {this._renderScreenTitle()}
                        {this._renderRegisterInformation()}
                        {this._renderTrainAnimation()}
                        {this._renderRegisterButton()}
                    </ImageBackground>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }

    _renderExistingPhoneNumberAlert() {
        Alert.alert(
            'Warning',
            'Phone number already registered',
            [
                {
                    text: "OK",
                    onPress: () => {
                        this.setState({ isPhoneNumberRegistered: undefined })
                    }
                },
            ]
        )
    }

    _operateBeforeOTPSuccessful = () => {
        if(this.state.isPhoneNumberRegistered === false && this.state.isOTPSuccessful === false){
            this.props.navigation.navigate(OTP_VERIFICATION, {
                phoneNumber: this.state.phoneNumber,
                setIsOTPSuccessful: this._setIsOTPSuccessful
            })
        }
    }

    _operateAfterOTPSuccessful = () => {
        if (this.state.isPhoneNumberRegistered === false && this.state.isOTPSuccessful === true) {
            saveNewAccount(
                this.state.fullname,
                this.state.phoneNumber,
                this.state.password,
                this._setIsLoginAllowed,
                this._handlePushNotification
            )
            this.setState({
                isPhoneNumberRegistered: undefined,
                isPressed: false
            })
        }
    }

    _autoLoginAfterRegistering = async (prevState) => {
        if (this.state.isLoginAllowed != prevState.isLoginAllowed && this.state.isLoginAllowed === true) {
            this.props.saveIsLogin(true)
            this.props.saveAccount(new Account(
                this.state.phoneNumber,
                this.state.fullname,
                this.state.password,
            ))
            if (this.props.route.params.isShoppingCartReady == true) {
                this.props.navigation.jumpTo(HOME)
            }
            resetNavigation(this.props.navigation, this._tabScreen)
            await AsyncStorage.setItem('@account', JSON.stringify({
                phoneNumber: this.state.phoneNumber,
                password: this.state.password
            }))
            getUnseenBookingQuantity(
                this.state.phoneNumber,
                this.props.saveUnseenNotificationQuantity
            )
        }
    }

    _escapeWhenOtherScreensLoggedIn = () => {
        if (this.props.appReducer.isLogin === true) {
            resetNavigation(this.props.navigation, this._tabScreen)
        }
    }

    _renderScreenTitle() {
        return (
            <View style={registerStyles.screenTitleView}>
                <Text style={registerStyles.screenTitleText}>Please fill with your details</Text>
            </View>
        )
    }

    _renderRegisterInformation() {
        return (
            <View style={registerStyles.registerInformationView}>
                {this._renderInformationBox('person', 'Full name', this.state.fullname)}
                {this._renderInformationBox('call', 'Phone number', this.state.phoneNumber, 'numeric')}
                {this._renderInformationBox('vpn-key', 'Password', this.state.password)}
                {this._renderInformationBox('verified-user', 'Confirm password', this.state.confirmPassword)}
            </View>
        )
    }

    _renderInformationBox(iconName, placeholder, stateProperty, keyboardType = 'default') {
        return (
            <View style={registerStyles.informationBoxView}>
                <View style={{height: '70%', flexDirection: 'row'}}>
                    <View style={registerStyles.iconBoxView}>
                        <Icon
                            name={iconName}
                            size={30}
                            color='#511F90'
                        />
                    </View>
                    <View style={{flex: 20}}>
                        <TextInput
                            placeholder={placeholder}
                            placeholderTextColor='grey'
                            style={[
                                registerStyles.inputBoxView,
                                {borderColor: this.state.isPressed === false ? 'black' : this._convertInputBoxColor(placeholder)}
                            ]}
                            secureTextEntry={['Password', 'Confirm password'].includes(placeholder)}
                            keyboardType={keyboardType}
                            maxLength={(placeholder == 'Phone number') ? 10 : undefined}
                            value={stateProperty}
                            onFocus={() => {
                                this.setState({isPressed: false})
                            }}
                            onChangeText={(text) => {
                                if (iconName === 'call') {
                                    this._removeNonNumericCharacters(text)
                                } else if (iconName === 'person') {
                                    this._removeNumericCharacters(text)
                                } else {
                                    this._setValueToState(placeholder, text)
                                }
                            }}
                        />
                    </View>
                </View>
                {this._checkIsPressedToShowWarning(placeholder)}
            </View>
        )
    }

    _setValueToState(placeholder, text) {
        switch (placeholder) {
            case 'Full name':
                this.setState({fullname: text});
                break
            case 'Password':
                this.setState({password: text});
                break
            case 'Confirm password':
                this.setState({confirmPassword: text});
                break
            default:
                break
        }
    }

    _removeNonNumericCharacters(text) {
        this.setState({
            phoneNumber: text.replace(/[^0-9]/g, ''),
        });
    }

    _removeNumericCharacters(text) {
        this.setState({
            fullname: text.replace(/[^A-Za-z ]/g, ''),
        });
    }

    _checkIsPressedToShowWarning(placeholder) {
        if (this.state.isPressed === true) {
            return (
                <View style={registerStyles.warningView}>
                    <Text style={registerStyles.warningText}>{this._showWarning(placeholder)}</Text>
                </View>
            )
        }
    }

    _areAllValuesValid = () => (
        (this._isPhoneNumberValid() === true) && (this._arePasswordsMatching() === true)
    )

    _isPhoneNumberValid() {
        const phoneNumber = this.state.phoneNumber
        if (phoneNumber[0] != 0 || phoneNumber.length != 10) {
            return 'Invalid phone number'
        }
        return true
    }

    _arePasswordsMatching() {
        if (this.state.confirmPassword !== this.state.password) {
            return 'Not matching passwords'
        }
        return true
    }

    _showWarning(placeholder) {
        switch (placeholder) {
            case 'Confirm password':
                return this._arePasswordsMatching()
            case 'Phone number':
                return this._isPhoneNumberValid()
            default:
                break
        }
    }

    _convertInputBoxColor = (placeholder) => {
        if (placeholder == 'Full name' || placeholder == 'Password') return 'black'
        else {
            if(this._showWarning(placeholder) === true) {
                return 'black'
            }
            return '#9F1C02FF'
        }
    }

    _renderTrainAnimation() {
        return (
            <View style={registerStyles.trainAnimationView}>
                <View style={{marginTop: this._getTrainPositionAgainstDevice()}}>
                    <Animated.View
                        style={[
                            {flexDirection: 'row'},
                            {transform: [{translateX: trainPosition.x}, {translateY: trainPosition.y}]}
                        ]}
                    >
                        <Image
                            source={require('../image/trainCoach.png')}
                            style={loginStyles.trainCoach1Image}
                        />
                        <Image
                            source={require('../image/trainCoach.png')}
                            style={loginStyles.trainCoach2Image}
                        />
                        <Image
                            source={require('../image/trainCoach.png')}
                            style={loginStyles.trainCoach3Image}
                        />
                    </Animated.View>
                    <Image
                        source={require('../image/railRoad.png')}
                        style={loginStyles.railRoadImage}
                    />
                </View>
            </View>
        )
    }

    _getTrainPositionAgainstDevice = () => (
        Math.floor((Dimensions.get('window').height * 7) / 788) + '%'
    )

    _renderRegisterButton() {
        const isRegisterTouchable = (this.state.fullname == '' || this.state.phoneNumber == '' || this.state.password == '' || this.state.confirmPassword == '')
        return(
            <View style={registerStyles.generalRegisterButtonView}>
                <TouchableOpacity
                    style={[registerStyles.registerButtonView, {opacity: isRegisterTouchable ? 0.6 : 1}]}
                    disabled={isRegisterTouchable}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.setState({ isPressed: true })
                        if(this._areAllValuesValid() === true){
                            checkExistingUserAccount(this.state.phoneNumber, this._setIsPhoneNumberRegistered)
                        }
                    }}
                >
                    <Text style={registerStyles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _setIsPhoneNumberRegistered = (isPhoneNumberRegisteredResponse) => {
        this.setState({
            isPhoneNumberRegistered: isPhoneNumberRegisteredResponse
        })
    }

    _setIsLoginAllowed = () => {
        this.setState({ isLoginAllowed: true })
    }

    _setIsOTPSuccessful = () => {
        this.setState({ isOTPSuccessful: true })
    }

    _handlePushNotification = async () => {
        const currentDateTime = await getCurrentDateTimeFromTimeServer()
        createLocalPushNotification(
            SUCCESSFUL_REGISTER,
            'Register Successfully',
            'You have registered successfully',
            currentDateTime,
        )
    }

    _moveTrain(toX) {
        const trainAnimation = Animated.timing(
            trainPosition,
            {
                toValue: {x: toX, y: 0},
                duration: 6000,
            }
        )
        Animated.loop(trainAnimation).start()
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        saveIsLogin,
        saveAccount,
        saveUnseenNotificationQuantity
    }, dispatch)
)

const mapStateToProps = ({appReducer}) => ({appReducer})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
