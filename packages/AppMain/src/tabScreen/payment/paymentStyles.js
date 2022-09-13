import {Dimensions, StyleSheet} from "react-native";

export const paymentStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9981D9',
    },
    coverPhoto: {
        flex: 7,
        alignItems: 'center',
        marginTop: '4%'
    },
    body: {
        backgroundColor: 'white',
        borderTopRightRadius: 220,
        borderTopLeftRadius: 220,
        flex: 14,
        width: Dimensions.get('window').width + 150,
        alignSelf: "center",
        alignItems: 'center',
        paddingBottom: 8
    },
    escapeSpace: {
        backgroundColor: 'black',
        opacity: 0.7,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        position: 'absolute',
        flex: 1,
        zIndex: 1,
    },
    addCardButtonView: {
        position: "absolute",
        top: '30%',
        zIndex: 2,
        backgroundColor: '#e3aa39',
        borderRadius: 20,
        alignSelf: 'center',
    },
    addCardPopup: {
        height: '30%',
        width: '80%',
        zIndex: 2,
        position: 'absolute',
        top: '20%',
        flex: 1,
        alignSelf: "center"
    },
    plusButtonView: {
        height: '15%',
    },
    cardListView: {
        width: Dimensions.get('window').width,
        height: '70%',
        alignItems: "center",
    },
    cardRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get('screen').width,
    },
    cardCell: {
        borderWidth: 2,
        borderRadius: 10,
        margin: '3%',
        marginRight: '8%',
        marginLeft: '8%',
        width: '30%',
        height: 80,
        backgroundColor: '#e3aa39',
        elevation: 5,
    },
    cardCellContent: {
        flex: 3,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 2,
    },
    cardDigitsText: {
        fontWeight: "bold"
    },
    tickIcon: {
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: '#02b32e',
        alignSelf: "flex-end",
        position: "absolute",
        top: '-12%',
    },
    payNowOrSaveButtonView: {
        justifyContent: "flex-end",
        width: Dimensions.get('window').width,
        zIndex: 2,
        bottom: '2%'
    },
    payNowOrSaveButton: {
        flexDirection: "row",
        backgroundColor: '#468cdb',
        borderRadius: 50,
        width: '70%',
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        alignSelf: 'center',
    },
    payNowOrSaveText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
    }
})
