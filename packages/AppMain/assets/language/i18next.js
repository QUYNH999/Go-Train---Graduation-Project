import i18next from "i18next";
import english from "./english.json"
import vietnamese from "./vietnamese.json"
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: english,
        vn: vietnamese,
    },
    react: {
        useSuspense: false,
    },
}).then(() => {})

export default i18next
