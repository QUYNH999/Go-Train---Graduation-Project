import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Home from "../../tabScreen/home/Home";
import HomeDetail from "../../tabScreen/home/component/homeDetail/HomeDetail";
import Support from "../../tabScreen/home/component/support/Support";
import Notification from "../../tabScreen/notification/Notification";
import ShoppingCart from "../../tabScreen/home/component/shoppingCart/ShoppingCart";
import JourneyPanel from "../../tabScreen/home/component/journeyPanel/JourneyPanel";
import {stackScreensStyles} from "./stackScreensStyles";

import Login from "../../tabScreen/login/Login";
import Register from "../../tabScreen/login/register/Register";
import {Setting} from "../../tabScreen/profile/component/profileInfo/setting/Setting";
import Ticket from "../../tabScreen/ticket/Ticket";
import Payment from "../../tabScreen/payment/Payment";
import Profile from "../../tabScreen/profile/Profile";
import ForgetPassword from "../../tabScreen/login/forgetPassword/ForgetPassword";
import {
    AVATAR_MANAGEMENT,
    CALL_ROOM,
    FORGET_PASSWORD,
    HOME,
    HOME_DETAIL,
    JOURNEY_PANEL,
    LOGIN,
    NOTIFICATION,
    OTP_VERIFICATION,
    PAYMENT,
    PROFILE,
    REGISTER,
    SETTING,
    SHOPPING_CART,
    SUPPORT,
    TICKET
} from "../definition/navigatorDefinitions";
import {OTPVerification} from "../../tabScreen/login/otpVerification/OTPVerification";
import {AvatarManagement} from "../../tabScreen/profile/component/profileInfo/avatarManagement/AvatarManagement";
import CallRoom from "../../tabScreen/home/component/support/callRoom/CallRoom";
import {useTranslation} from "react-i18next";

const HomeStack = createNativeStackNavigator()
const NotificationStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()

export const HomeStackScreen = () => {
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen
                name={HOME}
                component={Home}
                options={stackScreensStyles}
            />
            <HomeStack.Screen
                name={HOME_DETAIL}
                component={HomeDetail}
                options={stackScreensStyles}
            />
            <HomeStack.Screen
                name={SUPPORT}
                component={Support}
                options={stackScreensStyles}
            />
            <HomeStack.Screen
                name={CALL_ROOM}
                component={CallRoom}
                options={{...stackScreensStyles, ...{headerBackVisible: false}}}
            />
            <HomeStack.Screen
                name={JOURNEY_PANEL}
                component={JourneyPanel}
                options={stackScreensStyles}
            />
            <HomeStack.Screen
                name={SHOPPING_CART}
                component={ShoppingCart}
                options={stackScreensStyles}
            />
            <HomeStack.Screen
                name={PAYMENT}
                component={Payment}
                options={stackScreensStyles}
            />
            <HomeStack.Screen
                name={TICKET}
                component={Ticket}
                options={{headerShown: false}}
            />
        </HomeStack.Navigator>
    )
}

export const NotificationStackScreen = () => {
    return(
        <NotificationStack.Navigator>
            <NotificationStack.Screen
                name={NOTIFICATION}
                component={Notification}
                options={stackScreensStyles}
            />
            <ProfileStack.Screen
                name={LOGIN}
                component={Login}
                options={stackScreensStyles}
            />
            <ProfileStack.Screen
                name={REGISTER}
                component={Register}
                options={stackScreensStyles}
            />
            <ProfileStack.Screen
                name={FORGET_PASSWORD}
                component={ForgetPassword}
                options={stackScreensStyles}
            />
            <ProfileStack.Screen
                name={OTP_VERIFICATION}
                component={OTPVerification}
                options={stackScreensStyles}
            />
            <HomeStack.Screen
                name={TICKET}
                component={Ticket}
                options={{headerShown: false}}
            />
        </NotificationStack.Navigator>
    )
}

 export const ProfileStackScreen = (props)  => {
    const {t} = useTranslation()
    return(
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name={PROFILE}
                component={Profile}
                options={stackScreensStyles}
            />
            <ProfileStack.Screen
                name={LOGIN}
                component={Login}
                options={stackScreensStyles}
            />
            <ProfileStack.Screen
                name={REGISTER}
                component={Register}
                options={stackScreensStyles}
            />
            <ProfileStack.Screen
                name={FORGET_PASSWORD}
                component={ForgetPassword}
                options={stackScreensStyles}
            />
            <ProfileStack.Screen
                name={OTP_VERIFICATION}
                component={OTPVerification}
                options={stackScreensStyles}
            />
            <HomeStack.Screen
                name={PAYMENT}
                component={Payment}
                options={stackScreensStyles}
            />
            <ProfileStack.Screen
                name={SETTING}
                children={({navigation}) => (
                    <Setting
                        navigation={navigation}
                        changeLanguage={props.changeLanguage}
                        languageIndex={props.languageIndex}
                    />
                )}
                options={{
                    ...{ title: t('headerTitle') },
                    ...stackScreensStyles
                }}
            />
            <ProfileStack.Screen
                name={AVATAR_MANAGEMENT}
                component={AvatarManagement}
                options={stackScreensStyles}
            />
        </ProfileStack.Navigator>
    )
}
