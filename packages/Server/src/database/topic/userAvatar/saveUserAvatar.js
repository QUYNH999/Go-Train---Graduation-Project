import {ref, set} from "firebase/database";
import {database} from "../../config/database";

export default function saveUserAvatar(phoneNumber, userAvatarURL) {
    const reference = ref(database, 'account/' + phoneNumber + '/avatarURL')
    set(reference, userAvatarURL).then(() => {})
}
