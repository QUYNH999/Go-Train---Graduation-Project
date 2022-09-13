import {ref, set} from "firebase/database";
import {database} from "../../config/database";

export default function saveNewAccount(fullname, phoneNumber, password, setIsLoginAllowed, handlePushNotification) {
    const reference = ref(database, 'account/' + phoneNumber)
    set(reference, {
        fullname: fullname,
        password: password
    }).then(() => {
        setIsLoginAllowed()
        handlePushNotification()
    })
}
