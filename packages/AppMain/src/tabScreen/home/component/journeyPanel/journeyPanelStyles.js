import {StyleSheet} from "react-native";

export const journeyPanelStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e3e3',
        padding: '2%'
    },
    trainCompanyView: {
        flexDirection: 'row',
        backgroundColor: '#7464B0',
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        flex: 2
    },
    trainCompanyLogoImageView: {
        flex: 5,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    trainCompanyLogoImage: {
        height: '83%',
        width: '24%',
        borderWidth: 3,
        borderRadius: 18,
        marginHorizontal: '4%'
    },
    trainCompanyNameView: {
        flex: 7,
        justifyContent: 'center'
    },
    trainCompanyNameText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    departureTimeView: {
        flex: 2,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: '5%',
        flexDirection: "row",
    },
    departureDayPicker: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: 'white',
        borderRadius: 5,
        width: '48%',
        height: '100%',
        marginLeft: '4%',
        paddingHorizontal: '5%',
    },
    generalTrainStationView: {
        flexDirection: 'row',
        marginTop: '5%',
        flex: 6,
    },
    fromOrToTrainStationView: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    provinceImage: {
        height: '75%',
        width: '90%',
        borderRadius: 15
    },
    trainStationNameText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: '1%'
    },
    arrowView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    trainMapView: {
        flex: 10,
        flexDirection: 'row',
        marginTop: '3%',
    },
    mapProvinceView: {
        flex: 25,
        borderWidth: 2,
    },
    getOnboardButton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 3,
        marginTop: '2%'
    },
    getOnboardButtonView: {
        flexDirection: 'row',
        height: '65%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4178d9',
        borderRadius: 100
    },
    getOnboardText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    getOnboardIconView: {
        flexDirection: 'row',
        marginLeft: '5%'
    }
})
