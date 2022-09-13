export default class Order{
    constructor(railwayCompany, departureProvince, destinationProvince, departureDay,
                departureTime, adultTickets, childTickets, defaultAdultPrice, defaultChildPrice,
                discountRate, boughtSeats, placeTimePoint) {
        this.railwayCompany = railwayCompany
        this.departureProvince = departureProvince
        this.destinationProvince = destinationProvince
        this.departureDay = departureDay
        this.departureTime = departureTime
        this.adultTickets = adultTickets
        this.childTickets = childTickets
        this.defaultAdultPrice = defaultAdultPrice
        this.defaultChildPrice = defaultChildPrice
        this.discountRate = discountRate
        this.boughtSeats = boughtSeats
        this.placeTimePoint = placeTimePoint
    }
}
