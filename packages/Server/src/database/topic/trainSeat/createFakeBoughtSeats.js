import {ref, set} from "firebase/database";
import {database} from "../../config/database";
import convertIntoRomanNumber from "./utils/convertIntoRomanNumber";

export default function createFakeBoughtSeats(railwayCompanyId, placeTimePoint, setBoughtSeats) {
    const boughtSeats = getRandomSeats()
    const reference = ref(database, 'railway_company/' + railwayCompanyId + '/boughtSeats/' + placeTimePoint)
    set(reference, boughtSeats.join('_')).then(() => {
        setBoughtSeats(boughtSeats)
    })
}

function getRandomSeats() {
    let boughtSeats = []
    for (let i = 1; i < 4; i++) { //Loop for Romantic numbers
        for (let j = 9; ++j < 14;) { //Loop for alphabet characters
            const randomSeats = [];
            while (randomSeats.length < 2) {
                const randomNumber = Math.floor(Math.random() * 9);
                const seatName = convertIntoRomanNumber(i) + j.toString(14).toUpperCase() + randomNumber
                if (!randomSeats.includes(seatName)) {
                    randomSeats.push(seatName);
                }
            }
            boughtSeats = boughtSeats.concat(randomSeats)
        }
    }
    return boughtSeats
}
