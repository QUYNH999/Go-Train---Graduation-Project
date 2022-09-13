import {ref, push} from "firebase/database";
import {database} from "../../config/database";

export default function saveNewCreditCard(phoneNumber, last4DigitString, createSaveCreditCardPushNotification) {
    const reference = ref(database, 'account/' + phoneNumber + '/credit_card')
    push(reference, last4DigitString)
        .then(() => {
            createSaveCreditCardPushNotification('New credit card added','You have saved new credit card successfully')
        });
}
