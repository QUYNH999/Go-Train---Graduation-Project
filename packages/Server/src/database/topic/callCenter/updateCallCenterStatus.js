import {ref, set} from "firebase/database";
import {database} from "../../config/database";

const reference = ref(database, 'call_center/status/')

export default async function updateCallCenterStatus(status) {
    await set(reference, status).then(() => {})
}
