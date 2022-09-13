import React, {Component} from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {HomeStackScreen, NotificationStackScreen, ProfileStackScreen} from "./stackScreen/stackScreens";
import {HOME, NOTIFICATION, PROFILE} from "./definition/navigatorDefinitions";
import {useTranslation} from "react-i18next";
import {stackScreensStyles} from "./stackScreen/stackScreensStyles";
import {useSelector} from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import {StatusBar} from "react-native";

const Tab = createBottomTabNavigator()

let t, i18n;
let languageIndex = 0;
let unseenNotificationQuantity = 0;

export default class Navigator extends Component {

    state = {
        isInternetConnected: true
    }

    componentDidMount() {
        NetInfo.addEventListener(({isConnected}) => {
            this.setState({isInternetConnected: isConnected})
        });
    }

    render() {
        return (
            <NavigationContainer>
                <this._getTranslation/>
                <this._getReduxSagaState/>
                {this._renderInternetStatusBar()}
                {this._renderTabControl()}
            </NavigationContainer>
        )
    }

    _getTranslation = () => {
        t = useTranslation().t
        i18n = useTranslation().i18n
        return null
    }

    _getReduxSagaState = () => {
        unseenNotificationQuantity = useSelector(
            ({notificationReducer}) => notificationReducer.unseenNotificationQuantity
        )
        return null
    }

    _changeLanguage = (language) => {
        languageIndex = (language === 'en' ? 0 : 1)
        i18n.changeLanguage(language).then(() => {})
    }

    _renderInternetStatusBar = () => (
        <StatusBar
            backgroundColor="#ed4545"
            barStyle='default'
            hidden={this.state.isInternetConnected}
        />
    )

    _renderTabControl() {
        return (
            <Tab.Navigator
                screenOptions={({route, navigation}) => ({
                    tabBarIcon: ({focused, color}) => (
                        <Icon
                            name={this._getIconName(route.name)}
                            color={color}
                            size={focused === true ? 32 : 24}
                        />
                    ),
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'black',
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: navigation.isFocused() ? 12 : 11
                    },
                    tabBarStyle: {
                        backgroundColor: '#4E3F8A'
                    }
                })}
            >
                <Tab.Screen
                    name={HOME}
                    component={HomeStackScreen}
                    options={() => ({
                        ...{title: t('home')},
                        ...stackScreensStyles
                    })}
                />
                <Tab.Screen
                    name={NOTIFICATION}
                    component={NotificationStackScreen}
                    options={() => ({
                        ...stackScreensStyles,
                        ...{
                            title: t('notification'),
                            tabBarBadge: unseenNotificationQuantity || undefined
                        },
                    })}
                />
                <Tab.Screen
                    name={PROFILE}
                    children={() => (
                        <ProfileStackScreen
                            changeLanguage={this._changeLanguage}
                            languageIndex={languageIndex}
                        />
                    )}
                    options={() => ({
                        ...{title: t('profile')},
                        ...stackScreensStyles
                    })}
                />
            </Tab.Navigator>
        )
    }

    _getIconName(iconName) {
        switch (iconName) {
            case HOME:
                return 'home'
            case NOTIFICATION:
                return 'notifications-active'
            case PROFILE:
                return 'person'
            default:
                return 'help-center'
        }
    }
}
