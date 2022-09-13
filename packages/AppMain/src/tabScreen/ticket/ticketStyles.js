import {Dimensions, StyleSheet} from "react-native";

export const ticketStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e3e3'
    },
    generalTicketsView: {
        flex: 20,
        margin: '3%',
    },
    ticketView: {
        height: '100%',
        width: Dimensions.get('window').width - 50,
        marginHorizontal: 12
    },
    contentTicketView: {
        flex: 10,
        borderWidth: 5,
        borderRadius: 20,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
    },
    ticketImageBackground: {
        flex: 1,
    },
    logoCompanyView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    railwayCompanyNameView: {
        flex: 2,
        alignItems: 'center'
    },
    railwayCompanyNameText: {
        color: 'black',
        fontSize: 19,
        fontWeight: 'bold'
    },
    mainContentText: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold'
    },
    fullnameView: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    phoneNumberView: {
        flex: 2,
    },
    journeyView: {
        flex: 3,
        flexDirection: 'row',
    },
    departureView: {
        flex: 4,
        justifyContent: 'center'
    },
    provinceView: {
        borderBottomWidth: 1,
        width: '70%',
        marginBottom: '1%',
        paddingBottom: '1%'
    },
    fromToIconView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    destinationView: {
        flex: 4,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    seatAndTimeView: {
        flex: 4,
        alignItems: "center",
        justifyContent: 'center',
    },
    seatAndTimeBoxView: {
        height: '100%',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 10,
        borderStyle: 'dotted'
    },
    ticketType: {
        flex: 2
    },
    seatView: {
        flexDirection: 'row',
        flex: 2,
    },
    timeView: {
        flex: 2,
        justifyContent: "flex-end"
    },
    priceAndTicketCodeView: {
        flex: 3,
    },
    priceView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    QRcodeAndSealView: {
        flex: 4,
        flexDirection: 'row',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    generalQRcodeView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noteView: {
        flex: 2,
        backgroundColor: 'pink',
        padding: '4%'
    },
    generalPaymentSeal: {
        position: 'absolute',
        height: '15%',
        width: '45%',
        top: '27%',
        left: '30%',
        borderColor: 'red',
        opacity: 0.5,
        transform: [{ rotate: "20deg" }]
    },
    railwayCompanyNameInPaymentSealView: {
        height: '37%',
        width: '100%',
        borderWidth: 3,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    railwayCompanyNameInPaymentSealText: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold'
    },
    mainContentPaymentSealView: {
        flex: 5,
        height: '63%',
        width: '100%',
        borderWidth: 3,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContentPaymentSealText: {color: 'red',
        fontWeight: 'bold',
        fontSize: 35
    },
    homeBackView: {
        flex: 2,
        alignItems: "center"
    },
    homeBackBox: {
        flexDirection: 'row',
        height: '80%',
        width: '50%',
        borderRadius: 20,
        backgroundColor: '#780075',
        justifyContent: "center",
        alignItems: 'center'
    },
    homeBackText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: '4%'
    }
})
