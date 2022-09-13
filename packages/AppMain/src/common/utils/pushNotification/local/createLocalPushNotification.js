import PushNotification from "react-native-push-notification";
import convertIntoDateTimeString from "./convertIntoDateTimeString";

const DEFAULT_SQUARE_COLOR = '#7e20a1'

export default function createLocalPushNotification(channelId, title, bigText, currentDateTime,
                                                    message = '', color = DEFAULT_SQUARE_COLOR,
                                                    data = {}) {

    PushNotification.localNotification({
        channelId: channelId,
        title: title,
        bigText: bigText,
        subText: convertIntoDateTimeString(currentDateTime),
        message: message,
        color: color,
        data: data,
        largeIcon: "ic_launcher_round",
    });
}
