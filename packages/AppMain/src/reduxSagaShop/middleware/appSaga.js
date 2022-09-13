import {put, takeEvery} from "redux-saga/effects";
import {
    SAVE_ACCOUNT,
    SAVE_AVATAR,
    SAVE_IS_LOGIN,
    SAVE_IS_SHOPPING_CART_READY,
    SAVE_SELECTED_VOUCHER,
    SAVE_UNSEEN_NOTIFICATION_QUANTITY
} from "../definition/actionTypes";

function* saveIsLogin(action){
    try {
        yield put(action.payload)
    }catch (error) {
        console.error(error)
    }
}

function* saveAccount(action){
    try {
        yield put(action.payload)
    }catch (error) {
        console.error(error)
    }
}

function* saveIsShoppingCartReady(action) {
    try {
        yield put(action.payload)
    }catch (error) {
        console.error(error)
    }
}

function* saveAvatar(action) {
    try {
        yield put(action.payload)
    }catch (error) {
        console.error(error)
    }
}

function* saveSelectedVoucher(action) {
    try {
        yield put(action.payload)
    }catch (error) {
        console.error(error)
    }
}

function* saveUnseenNotificationQuantity(action) {
    try {
        yield put(action.payload)
    }catch (error) {
        console.error(error)
    }
}

export default function* appSaga(){
    yield takeEvery(SAVE_IS_LOGIN, saveIsLogin)
    yield takeEvery(SAVE_ACCOUNT, saveAccount)
    yield takeEvery(SAVE_IS_SHOPPING_CART_READY, saveIsShoppingCartReady)
    yield takeEvery(SAVE_AVATAR, saveAvatar)
    yield takeEvery(SAVE_SELECTED_VOUCHER, saveSelectedVoucher)
    yield takeEvery(SAVE_UNSEEN_NOTIFICATION_QUANTITY, saveUnseenNotificationQuantity)
}
