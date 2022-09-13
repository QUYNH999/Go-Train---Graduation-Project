import {child, get, ref} from "firebase/database";
import {database} from "../../config/database";

let isLogin, isPhoneNumberRegistered, isPasswordCorrect, fullname = '', avatarURL = ''
const reference = ref(database)

export default function checkValidUserAccount (setLoginInfo, phoneNumber, password) {
    get(child(reference, 'account/' + phoneNumber)).then((userAccount) => {
        if(!userAccount.exists()){
            isLogin = false
            isPhoneNumberRegistered = false
            isPasswordCorrect = false
        }else {
            if(userAccount.val().password == password) {
                isLogin = true
                isPhoneNumberRegistered = true
                isPasswordCorrect = true
                fullname = userAccount.val().fullname
                avatarURL = userAccount.val().avatarURL || ''
            }
            else if (userAccount.val().password != password) {
                isLogin = false
                isPhoneNumberRegistered = true
                isPasswordCorrect = false
            }
        }
        setLoginInfo(isLogin, isPhoneNumberRegistered, isPasswordCorrect, fullname, avatarURL)
    })
}
