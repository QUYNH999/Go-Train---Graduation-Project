import resetNavigation from "./resetNavigation";

export default function closeScreenWhenLoggedOut(isLogin, navigation, tabScreen) {
    if(!isLogin){
        resetNavigation(navigation, tabScreen)
    }
}
