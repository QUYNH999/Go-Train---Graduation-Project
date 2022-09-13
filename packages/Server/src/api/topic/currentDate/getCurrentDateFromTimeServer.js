import CurrentDate from "./CurrentDate";
import axios from "axios";

const timeZone = 'Asia/Ho_Chi_Minh'

export default function getCurrentDateFromTimeServer() {
    return axios.get('https://timeapi.io/api/Time/current/zone?timeZone=' + timeZone)
        .then(({data}) => {
            return new CurrentDate(data.day, data.month, data.year)
        })
        .catch((error) => {
            console.error(error)
        })
}
