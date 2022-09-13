import {
    SAVE_IS_LOGIN,
    SAVE_ACCOUNT,
    SAVE_IS_SHOPPING_CART_READY,
    SAVE_AVATAR,
    SAVE_SELECTED_VOUCHER
} from "../definition/actionTypes";

export const saveIsLogin = (isLogin) => (
    {
        type: SAVE_IS_LOGIN,
        payload: isLogin,
    }
)

export const saveAccount = (account) => (
    {
        type: SAVE_ACCOUNT,
        payload: account
    }
)

export const saveIsShoppingCartReady = (isShoppingCartReady) => (
    {
        type: SAVE_IS_SHOPPING_CART_READY,
        payload: isShoppingCartReady
    }
)

export const saveAvatar = (account) => (
    {
        type: SAVE_AVATAR,
        payload: account
    }
)

export const saveSelectedVoucher = (voucher) => (
    {
        type: SAVE_SELECTED_VOUCHER,
        payload: voucher
    }
)
