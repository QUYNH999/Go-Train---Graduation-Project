import {ref, set} from "firebase/database";
import {database} from "../../config/database";

export default function updateUnseenBookingQuantity(phoneNumber, quantity) {
    const reference = ref(database, 'account/' + phoneNumber + '/unseenBookingQuantity')
    set(reference, quantity).then(() => {})
}
