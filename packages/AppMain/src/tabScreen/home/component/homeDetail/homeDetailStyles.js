import {StyleSheet} from "react-native";

export const homeDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    supportAndUserView: {
        flex: 3,
        flexDirection: 'row',
        paddingHorizontal: '2%',
    },
    supportView: {
        justifyContent: 'center',
        alignItems: "flex-start",
        flexDirection: "row",
    },
    userNameView: {
        flex: 15,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: "row",
    },
    supportAndUserText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: "center",
    },
    selectionAreaView: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: "center",
    },
    dropdownView: {
        height: '30%',
        width: '38%',
    },
    directionTrainIndicatorView: {
        height: '20%',
        width: '15%',
        marginHorizontal: '2%',
        marginTop: '4%'
    },
    generalRailwayCompanyView: {
        flex: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    companyBox: {
        flex: 19,
        flexDirection: 'row',
        justifyContent: "center",
    },
    companyColumn: {
        justifyContent: "center",
        alignItems: "center",
        margin: '2%',
        flex: 1
    },
    companyView: {
        marginBottom: '10%',
    },
    companyNameView: {
        marginTop: '4%',
        justifyContent: "center",
        alignItems: "center"
    },
    companyNameText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18
    }
})
