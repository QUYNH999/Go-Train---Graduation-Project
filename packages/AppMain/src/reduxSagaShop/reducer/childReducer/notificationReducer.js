import {SAVE_UNSEEN_NOTIFICATION_QUANTITY} from "../../definition/actionTypes";

const initialState = {
    unseenNotificationQuantity: 0,
}

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_UNSEEN_NOTIFICATION_QUANTITY:
            return {...state, unseenNotificationQuantity: action.payload}
        default: return state
    }
}
