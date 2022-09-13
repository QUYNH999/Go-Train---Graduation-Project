import {Dimensions, StyleSheet} from "react-native";

export const avatarManagementStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    avatarView: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarRim: {
        height: (38 * Dimensions.get('screen').height) / 100,
        width: (38 * Dimensions.get('screen').height) / 100,
        borderRadius: ((38 * Dimensions.get('screen').height) / 100) / 2,
        backgroundColor: '#ECECEC',
        justifyContent: 'center'
    },
    buttonAreaView: {
        flex: 5,
        resizeMode: ''
    },
    selectionsView: {
        flex: 3,
    },
    selectionButtonView: {
        flex: 2,
        paddingLeft: '4%',
        flexDirection: 'row',
    },
    animatedSelectionButtonView: {
        flex: 1,
        flexDirection: 'row'
    },
    iconView: {
        height: '55%',
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectionButtonContentView: {
        height: '55%',
        width: '55%',
        backgroundColor: '#00B2BF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionButtonContentText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 1
    },
    acceptButtonView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    acceptButton: {
        height: '55%',
        width: '50%',
        backgroundColor: '#79378B',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    acceptButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})
