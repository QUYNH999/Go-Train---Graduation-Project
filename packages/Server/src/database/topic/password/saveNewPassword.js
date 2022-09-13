import {ref, set} from "firebase/database";
import {database} from "../../config/database";

export default function saveNewPassword(phoneNumber, newPassword, handlePushNotification, saveAccountWithNewPassword) {
    const reference = ref(database, 'account/' + phoneNumber + '/password')
    set(reference, newPassword).then(() => {
        handlePushNotification()
        saveAccountWithNewPassword(newPassword)
    })
}
