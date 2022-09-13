import {ref, off} from "firebase/database";
import {database} from "../../config/database";

export default function disconnectUnseenBookingQuantity(phoneNumber) {
    const reference = ref(database, 'account/' + phoneNumber + '/unseenBookingQuantity')
    off(reference)
}
