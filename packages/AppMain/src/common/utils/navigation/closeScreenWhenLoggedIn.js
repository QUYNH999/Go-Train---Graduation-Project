import resetNavigation from "./resetNavigation";

export default function closeScreenWhenLoggedIn(isLogin, navigation, tabScreen) {
    if(isLogin){
        resetNavigation(navigation, tabScreen)
    }
}
