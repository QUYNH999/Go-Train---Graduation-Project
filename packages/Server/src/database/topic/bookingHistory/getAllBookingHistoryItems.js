import {database} from "../../config/database";
import {onValue, ref} from "firebase/database";
import BookingHistoryItem from "./BookingHistoryItem";

export default function getAllBookingHistoryItems(setAllBookingHistoryItems, phoneNumber) {
    const reference = ref(database, 'account/' + phoneNumber + '/booking_history')
    onValue(reference, (bookingHistoryItems) => {
        const collectedAllBookingHistoryItems = []
        bookingHistoryItems.forEach((bookingHistoryItem) => {
            collectedAllBookingHistoryItems.push(
                new BookingHistoryItem(
                    bookingHistoryItem.val().title,
                    bookingHistoryItem.val().description,
                    bookingHistoryItem.val().time,
                    bookingHistoryItem.val().date,
                    bookingHistoryItem.val().companyImage,
                    bookingHistoryItem.val().companyName,
                    Object.values(bookingHistoryItem.val().adultTickets || {}),
                    Object.values(bookingHistoryItem.val().childTickets || {}),
                    bookingHistoryItem.val().defaultAdultPrice,
                    bookingHistoryItem.val().defaultChildPrice,
                    bookingHistoryItem.val().departureProvince,
                    bookingHistoryItem.val().departureStation,
                    bookingHistoryItem.val().destinationProvince,
                    bookingHistoryItem.val().destinationStation,
                    bookingHistoryItem.val().discountRate,
                    bookingHistoryItem.key
                )
            )
        })
        setAllBookingHistoryItems(collectedAllBookingHistoryItems)
    })
}
