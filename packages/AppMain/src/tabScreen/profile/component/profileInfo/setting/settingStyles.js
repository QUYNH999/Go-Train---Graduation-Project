import {StyleSheet} from "react-native";

export const settingStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    changePasswordView: {
        flex: 6,
        paddingVertical: '3%',
        paddingHorizontal: '4%'
    },
    changePasswordTitleView: {
        flexDirection: 'row',
        marginVertical: '4%',
        height: '10%',
        width: '55%',
        alignItems: "flex-end",
    },
    changePasswordTitleText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#184785',
        marginRight: '3%'
    },
    changePasswordInputView: {
        height: '65%',
        paddingHorizontal: '5%',
    },
    generalTitleView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        flex: 2
    },
    generalTitleText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    warningText: {
        color: '#B6292B'
    },
    changePasswordInputBox: {
        height: '100%',
        marginVertical: '1%',
        borderRadius: 10,
        borderWidth: 2,
        paddingLeft: '3%',
        backgroundColor: 'white',
        padding: '1%',
        color: 'black',
        fontSize: 15,
        fontWeight: '500123'
    },
    setNewPasswordButtonView: {
        marginTop: '12%',
        backgroundColor: '#205AA7',
        height: '15%',
        width: '55%',
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        flex: 4
    },
    setNewPasswordButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'
    },
    logoutButtonView: {
        flex: 2,
        justifyContent: "flex-end",
        padding: '4%'
    },
    logoutButtonBox: {
        flexDirection: 'row',
        borderRadius: 25,
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: '#79378B',
        height: '35%',
        width: '55%',
        justifyContent: "center",
        alignItems: "center",
    },
    logoutButtonText: {
        marginRight: '4%',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
