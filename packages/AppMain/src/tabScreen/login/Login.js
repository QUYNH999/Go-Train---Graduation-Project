import React, {Component} from "react";
import {
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
import {loginStyles} from "./loginStyles";
import {saveAccount, saveIsLogin, saveIsShoppingCartReady} from "../../reduxSagaShop/action/appActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import checkValidUserAccount from "server/src/database/topic/userAccount/checkValidUserAccount";
import Account from "../../common/entity/account/Account";
import LoadingIndicator from "../../common/component/loadingIndicator/LoadingIndicator";
import {FORGET_PASSWORD, HOME, REGISTER} from "../../navigator/definition/navigatorDefinitions";
import {saveUnseenNotificationQuantity} from "../../reduxSagaShop/action/notificationActions";
import getUnseenBookingQuantity from "server/src/database/topic/bookingHistory/getUnseenBookingQuantity";

const trainPosition = new Animated.ValueXY({x: -300, y: 0})

class Login extends Component{

    state = {
        isLoading: false,
        secureTextEntry: true,
        phoneNumber: '',
        password: '',
        fullname: '',
        avatarURL: '',
        isLogin: undefined,
        isLoginPressed: false,
        isPhoneNumberRegistered: undefined,
        isPasswordCorrect: undefined,
    }

    componentDidMount() {
        this._moveTrain(500)
        this._autoFillAccount().then(() => {})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this._operateWhenLoginAllowed()
    }

    render() {
        return(
            <KeyboardAvoidingView
                style={loginStyles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                {this.state.isLoading && <LoadingIndicator/>}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ImageBackground
                        source={require('./image/loginImage.jpg')}
                        style={loginStyles.loginImage}
                        resizeMode="stretch"
                    >
                        {this._renderPhoneNumber()}
                        {this._renderPassword()}
                        {this._renderLoginButtonView()}
                        {this._renderAdditionalInformation()}
                        {this._renderAnimationTrainImage()}
                    </ImageBackground>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }

    _operateWhenLoginAllowed = () => {
        if(this.state.isLogin == true) {
            this.props.saveIsLogin(true)
            this.props.saveAccount(new Account(
                this.state.phoneNumber,
                this.state.fullname,
                this.state.password,
                this.state.avatarURL
            ))
            this._storeAccount({
                phoneNumber: this.state.phoneNumber,
                password: this.state.password
            }).then(() => {})
            if(this.props.isShoppingCartReady){
                this.props.saveIsShoppingCartReady(false)
                this.props.navigation.jumpTo(HOME)
            }
            getUnseenBookingQuantity(
                this.state.phoneNumber,
                this.props.saveUnseenNotificationQuantity
            )
        }
    }

    _renderPhoneNumber() {
        return(
            <View style={loginStyles.generalPhoneNumberOrPasswordView}>
                <View style={loginStyles.phoneNumberOrPasswordTitleAndWarningView}>
                    <Text style={loginStyles.phoneNumberOrPasswordTitleText}>Phone number</Text>
                    {this._showPhoneNumberWarning()}
                </View>
                <View style={[loginStyles.phoneNumberOrPasswordView, {borderTopRightRadius: 20}]}>
                    <View style={loginStyles.phoneNumberOrPasswordIconView}>
                        <Icon name='call' color='white' size={20}
                        />
                    </View>
                    <View style={{flex: 14, justifyContent: 'center'}}>
                        <TextInput
                            placeholder='Phone number'
                            placeholderTextColor='#9C9C9C'
                            keyboardType='numeric'
                            value={this.state.phoneNumber}
                            maxLength={10}
                            onFocus={this._resetInputCheck}
                            onChangeText={(text) => {this._removeNonNumericCharacters(text)}}
                            style={{color: 'white', fontSize: 15}}
                        />
                    </View>
                    <View style={{flex: 2}}></View>
                </View>
            </View>
        )
    }

    _showPhoneNumberWarning = () => {
        if(this.state.isLoginPressed){
            if(this._isValidPhoneNumber() === false){
                return <Text style={loginStyles.warningText}>Invalid phone number</Text>
            } else if(this.state.isPhoneNumberRegistered === false){
                return <Text style={loginStyles.warningText}>Phone number not registered</Text>
            }
        }
    }

    _isValidPhoneNumber = () => !(this.state.phoneNumber[0] !== '0' || this.state.phoneNumber.length !== 10)

    _removeNonNumericCharacters (text) {
        this.setState({phoneNumber: text.replace(/[^0-9]/g, '')});
    }

    _renderPassword() {
        return(
            <View style={loginStyles.generalPhoneNumberOrPasswordView}>
                <View style={loginStyles.phoneNumberOrPasswordTitleAndWarningView}>
                    <Text style={loginStyles.phoneNumberOrPasswordTitleText}>Password</Text>
                    {this._showPasswordWarning()}
                </View>
                <View style={[loginStyles.phoneNumberOrPasswordView, {borderBottomLeftRadius: 20}]}>
                    <View style={loginStyles.phoneNumberOrPasswordIconView}>
                        <Icon name='vpn-key' color='white' size={20}
                        />
                    </View>
                    <View style={{flex: 14, justifyContent: 'center'}}>
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor='#9C9C9C'
                            secureTextEntry={this.state.secureTextEntry}
                            value={this.state.password}
                            onFocus={this._resetInputCheck}
                            onChangeText={(text) => {this.setState({password: text})}}
                            style={{color: 'white', fontSize: 15}}
                        />
                    </View>
                    <TouchableOpacity
                        style={loginStyles.visibilityIconView}
                        onPress={() => {
                            this.setState({
                                secureTextEntry: (this.state.secureTextEntry !== true)
                            })
                        }}
                    >
                        <Icon
                            name={this._changeSecureIcon()}
                            color='#470164'
                            size={18}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _showPasswordWarning = () => (
        (this.state.isPasswordCorrect === false && this.state.isLoginPressed === true && this.state.isPhoneNumberRegistered === true)
        &&
        <Text style={loginStyles.warningText}>Incorrect Password</Text>
    )

    _changeSecureIcon() {
        if (this.state.secureTextEntry === true) return 'visibility-off'
        return 'visibility'
    }

    _resetInputCheck = () => {
        this.setState({
            isLoginPressed: false,
            isPhoneNumberRegistered: undefined,
            isPasswordCorrect: undefined
        })
    }

    _renderLoginButtonView = () => {
        const isLoginNotTouchable = (this.state.phoneNumber == '' || this.state.password == '')
        return(
            <View style={loginStyles.loginButtonView}>
                <TouchableOpacity
                    style={[loginStyles.loginButtonBoxView, {opacity: isLoginNotTouchable ? 0.6 : 1}]}
                    disabled={isLoginNotTouchable}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.setState({isLoginPressed: true})
                        if(this._isValidPhoneNumber()){
                            this.setState({isLoading: true})
                            checkValidUserAccount(
                                this._setLoginInfo,
                                this.state.phoneNumber,
                                this.state.password
                            )
                        }
                    }}
                >
                    <Text style={loginStyles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _setLoginInfo = (isLoginResponse, isPhoneNumberRegisteredResponse, isPasswordCorrectResponse, fullnameResponse, avatarURLResponse) => {
        this.setState({
            isLogin: isLoginResponse,
            isPhoneNumberRegistered: isPhoneNumberRegisteredResponse,
            isPasswordCorrect: isPasswordCorrectResponse,
            fullname: fullnameResponse,
            avatarURL: avatarURLResponse,
            isLoading: false
        })
    }

    _renderAdditionalInformation() {
        return(
            <View style={loginStyles.additionalInformationView}>
                <TouchableOpacity
                    style={{marginRight: '8%'}}
                    onPress={() => {
                        this.props.navigation.navigate(REGISTER, {
                                isShoppingCartReady: this.props.isShoppingCartReady
                            }
                        )
                    }}
                >
                    <Text style={loginStyles.additionalInformationText}>Register</Text>
                </TouchableOpacity>
                <Text style={loginStyles.additionalInformationText}>|</Text>
                <TouchableOpacity
                    style={{marginLeft: '8%'}}
                    onPress={() => {
                        this.props.navigation.navigate(FORGET_PASSWORD)
                    }}
                >
                    <Text style={loginStyles.additionalInformationText}>Forget Password</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderAnimationTrainImage() {
        return(
            <View style={{flex: 14}}>
                <View style={{marginTop: this._getTrainPositionAgainstDevice()}}>
                    <Animated.View
                        style={[
                            {flexDirection: 'row'},
                            {transform: [{ translateX: trainPosition.x}, {translateY: trainPosition.y}]}
                        ]}
                    >
                        <Image
                            source={require('./image/trainCoach.png')}
                            style={loginStyles.trainCoach1Image}
                        />
                        <Image
                            source={require('./image/trainCoach.png')}
                            style={loginStyles.trainCoach2Image}
                        />
                        <Image
                            source={require('./image/trainCoach.png')}
                            style={loginStyles.trainCoach3Image}
                        />
                    </Animated.View>

                    <Image
                        source={require('./image/railRoad.png')}
                        style={loginStyles.railRoadImage}
                    />
                </View>
            </View>
        )
    }

    _getTrainPositionAgainstDevice = () => (
        Math.floor((Dimensions.get('window').height*28)/788)+'%'
    )

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

    _storeAccount = async ({phoneNumber, password}) => {
        try {
            await AsyncStorage.setItem('@account', JSON.stringify({phoneNumber, password}))
        }catch (error) {
            console.error(error)
        }
    }

    _autoFillAccount = async () => {
        try {
            const stringValue = await AsyncStorage.getItem('@account')
            this.setState({
                phoneNumber: JSON.parse(stringValue).phoneNumber,
                password: JSON.parse(stringValue).password
            })
        }catch (error) {
            console.error(error)
        }
    }
}

const mapStateToProps = ({appReducer}) => ({appReducer})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        saveIsLogin,
        saveAccount,
        saveIsShoppingCartReady,
        saveUnseenNotificationQuantity
    },dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
