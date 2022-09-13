import React, {useEffect, useState} from "react";
import {AsyncStorage, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SwitchSelector from "react-native-switch-selector";
import {useTranslation} from "react-i18next";
import {settingStyles} from "./settingStyles";
import {useDispatch, useSelector} from "react-redux";
import {saveAccount, saveIsLogin} from "../../../../../reduxSagaShop/action/appActions";
import Account from "../../../../../common/entity/account/Account";
import saveNewPassword from "server/src/database/topic/password/saveNewPassword";
import createLocalPushNotification
    from "../../../../../common/utils/pushNotification/local/createLocalPushNotification";
import getCurrentDateTimeFromTimeServer from "server/src/api/topic/currentDateTime/getCurrentDateTimeFromTimeServer";
import createLocalChannels from "../../../../../common/utils/pushNotification/local/createLocalChannels";
import {SUCCESSFUL_CHANGEPASSWORD} from "./definition/settingDefinitions";
import LoadingIndicator from "../../../../../common/component/loadingIndicator/LoadingIndicator";
import {saveUnseenNotificationQuantity} from "../../../../../reduxSagaShop/action/notificationActions";
import disconnectUnseenBookingQuantity from "server/src/database/topic/bookingHistory/disconnectUnseenBookingQuantity";

const options = [
    {label: 'English', value: 'en'},
    {label: 'Tiếng Việt', value: 'vn'}
]

export const Setting = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [isChangePasswordPressed, setIsChangePasswordPressed] = useState(false)
    const [isPressSetNewPasswordButton, setIsPressSetNewPasswordButton] = useState(false)
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const appReducer = useSelector(state => state.appReducer)

    useEffect(() => {
        createLocalChannels(SUCCESSFUL_CHANGEPASSWORD)
    }, [])

    const changePasswordView = () => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={settingStyles.changePasswordView}>
                <TouchableOpacity
                    style={settingStyles.changePasswordTitleView}
                    onPress={() => {
                        setIsChangePasswordPressed(!isChangePasswordPressed)
                    }}
                >
                    <Text style={settingStyles.changePasswordTitleText}>{t('changePassword')}</Text>
                    {
                        isChangePasswordPressed
                            ? <Icon name='menu-book' size={25} color='#184785'/>
                            : <Icon name='book' size={25} color='#184785'/>
                    }

                </TouchableOpacity>
                {
                    isChangePasswordPressed
                        ? changePasswordInput()
                        : null
                }
            </View>
        </TouchableWithoutFeedback>
    )

    const changePasswordInput = () => (
        <View style={settingStyles.changePasswordInputView}>
            {generalTitleText(t('newPasswordTitle'))}
            {changePasswordInputBox({
                placeholder: t('newPasswordTitle'),
                value: newPassword,
                changeText: (text) => setNewPassword(text)
            })}
            <View style={{paddingVertical: '3%'}}></View>
            {generalTitleText(t('confirmTitle'))}
            {changePasswordInputBox({
                placeholder: t('confirmPlaceHolder'),
                value: confirmNewPassword,
                changeText: (text) => setConfirmNewPassword(text)
            })}
            {setNewPasswordButton()}
        </View>
    )

    const generalTitleText = (title) => (
        <View style={settingStyles.generalTitleView}>
            <Text style={settingStyles.generalTitleText}>{title}</Text>
            {
                (isPressSetNewPasswordButton && title === t('confirmTitle'))
                &&
                <Text style={settingStyles.warningText}>{arePasswordsMatching()}</Text>
            }
        </View>
    )

    const changePasswordInputBox = ({placeholder, value, changeText}) => (
        <View style={{flex: 4}}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='#9C9C9C'
                secureTextEntry={true}
                style={settingStyles.changePasswordInputBox}
                value={value}
                onChangeText={changeText}
                onFocus={() => {
                    setIsPressSetNewPasswordButton(false)
                }}
            />
        </View>
    )

    const arePasswordsMatching = () => {
        if (confirmNewPassword !== newPassword) {
            return t('notMatchingPasswords')
        }
        return true
    }

    const setNewPasswordButton = () => {
        const isValidInputValue = (newPassword == '' || confirmNewPassword == '')
        return (
            <TouchableOpacity
                style={[settingStyles.setNewPasswordButtonView, {opacity: isValidInputValue ? 0.6 : 1}]}
                disabled={isValidInputValue}
                onPress={() => {
                    setIsPressSetNewPasswordButton(true)
                    if (arePasswordsMatching() === true) {
                        setIsLoading(true)
                        saveNewPassword(appReducer.account.phoneNumber, newPassword, handlePushNotification, saveAccountWithNewPassword)
                    }
                }}
            >
                <Text style={settingStyles.setNewPasswordButtonText}>{t('setNewPassword')}</Text>
            </TouchableOpacity>
        )
    }

    const handlePushNotification = async () => {
        const currentDateTime = await getCurrentDateTimeFromTimeServer()
        createLocalPushNotification(
            SUCCESSFUL_CHANGEPASSWORD,
            'Change password successful',
            'You have changed password successfully',
            currentDateTime,
        )
        setIsLoading(false)
    }
    const saveAccountWithNewPassword = async (newPassword) => {
        setNewPassword('')
        setConfirmNewPassword('')
        setIsChangePasswordPressed(false)

        dispatch(saveAccount(new Account(
            appReducer.account.phoneNumber,
            appReducer.account.fullname,
            newPassword,
            appReducer.account.avatarURL
        )))
        await AsyncStorage.setItem('@account', JSON.stringify({
            phoneNumber: appReducer.account.phoneNumber,
            password: newPassword
        }))
    }

    const logoutButton = () => (
        <View style={settingStyles.logoutButtonView}>
            <TouchableOpacity
                style={settingStyles.logoutButtonBox}
                onPress={() => {
                    logout()
                    props.navigation.goBack()
                }}
            >
                <Text style={settingStyles.logoutButtonText}>{t("logout")}</Text>
                <Icon name='logout' size={22} color='white'/>
            </TouchableOpacity>
        </View>
    )

    const logout = () => {
        disconnectUnseenBookingQuantity(appReducer.account.phoneNumber)
        dispatch(saveIsLogin(false))
        dispatch(saveAccount(new Account()))
        dispatch(saveUnseenNotificationQuantity(0))
    }

    return (
        <View style={settingStyles.container}>
            {isLoading && <LoadingIndicator/>}
            <SwitchSelector
                style={{padding: '5%'}}
                options={options}
                hasPadding
                initial={props.languageIndex}
                onPress={language => {
                    props.changeLanguage(language)
                }}
            />
            {changePasswordView()}
            {logoutButton()}
        </View>
    )
}
