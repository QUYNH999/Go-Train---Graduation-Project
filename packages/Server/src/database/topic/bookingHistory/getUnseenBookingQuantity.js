import {database} from "../../config/database";
import {onValue, ref} from "firebase/database";

export default function getUnseenBookingQuantity(phoneNumber, saveUnseenNotificationQuantity) {
    const reference = ref(database, 'account/' + phoneNumber + '/unseenBookingQuantity')
    onValue(reference, (unseenBookingItemQuantity) => {
        saveUnseenNotificationQuantity(unseenBookingItemQuantity.val() || 0)
    })
}
