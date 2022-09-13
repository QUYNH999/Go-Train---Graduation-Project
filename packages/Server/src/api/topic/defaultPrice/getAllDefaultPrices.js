import axios from "axios";
import DefaultPrice from "./DefaultPrice";

const rootURL = 'https://trainbookingapp-1eb48-default-rtdb.asia-southeast1.firebasedatabase.app/'
const endPoint = 'ticket_price.json'

export default function getAllDefaultPrices() {
    return axios.get(rootURL + endPoint)
        .then(({data}) => {
            return new DefaultPrice(parseInt(data.adultPrice), parseInt(data.childPrice))
        })
        .catch((error) => {
            console.error(error)
        })
}
