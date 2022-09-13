import {StyleSheet} from "react-native";

export const addCardPopupStyles = StyleSheet.create({
    creditCardBackground: {
        flex: 1
    },
    container: {
        padding: '2%',
        flex: 1,
    },
    titleView: {
        width: '25%'
    },
    inputView: {
        flexDirection: "row",
        flex: 2,
    },
    input: {
        borderWidth: 2,
        height: '65%',
        width: '70%',
        flex: 1,
        marginHorizontal: '2%',
        padding: '1%',
        borderRadius: 10,
        paddingHorizontal: '4%'
    },
    issueDateAndCreditLogoView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: '0%'
    },
    creditLogoView: {
        width: '18%',
        height: '70%',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: '1%',
    }
})
