import {onValue, ref} from "firebase/database";
import VoucherItem from "./VoucherItem";
import {database} from "../../config/database";

const reference = ref(database, 'voucher_item/')

export default function getAllVouchersItems(setAllVoucherItems, today) {
    onValue(reference, (voucherItems) => {
        const collectedVoucherItems = []
        voucherItems.forEach((voucherItem) => {
            if (isUnexpiredVoucherItem(voucherItem.val().deadline, today) === true){
                collectedVoucherItems.push(
                    new VoucherItem(
                        voucherItem.val().title,
                        voucherItem.val().description,
                        voucherItem.val().startTime,
                        voucherItem.val().deadline,
                        voucherItem.val().code + '-' + voucherItem.val().discountRate + '%',
                        voucherItem.val().discountRate
                    )
                )
            }
        })
        setAllVoucherItems(collectedVoucherItems)
    })
}

const isUnexpiredVoucherItem = (deadline, today) => {
    const [deadlineDay, deadlineMonth, deadlineYear] = deadline.split('/')

    if (deadlineYear < today.year) return false
    if (deadlineYear > today.year) return true
    if (deadlineYear == today.year) {
        if (deadlineMonth < today.month) return false
        if (deadlineMonth > today.month) return true
        if (deadlineMonth == today.month) {
            return deadlineDay >= today.day;
        }
    }
}
