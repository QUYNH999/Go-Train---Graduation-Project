import {StyleSheet} from "react-native";

export const forgetPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%',
        backgroundColor: '#F8EEE5FF'
    },
    titleView: {
        flex: 2,
        justifyContent: 'center',
    },
    introTitleText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#235657FF',
    },
    mainTitleText: {
        marginTop: '4%',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#5B437AFF'
    },
    inputView: {
        flex: 4,
    },
    inputBoxView: {
        height: '40%',
        width: '70%',
        borderWidth: 2,
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: '3%',
        backgroundColor: '#FAECD5FF',
        flexDirection: 'row',
        marginTop: '7%',
    },
    iconView: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    inputBoxContentView: {
        height: '100%',
        width: '100%',
        color: '#184785',
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: '2%'
    },
    warningText: {
        color: '#8B0016',
        fontWeight: 'bold',
        fontSize: 14,
    },
    buttonView: {
        flex: 10,
        alignItems: 'center',
    },
    buttonSubmitBoxView: {
        height: '13%',
        width: '60%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B4F93'
    },
    buttonBoxText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        letterSpacing: 3
    },
    inputPasswordView: {
        flex: 7,
    },
    inputPasswordBoxView: {
        flexDirection: 'row',
        height: '25%',
        width: '78%',
        borderWidth: 3,
        borderRadius: 15,
        marginTop: '6%',
        paddingHorizontal: '3%',
        backgroundColor: '#F8E9DBFF',
        alignSelf: "center",
    },
    buttonChangeBoxView: {
        height: '16%',
        width: '60%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1B4F93'
    }
})
