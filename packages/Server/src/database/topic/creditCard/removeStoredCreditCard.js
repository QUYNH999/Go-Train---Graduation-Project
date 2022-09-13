import {ref, set} from "firebase/database";
import {database} from "../../config/database";

export default function removeStoredCreditCard(phoneNumber, creditCardId, createCreditCardPushNotification) {
    const reference = ref(database, 'account/' + phoneNumber + '/credit_card/' + creditCardId)
    set(reference, {})
        .then(() => {
            createCreditCardPushNotification('Card removed','You have removed a credit card successfully')
        })
}
