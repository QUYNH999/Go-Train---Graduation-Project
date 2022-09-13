import { Dimensions, StyleSheet } from 'react-native';

export const callRoomStyles = StyleSheet.create({
    container: {
      flex: 1
    },
    buttonHolder: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        backgroundColor: '#0093E9',
        borderRadius: 25,
    },
    remoteView: {
        flex: 5,
        width: Dimensions.get('window').width,
        alignItems: "center",
        justifyContent: "center",
    },
    localView: {
        width: (15 * Dimensions.get('screen').height) / 100,
        height: (15 * Dimensions.get('screen').height) / 100,
        marginTop: "1%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "0%",
        left: "0%",
    },
    micStatusView: {
        backgroundColor: 'black',
        borderRadius: 10,
        position: "absolute",
        top: "0%",
        right: "0%",
        zIndex: 1
    }
});
