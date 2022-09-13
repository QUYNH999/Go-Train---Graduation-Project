import {SAVE_UNSEEN_NOTIFICATION_QUANTITY} from "../definition/actionTypes";

export const saveUnseenNotificationQuantity = (unseenNotificationQuantity) => (
    {
        type: SAVE_UNSEEN_NOTIFICATION_QUANTITY,
        payload: unseenNotificationQuantity
    }
)
