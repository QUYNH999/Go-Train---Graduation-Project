import React, {useEffect, useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import auth from '@react-native-firebase/auth';
import LoadingIndicator from "../../../common/component/loadingIndicator/LoadingIndicator";
import {otpVerificationStyles} from "./otpVerificationStyles";
import {FORGET_PASSWORD} from "../../../navigator/definition/navigatorDefinitions";


export const OTPVerification = (props) => {

    const [isLoading, setIsLoading] = useState(true)
    const [otp, setOtp] = useState('')
    const [confirmation, setConfirmation] = useState(null)

    useEffect(() => {
        requestOTP().then(() => {setIsLoading(false)})
    },[])

    async function requestOTP() {
        const phoneNumber = convertIntoInternationalFormatPhoneNumber(props.route.params.phoneNumber)
        try {
            const confirmationResponse = await auth().signInWithPhoneNumber(phoneNumber, true)
            setConfirmation(confirmationResponse)
        } catch (error) {
            alert(error)
        }
    }

    const convertIntoInternationalFormatPhoneNumber = (phoneNumber) => ('+84' + phoneNumber.slice(1))

    const renderTitle = () => (
        <View style={otpVerificationStyles.titleView}>
            <Text style={otpVerificationStyles.titleText}>Please input OTP</Text>
        </View>
    )

    const renderInputBox = () => (
        <View style={otpVerificationStyles.inputView}>
            <View style={otpVerificationStyles.inputBoxView}>
                <TextInput
                    style={otpVerificationStyles.inputBoxText}
                    placeholder='OTP'
                    maxLength={6}
                    keyboardType={'numeric'}
                    caretHidden={true}
                    value={otp}
                    onChangeText={(text) => {
                        setOtp(text.replace(/[^0-9]/g, ''))
                    }}
                />
            </View>
            <TouchableOpacity
                style={otpVerificationStyles.resendView}
                onPress={() => {
                    setIsLoading(true)
                    requestOTP().then(() => {setIsLoading(false)})
                }}
            >
                <MaterialIcons name='sync' size={25} color='black'/>
                <Text style={otpVerificationStyles.resendText}>Resend</Text>
            </TouchableOpacity>
        </View>
    )

    function renderButton() {
        const areDigitsEnough = (otp.length == 6)
        return(
            <View style={otpVerificationStyles.buttonView}>
                <TouchableOpacity
                    style={[otpVerificationStyles.buttonBoxView, {opacity: areDigitsEnough ? 1 : 0.6}]}
                    disabled={!areDigitsEnough}
                    onPress={verifyOTP}
                >
                    <Text style={otpVerificationStyles.buttonBoxText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    async function verifyOTP() {
        try {
            setIsLoading(true)
            await confirmation.confirm(otp)
            setConfirmation(null)
            setIsLoading(false)
        } catch (error) {
            alert('Invalid OTP')
            setIsLoading(false)
        }
    }

    function goPreviousScreen() {
        const previousScreen = props.navigation.getState().routes.slice(-2)[0].name
        if(previousScreen == FORGET_PASSWORD){
            props.navigation.navigate(FORGET_PASSWORD, {isOTPSuccessful: true})
        }else{
            props.route.params.setIsOTPSuccessful()
        }
    }

    auth().onAuthStateChanged((user) => {
        if(user) {
            auth().signOut().then(goPreviousScreen)
        }
    })

    return(
        <KeyboardAvoidingView
            style={otpVerificationStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            {isLoading && <LoadingIndicator/>}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>
                    {renderTitle()}
                    {renderInputBox()}
                    {renderButton()}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
