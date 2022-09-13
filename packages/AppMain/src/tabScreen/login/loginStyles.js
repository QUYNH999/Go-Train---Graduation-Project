import {StyleSheet} from "react-native";

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e3e3',
    },
    loginImage: {
        flex: 1,
    },
    generalPhoneNumberOrPasswordView: {
        marginTop: '2%',
        paddingHorizontal: '11%',
        marginBottom: '1%',
        flex: 4,
    },
    phoneNumberOrPasswordTitleAndWarningView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    phoneNumberOrPasswordTitleText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500'
    },
    warningText: {
        color: '#EE6363',
        opacity: 0.7
    },
    phoneNumberOrPasswordView: {
        flexDirection: 'row',
        height: '57%',
        width: '95%',
        marginTop: '2%',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: "center"
    },
    phoneNumberOrPasswordIconView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    visibilityIconView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonView: {
        flex: 3,
        justifyContent: 'center'
    },
    loginButtonBoxView: {
        marginHorizontal: '12%',
        height: '80%',
        width: '50%',
        backgroundColor: '#470164',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    additionalInformationView: {
        flex: 2,
        flexDirection: 'row',
        paddingHorizontal: '12%',
    },
    additionalInformationText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500'
    },
    trainCoach1Image: {
        height: 30,
        width: 80,
        position: "absolute",
        top: -20
    },
    trainCoach2Image: {
        height: 30,
        width: 80,
        position: "absolute",
        top: -20,
        left: 60,
    },
    trainCoach3Image: {
        height: 30,
        width: 80,
        position: "absolute",
        top: -20,
        left: 120,
    },
    railRoadImage: {
        height: 10,
        width: 400,
    },
})
