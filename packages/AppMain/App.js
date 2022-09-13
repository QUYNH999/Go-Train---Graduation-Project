import React, {Component} from "react";
import {LogBox} from "react-native";
import {configStore} from "./src/reduxSagaShop/store/configStore";
import {Provider} from "react-redux";
import OpeningScreen from "./src/openingScreen/OpeningScreen";

export default class App extends Component {
    render() {
        LogBox.ignoreAllLogs()
        LogBox.ignoreLogs(['Warning:...'])
        return(
            <Provider store={configStore()}>
                <OpeningScreen/>
            </Provider>
        )
    }
}
