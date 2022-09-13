import {StyleSheet} from "react-native";

export const shoppingCartStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        backgroundColor: '#7464B0',
    },
    generalText: {
        color: 'white',
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    },
    cartBody: {
        flexDirection: "row",
        flex: 20,
    },
    cartContent: {
        flex: 1.3,
        borderWidth: 2,
        borderStyle: 'dotted',
        borderRadius: 20,
        padding: '2%',
        alignItems: "center",
        justifyContent: "space-between",
    },
    railwayView: {
        alignItems: "center",
        flexDirection: "row",
    },
    dropDownPickerLabelView: {
        height: 40,
        width: '67%',
        position: "absolute",
        backgroundColor: '#fafcfb',
        marginLeft: '15%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: '2%'
    },
    discountView: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 15,
        alignItems: "center",
    },

    booknowButton: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#468cdb',
        height: '78%',
        width: '70%',
    },
    booknowText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 20,
        marginRight: '4%'
    },
    trainView: {
        flex: 1,
    },
    trainRunningSpace: {
        paddingHorizontal: '3%',
        height: '100%',
    },
})
