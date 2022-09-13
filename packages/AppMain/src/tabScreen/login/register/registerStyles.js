import {StyleSheet} from "react-native";

export const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenTitleView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: "center",
    },
    screenTitleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    registerInformationView: {
        flex: 10,
        padding: '5%',
        zIndex: 2,
    },
    informationBoxView: {
        height: 60,
        width: '100%',
        marginBottom: '2%',
    },
    iconBoxView: {
        flex: 4,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 12,
        borderStyle: 'dashed',
    },
    inputBoxView: {
        fontWeight: '500',
        fontSize: 15,
        flex: 20,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: '4%',
    },
    warningView: {
        alignItems: 'flex-end'
    },
    warningText: {
        color: '#9F1C02FF',
    },
    trainAnimationView: {
        flex: 2,
    },
    generalRegisterButtonView: {
        flex: 6,
        alignItems: 'center',
    },
    registerButtonView: {
        height: '25%',
        width: '55%',
        backgroundColor: '#470164',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%'
    },
    registerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})
