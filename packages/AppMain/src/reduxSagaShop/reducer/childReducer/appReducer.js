import {
    SAVE_ACCOUNT,
    SAVE_AVATAR,
    SAVE_IS_LOGIN,
    SAVE_IS_SHOPPING_CART_READY,
    SAVE_SELECTED_VOUCHER
} from "../../definition/actionTypes";
import Account from "../../../common/entity/account/Account";
import VoucherItem from "server/src/database/topic/voucher/VoucherItem";

const initialState = {
    isLogin: false,
    account: new Account(),
    isShoppingCartReady: false,
    selectedVoucher: new VoucherItem('','','','','Select voucher',0)
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_IS_LOGIN:
            return {...state, isLogin: action.payload}
        case SAVE_ACCOUNT:
            return {...state, account: action.payload}
        case SAVE_IS_SHOPPING_CART_READY:
            return {...state, isShoppingCartReady: action.payload}
        case SAVE_AVATAR:
            return {...state, account: action.payload}
        default: return state
        case SAVE_SELECTED_VOUCHER:
            return {...state, selectedVoucher: action.payload}
    }
}
