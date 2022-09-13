export default function resetNavigation(navigation, tabScreen) {
    navigation.reset({
        index: 0,
        routes: [{ name: tabScreen }],
    })
}
