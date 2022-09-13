import Sound from "react-native-sound";

const phoneRingSound = require("../audio/phoneRingSound.mp3");

export default function loadPhoneRingFile() {
    return new Sound(phoneRingSound, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.error('Failed to load the sound', error);
        }
    });
}
