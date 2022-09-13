import {Dimensions, StyleSheet} from "react-native";

export const profileInfoStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcomeBackground: {
        flex: 4,
    },
    coverPhoto: {
        flex: 1,
    },
    avatarCircleRim: {
        flex: 2,
        position: 'absolute',
        zIndex: 2,
        backgroundColor: '#4E3F8A',
        height: (24 * Dimensions.get('screen').height) / 100,
        width: (24 * Dimensions.get('screen').height) / 100,
        borderRadius: 200,
        marginTop: Dimensions.get('screen').height / 8,
        alignSelf: "center",
        justifyContent: "center",
    },
    avatarCircleCore: {
        backgroundColor: 'white',
        opacity: 0.8,
        height: '65%',
        width: '65%',
        borderRadius: 100,
        alignItems: "center",
        alignSelf: 'center',
        justifyContent: "center",
    },
    detailBoard: {
        flex: 7,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingVertical: '10%',
        backgroundColor: '#F6F1E6FF'
    },
    infoItemView: {
        flexDirection: "row",
        backgroundColor: 'white',
        height: '15%',
        width: '85%',
        borderRadius: 13,
        borderWidth: 2,
        borderColor: '#3D22A6FF',
        marginVertical: '2%',
        paddingLeft: '2%',
        alignItems: "center",
    },
    infoItemText: {
        alignSelf: "center",
        marginLeft: '2%',
        fontSize: 16,
        color: 'black',
    },
    infoContent: {
        justifyContent: "center"
    },
    infoContentText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'black',
    }
})
