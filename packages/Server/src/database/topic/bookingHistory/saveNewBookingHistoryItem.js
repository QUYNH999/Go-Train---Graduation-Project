import {database} from "../../config/database";
import {ref, set} from "firebase/database";
import BookingHistoryItem from "./BookingHistoryItem";
import updateUnseenBookingQuantity from "./updateUnseenBookingQuantity";

export default function saveNewBookingHistoryItem(phoneNumber, order, orderCode, unseenNotificationQuantity,
                                                  createPaymentCardPushNotification, currentDateTime) {
    const newBookingHistoryItem = new BookingHistoryItem(
        'Successful Booking',
        order.departureProvince.station + ' - ' + order.destinationProvince.station,
        order.departureTime,
        order.departureDay,
        order.railwayCompany.image.uri,
        order.railwayCompany.name,
        order.adultTickets,
        order.childTickets,
        order.defaultAdultPrice,
        order.defaultChildPrice,
        order.departureProvince.title,
        order.departureProvince.station,
        order.destinationProvince.title,
        order.destinationProvince.station,
        order.discountRate
    )
    const reference = ref(database, 'account/' + phoneNumber + '/booking_history/' + orderCode)
    set(reference, newBookingHistoryItem)
        .then(() => {
            createPaymentCardPushNotification(
                'Successful payment', 'You have booked successfully', currentDateTime
            )
            updateUnseenBookingQuantity(phoneNumber, unseenNotificationQuantity + 1)
        })
}
