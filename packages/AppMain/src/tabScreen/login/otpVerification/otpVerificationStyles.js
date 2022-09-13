import {StyleSheet} from "react-native";

export const otpVerificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EEE5FF'
    },
    titleView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
    },
    subTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: "flex-start",
        marginLeft: '10%',
    },
    inputView: {
        flex: 3,
        alignItems: "center",
    },
    inputBoxView: {
        height: '55%',
        width: '52%',
        borderBottomWidth: 3,
        borderColor: '#184785',
        justifyContent: 'flex-end',
    },
    inputBoxText: {
        color: '#184785',
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 12,
        textAlign: "center",
    },
    resendView: {
        marginTop: '4%',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: '16%'
    },
    resendText: {
        color: 'black',
        marginLeft: '1%',
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonView: {
        flex: 8,
        alignItems: 'center',
    },
    buttonBoxView: {
        height: '18%',
        width: '80%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B4F93'
    },
    buttonBoxText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 4
    }
})
