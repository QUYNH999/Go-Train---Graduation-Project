import {MASTERCARD, VISA} from "../addCardPopup/definition/creditBrandDefinitions";

export default function analyzeCardNo(numberSeries){
    if(numberSeries[0] == 5 && numberSeries.length === 16) return MASTERCARD
    else if (numberSeries[0] == 4 && [13,16].includes(numberSeries.length)) return VISA
    return null
}
