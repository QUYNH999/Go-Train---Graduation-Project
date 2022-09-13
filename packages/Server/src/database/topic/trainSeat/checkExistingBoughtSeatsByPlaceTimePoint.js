import {child, get, ref} from "firebase/database";
import {database} from "../../config/database";
import createFakeBoughtSeats from "./createFakeBoughtSeats";

const reference = ref(database)

export default function checkExistingBoughtSeatsByPlaceTimePoint(railwayCompanyId, placeTimePoint, setBoughtSeats) {
    get(child(reference, 'railway_company/' + railwayCompanyId))
        .then((railwayCompany) => {
            const boughtSeats = railwayCompany.val().boughtSeats
            if (boughtSeats === undefined) {
                createFakeBoughtSeats(railwayCompanyId, placeTimePoint, setBoughtSeats)
            }else if(boughtSeats[placeTimePoint] === undefined){
                createFakeBoughtSeats(railwayCompanyId, placeTimePoint, setBoughtSeats)
            }else {
                setBoughtSeats( boughtSeats[placeTimePoint].split('_') )
            }
        })
}
