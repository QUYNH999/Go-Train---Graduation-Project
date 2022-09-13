import {Dimensions, StyleSheet} from "react-native";

export const notificationDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e3e3',
        alignItems: "center",
    },
    notFoundView: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 150
    },
    notFoundText: {
        color: '#184785',
        fontWeight: 'bold',
        fontSize: 18
    },
    notificationBox: {
        width: Dimensions.get('window').width - 40,
        borderWidth: 3,
        borderRadius: 25,
        marginVertical: '3%',
        alignSelf: 'center'
    },
    titleAndIconBox: {
        flex: 4,
        flexDirection: 'row',
        borderBottomWidth: 2,
        backgroundColor: '#4E3F8A',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
    },
    contentBox: {
        flex: 7,
    },
    titleBox: {
        flex: 6,
        justifyContent: 'center',
        paddingHorizontal: '6%'
    },
    titleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconBox: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bookingOrVoucherContentView: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingHorizontal: '4%'
    },
    journeyOrDescriptionView: {
        flexDirection: 'row',
        marginTop: '3%',
        paddingRight: '4%'
    },
    journeyOrDescriptionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    timeView: {
        flexDirection: 'row',
        marginTop: '2%',
    },
    timeAndCodeText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    ticketCodeView: {
        flexDirection: 'row',
        marginVertical: '2%'
    },
    voucherCodeView: {
        flexDirection: 'row',
        marginVertical: '2%'
    },
    voucherCodeTitleText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    voucherCodeContentText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    }
})
