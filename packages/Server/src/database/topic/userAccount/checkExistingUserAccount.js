import {database} from "../../config/database";
import {child, get, ref} from "firebase/database";

const reference = ref(database)

export default function checkExistingUserAccount(phoneNumber, setIsPhoneNumberRegistered) {
    get(child(reference, 'account/' + phoneNumber)).then((userAccount) => {
        setIsPhoneNumberRegistered(userAccount.exists())
    })
}
