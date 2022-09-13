/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//Note: Not delete, it's used for multi-languages
import i18next from "./assets/language/i18next";
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    onNotification: function (notification) {
        if (notification.userInteraction) {

        }
    },
    requestPermissions: Platform.OS === 'ios'
})

AppRegistry.registerComponent(appName, () => App);
