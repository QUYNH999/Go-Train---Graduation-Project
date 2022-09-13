import axios from "axios";
import CallSetupSuite from "./CallSetupSuite";

const rootURL = "https://trainbookingapp-1eb48-default-rtdb.asia-southeast1.firebasedatabase.app"
const endPoint = "/call_center.json"

export default function getCallSetupSuite() {
    return axios.get(rootURL + endPoint)
        .then(({data}) => {
            return new CallSetupSuite(
                data.appId,
                data.channelName,
                data.agoraToken
            )
        })
        .catch((error) => {
            console.error(error)
        })
}
