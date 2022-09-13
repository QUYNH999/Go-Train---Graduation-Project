import React, {useEffect, useState} from "react";
import {Animated, Dimensions, Image, Text, TouchableOpacity, View} from "react-native";
import {avatarManagementStyles} from "./avatarManagementStyles";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import {SELECT_IMAGE, TAKE_PHOTO} from "./definition/avatarManagementDefinitions";
import {useDispatch, useSelector} from "react-redux";
import {saveAvatar} from "../../../../../reduxSagaShop/action/appActions";
import Account from "../../../../../common/entity/account/Account";
import saveUserAvatar from "server/src/database/topic/userAvatar/saveUserAvatar";
import LoadingIndicator from "../../../../../common/component/loadingIndicator/LoadingIndicator";

export const AvatarManagement = (props) => {

    const [slideAnim] = useState(new Animated.Value(-700))
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const appReducer = useSelector(state => state.appReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        Animated.spring(
            slideAnim,
            {
                toValue: 0,
                duration: 1000,
            }
        ).start()

    }, [])

    useEffect(() => {
        if (url) saveAvatarURL()
    }, [url])

    const avatar = () => (
        <View style={avatarManagementStyles.avatarView}>
            <View style={avatarManagementStyles.avatarRim}>
                {avatarFrameContent()}
            </View>
        </View>
    )

    const avatarFrameContent = () => (
        image === null
        ? <Icon
                name='person'
                size={(30 * Dimensions.get('screen').height) / 100}
                color='grey'
                style={{alignSelf: 'center', resizeMode: 'cover'}}
            />
            :
            <Image
                source={{uri: image?.path}}
                style={{flex: 1, borderRadius: 200}}
            />
    )

    const buttonArea = () => (
        <View style={avatarManagementStyles.buttonAreaView}>
            {selectImageAndTakePhotoView()}
            {acceptButton()}
        </View>
    )

    const selectImageAndTakePhotoView = () => (
        <View style={avatarManagementStyles.selectionsView}>
            {selectionButton('perm-media', SELECT_IMAGE)}
            {selectionButton('photo-camera', TAKE_PHOTO)}
        </View>
    )

    const selectionButton = (iconName, contentButton) => (
        <Animated.View style={[avatarManagementStyles.selectionButtonView, {marginLeft: slideAnim}]}>
            <View style={avatarManagementStyles.iconView}>
                <Icon name={iconName} size={25} color='#009298'
                />
            </View>
            <TouchableOpacity
                style={avatarManagementStyles.selectionButtonContentView}
                onPress={() => {
                    openGalleryOrCamera(contentButton)
                }}
            >
                <Text style={avatarManagementStyles.selectionButtonContentText}>{contentButton}</Text>
            </TouchableOpacity>
        </Animated.View>
    )

    const openGalleryOrCamera = (contentButton) => {
        if (contentButton == SELECT_IMAGE) {
            ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
            }).then(image => {
                setImage(image);
            });
        }
        if (contentButton == TAKE_PHOTO) {
            ImagePicker.openCamera({
                width: 400,
                height: 400,
                cropping: true,
            }).then(image => {
                setImage(image);
            });
        }
    }

    const acceptButton = () => (
        <View style={avatarManagementStyles.acceptButtonView}>
            <TouchableOpacity
                style={[avatarManagementStyles.acceptButton, {opacity: image ? 1 : 0.6}]}
                disabled={!image}
                onPress={uploadImage}
            >
                <Text style={avatarManagementStyles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
        </View>
    )

    async function uploadImage(){
        setIsLoading(true)
        const uploadUri = image?.path;
        const filename = 'user_avatar/' + appReducer.account.phoneNumber + '_avatar'

        try {
            await storage().ref(filename).putFile(uploadUri);
            setUrl(await storage().ref(filename).getDownloadURL())
        } catch (error) {
            console.error(error);
        }
    }

    function saveAvatarURL() {
        dispatch(saveAvatar(new Account(
            appReducer.account.phoneNumber,
            appReducer.account.fullname,
            appReducer.account.password,
            url
        )))
        saveUserAvatar(appReducer.account.phoneNumber, url)
        setUrl(null)
        setIsLoading(false)
        props.navigation.goBack()
    }

    return (
        <View style={avatarManagementStyles.container}>
            {isLoading && <LoadingIndicator/>}
            {avatar()}
            {buttonArea()}
        </View>
    )
}
