import CurrentDateTime from "./CurrentDateTime";
import axios from "axios";

const timeZone = 'Asia/Ho_Chi_Minh'

export default function getCurrentDateTimeFromTimeServer() {
    return axios.get('https://timeapi.io/api/Time/current/zone?timeZone=' + timeZone)
        .then(({data}) => {
            return new CurrentDateTime(
                data.day,
                data.month,
                data.year,
                data.hour,
                data.minute,
                data.seconds
            )
        })
        .catch((error) => {
            console.error(error)
        })
}
