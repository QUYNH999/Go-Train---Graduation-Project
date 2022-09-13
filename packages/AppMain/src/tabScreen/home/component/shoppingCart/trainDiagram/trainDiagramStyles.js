import {StyleSheet} from "react-native";

export const trainDiagramStyles = StyleSheet.create({
    trainHead: {
        backgroundColor: '#e3e3e3',
        borderWidth: 2,
        height: '12%',
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        borderBottomWidth: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    sampleSeatView: {
        flexDirection: "row",
        marginTop: '2%',
        alignItems: "center",
    },
    sampleSeat: {
        borderWidth: 2,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
        height: '90%',
        width: '15%',
        marginRight: '2%',
    },
    trainCoach: {
        borderWidth: 2,
        backgroundColor: '#e3e3e3',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: '8%',
        marginBottom: '8%'
    },
    seat: {
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
        height: 25,
        width: '100%',
        borderWidth: 2,
        marginVertical: '10%',
        marginHorizontal: '2.5%',
        justifyContent: "center",
        alignItems: "center",
    },
    coachName: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#050980"
    }
})
