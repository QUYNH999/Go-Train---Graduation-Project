import {Dimensions, StyleSheet} from "react-native";

export const callConnectingStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        height: '100%',
        width: '100%',
    },
    phoneAndIndicatorView: {
        height: '20%',
        alignItems: "center",
        justifyContent: "center",
    },
    callingBox: {
        borderRadius: 25,
        width: (8 * Dimensions.get('screen').height) / 100,
        height: (8 * Dimensions.get('screen').height) / 100,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: '5%'
    },
})
