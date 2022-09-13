import PushNotification from "react-native-push-notification";

export default function createLocalChannels(channelId) {
    PushNotification.createChannel(
        {
            channelId: channelId,
            channelName: channelId
        }
    )
}
