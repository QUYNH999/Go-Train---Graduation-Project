import {combineReducers} from "redux";
import {appReducer} from "./childReducer/appReducer";
import {notificationReducer} from "./childReducer/notificationReducer";

export const rootReducer = combineReducers({
    appReducer: appReducer,
    notificationReducer: notificationReducer
})
