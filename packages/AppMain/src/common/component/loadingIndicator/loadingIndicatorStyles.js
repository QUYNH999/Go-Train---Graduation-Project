import { Dimensions, StyleSheet } from "react-native";

export const loadingIndicatorStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        position: 'absolute',
        zIndex: 1,
    },
    backgroundView: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.4,
        position: 'absolute',
    }
})
