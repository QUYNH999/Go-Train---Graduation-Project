import {ref, set} from "firebase/database";
import {database} from "../../config/database";

export default function saveBoughtSeats(railwayCompanyId, placeTimePoint, boughtSeats) {
    const reference = ref(database, 'railway_company/' + railwayCompanyId + '/boughtSeats/' + placeTimePoint)
    set(reference, boughtSeats.join('_')).then(() => {})
}
