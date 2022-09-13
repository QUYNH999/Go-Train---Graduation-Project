import {Dimensions, StyleSheet} from "react-native";

export const supportStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1C32'
    },
    agentView: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    agentImage: {
        height: (40 * Dimensions.get('screen').height) / 100,
        width: (40 * Dimensions.get('screen').height) / 100
    },
    descriptionView: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
    },
    descriptionText: {
        color: 'white',
        fontSize: 17,
    },
    callButtonView: {
        flex: 1.3,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    callBox: {
        backgroundColor: '#2C294A',
        height: (15 * Dimensions.get('screen').height) / 100,
        width: (15 * Dimensions.get('screen').height) / 100,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: '7%'
    }
})
