import {onValue, ref} from "firebase/database";
import {database} from "../../config/database";

const reference = ref(database, 'call_center/status/')

export default function getCallCenterStatus(setCallCenterStatus) {
    onValue(reference, (status) => {
        setCallCenterStatus(status.val())
    })
}
