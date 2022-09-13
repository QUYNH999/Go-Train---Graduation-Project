export default class BookingHistoryItem {
    constructor(title, description, time, date, companyImage, companyName, adultTickets, childTickets,
                defaultAdultPrice, defaultChildPrice, departureProvince, departureStation, destinationProvince,
                destinationStation, discountRate, orderCode = null) {
        this.title = title
        this.description = description
        this.time = time
        this.date = date
        this.companyImage = companyImage
        this.companyName = companyName
        this.adultTickets = adultTickets
        this.childTickets = childTickets
        this.defaultAdultPrice = defaultAdultPrice
        this.defaultChildPrice = defaultChildPrice
        this.departureProvince = departureProvince
        this.departureStation = departureStation
        this.destinationProvince = destinationProvince
        this.destinationStation = destinationStation
        this.discountRate = discountRate
        this.orderCode = orderCode
    }
}
