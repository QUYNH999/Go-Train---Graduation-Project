import React, {Component} from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    Keyboard,
    LayoutAnimation,
    NativeModules,
    Text, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {homeDetailStyles} from "./homeDetailStyles";
import {provinces} from "./province/provinces";
import {subRenderCompany} from "./homeDetailFactory/subRenderCompany";
import getAllRailwayCompanies from "server/src/database/topic/railwayCompany/getAllRailwayCompanies";
import LoadingIndicator from "../../../../common/component/loadingIndicator/LoadingIndicator";
import {connect} from "react-redux";
import {JOURNEY_PANEL, SUPPORT} from "../../../../navigator/definition/navigatorDefinitions";

const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)

class HomeDetail extends Component {

    state = {
        isLoading: true,
        railwayCompanies: [],
        areCompaniesReceived: false,
        fromProvince: {},
        toProvince: {},
        logoHeight: 0,
        logoWidth: 0
    }

    componentDidMount() {
        getAllRailwayCompanies(this._setRailwayCompanies)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.areCompaniesReceived && this.state.logoHeight == 0 && this.state.logoWidth == 0) {
            setTimeout(() => {
                LayoutAnimation.spring()
                this.setState({
                    logoHeight: this.state.logoHeight + 140,
                    logoWidth: this.state.logoWidth + 140
                })
            }, 900)
            this.setState({areCompaniesReceived: false})
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground
                    source={require('./image/homepageBackground.webp')}
                    style={homeDetailStyles.container}
                >
                    <View style={homeDetailStyles.container}>
                        {this.state.isLoading && <LoadingIndicator/>}
                        {this._renderUserBox()}
                        {this._renderSelectView()}
                        {this._renderCompanyBox()}
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }

    _setRailwayCompanies = (collectedRailwayCompanies) => {
        this.setState({
            railwayCompanies: collectedRailwayCompanies,
            areCompaniesReceived: true,
            isLoading: false
        })
    }

    _renderUserBox() {
        return (
            <View style={homeDetailStyles.supportAndUserView}>
                <TouchableOpacity
                    style={homeDetailStyles.supportView}
                    onPress={() => {this.props.navigation.navigate(SUPPORT)}}
                >
                    <MaterialIcon style={{alignSelf: "center"}} name="support-agent" size={50} color='#4E3F8A'/>
                    <Text style={homeDetailStyles.supportAndUserText}>Support</Text>
                </TouchableOpacity>
                <View style={homeDetailStyles.userNameView}>
                    <Text style={homeDetailStyles.supportAndUserText}>{this._renderUserName()}</Text>
                    {this._renderAvatarViewContent()}
                </View>
            </View>
        )
    }

    _renderUserName = () => (
        this.props.appReducer.account.fullname || 'Hi There'
    )

    _renderAvatarViewContent = () => (
        this.props.appReducer.account.avatarURL == ''
            ?
            <MaterialIcon
                name="account-circle"
                size={50}
                color='#4E3F8A'
            />
            :
            <View style={
                {
                    height: (5.5 * Dimensions.get('screen').height) / 100,
                    width: (5.5 * Dimensions.get('screen').height) / 100,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: '#898989',
                    marginLeft: '2%'
                }
            }
            >
                <Image
                    source={{uri: this.props.appReducer.account.avatarURL}}
                    style={{flex: 1, borderRadius: 100}}
                />
            </View>
    )

    _renderSelectView() {
        return (
            <View style={homeDetailStyles.selectionAreaView}>
                <View style={homeDetailStyles.dropdownView}>
                    <AutocompleteDropdown
                        clearOnFocus={false}
                        closeOnBlur={true}
                        closeOnSubmit={false}
                        rightButtonsContainerStyle={{marginLeft: -8}}
                        containerStyle={{marginHorizontal: -4}}
                        onSelectItem={(province) => {
                            this.setState({fromProvince: province})
                        }}
                        dataSet={provinces}
                    />
                </View>
                <View style={homeDetailStyles.directionTrainIndicatorView}>
                    <Image
                        source={require('./image/train.png')}
                        style={{height: '60%', width: '100%', resizeMode: 'stretch'}}
                    />
                </View>
                <View style={homeDetailStyles.dropdownView}>
                    <AutocompleteDropdown
                        clearOnFocus={false}
                        closeOnBlur={true}
                        closeOnSubmit={false}
                        rightButtonsContainerStyle={{marginLeft: -8}}
                        containerStyle={{marginHorizontal: -4}}
                        onSelectItem={(province) => {
                            this.setState({toProvince: province})
                        }}
                        dataSet={provinces}
                    />
                </View>
            </View>
        )
    }

    _renderCompanyBox() {
        return (
            <View style={homeDetailStyles.companyBox}>
                {
                    [0, 1].map((column) => {
                        return (
                            this._renderCompanyColumn(column)
                        )
                    })
                }
            </View>
        )
    }

    _renderCompanyColumn(column) {
        return (
            <View style={homeDetailStyles.companyColumn}>
                {
                    this.state.railwayCompanies.map((railwayCompany, index) => {
                        if (index % 2 === column) {
                            return this._renderCompany(railwayCompany)
                        }
                    })
                }
            </View>
        )
    }

    _renderCompany(railwayCompany) {
        const {fromProvince, toProvince, logoHeight, logoWidth} = this.state
        return subRenderCompany(railwayCompany, logoHeight, logoWidth, fromProvince, toProvince, this._goJourneyPanelScreen)
    }

    _goJourneyPanelScreen = (railwayCompany, fromProvince, toProvince) => {
        this.props.navigation.navigate(JOURNEY_PANEL, {railwayCompany, fromProvince, toProvince})
    }
}

const mapStateToProps = ({appReducer}) => ({appReducer})

export default connect(mapStateToProps)(HomeDetail)
