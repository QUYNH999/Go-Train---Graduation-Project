import {onValue, ref} from "firebase/database";
import {database} from "../../config/database";
import DepartureTime from "./DepartureTime";

const reference = ref(database, 'departure_time/');

export default function getAllDepartureTimes(setDepartureTimes) {
    onValue(reference, (departureTimes) => {
        const collectedDepartureTimes = [];
        departureTimes.forEach((departureTime) => {
            collectedDepartureTimes.push(
                new DepartureTime(
                    departureTime.val().time,
                    departureTime.val().time,
                )
            );
        });
        setDepartureTimes(collectedDepartureTimes)
    });
}
