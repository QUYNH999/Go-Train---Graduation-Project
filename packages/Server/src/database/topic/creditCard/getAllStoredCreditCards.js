import {onValue, ref} from "firebase/database";
import {database} from "../../config/database";
import StoredCreditCard from "./StoredCreditCard";

export default function getAllStoredCreditCards(phoneNumber, setSavedCreditCards) {
    const reference = ref(database, 'account/' + phoneNumber + '/credit_card')
    onValue(reference, (creditCards) => {
        const collectedCreditCards = []
        creditCards.forEach((creditCard) => {
            collectedCreditCards.push(
                new StoredCreditCard(
                    creditCard.key,
                    creditCard.val()
                )
            )
        })
        setSavedCreditCards(collectedCreditCards)
    })
}
