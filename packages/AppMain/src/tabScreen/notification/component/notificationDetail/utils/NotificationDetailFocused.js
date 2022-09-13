import React from "react";
import {useFocusEffect} from "@react-navigation/native";
import updateUnseenBookingQuantity from "server/src/database/topic/bookingHistory/updateUnseenBookingQuantity";
import {useSelector} from "react-redux";

export const NotificationDetailFocused = () => {
    const {appReducer, notificationReducer} = useSelector(state => state)

    useFocusEffect(() => {
        if(notificationReducer.unseenNotificationQuantity > 0){
            updateUnseenBookingQuantity(appReducer.account.phoneNumber, 0)
        }
    })
    return null
}
