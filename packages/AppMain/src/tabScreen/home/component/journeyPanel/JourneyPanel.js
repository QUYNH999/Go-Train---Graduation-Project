import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DropDownPicker from "react-native-custom-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import {journeyPanelStyles} from "./journeyPanelStyles";
import MapView, {Marker} from "react-native-maps";
import getAllDepartureTimes from "server/src/database/topic/departureTime/getAllDepartureTimes";
import Order from "../../../../common/entity/order/Order";
import LoadingIndicator from "../../../../common/component/loadingIndicator/LoadingIndicator";
import {SHOPPING_CART} from "../../../../navigator/definition/navigatorDefinitions";
import getCurrentDateTimeFromTimeServer from "server/src/api/topic/currentDateTime/getCurrentDateTimeFromTimeServer";
import getShortFormatToday from "./journeyPanelUtils/getShortFormatToday";

export default class JourneyPanel extends Component {

    state = {
        isLoading: true,
        fullFormatToday: null,
        departureTimes: [],
        validDepartureTimes: [],
        selectedDepartureTime: null,
        isCalendarShown: false,
        today: null,
        //new Date('1970-01-01') is just an initial value to make sure calendar does not crash
        selectedDepartureDay: new Date('1970-01-01'),
    }

    async componentDidMount() {
        const fullFormatCurrentDay = await getCurrentDateTimeFromTimeServer()
        this.setState({fullFormatToday: fullFormatCurrentDay})
        this._setAsToday(getShortFormatToday(fullFormatCurrentDay))
        getAllDepartureTimes(this._setDepartureTimes)
    }

    render() {
        const {fromProvince, toProvince, railwayCompany} = this.props.route.params
        return (
            <View style={journeyPanelStyles.container}>
                {this.state.isLoading && <LoadingIndicator/>}
                {this._renderTrainCompanyView(railwayCompany)}
                {this._renderDepartureTimeView()}
                {this._renderCalendar()}
                {this._renderGeneralTrainStationView(fromProvince, toProvince)}
                {this._renderTrainMap(fromProvince, toProvince)}
                {this._renderGetOnBoardButton()}
            </View>
        )
    }

    _renderTrainCompanyView(railwayCompany) {
        return (
            <View style={journeyPanelStyles.trainCompanyView}>
                <View style={journeyPanelStyles.trainCompanyLogoImageView}>
                    <Image
                        source={railwayCompany.image}
                        style={journeyPanelStyles.trainCompanyLogoImage}
                    />
                </View>
                <View style={journeyPanelStyles.trainCompanyNameView}>
                    <Text style={journeyPanelStyles.trainCompanyNameText}>{railwayCompany.name}</Text>
                </View>
            </View>
        )
    }

    _setDepartureTimes = (collectedDepartureTimes) => {
        this.setState({
            departureTimes: collectedDepartureTimes,
            validDepartureTimes: this._isTodaySelected() ? this._getValidDepartureTimes(collectedDepartureTimes) : collectedDepartureTimes,
            isLoading: false
        })
    }

    _isTodaySelected = () => (this.state.today.toLocaleDateString() == this.state.selectedDepartureDay.toLocaleDateString())

    _getValidDepartureTimes = (collectedDepartureTimes) => {
        const collectedValidDepartureTimes = []
        collectedDepartureTimes.filter((departureTime) => {
            if (departureTime.value.split(':')[0] > this.state.fullFormatToday.hour) {
                collectedValidDepartureTimes.push(departureTime)
            } else if (departureTime.value.split(':')[0] == this.state.fullFormatToday.hour) {
                if (departureTime.value.split(':')[1] > this.state.fullFormatToday.minute) {
                    collectedValidDepartureTimes.push(departureTime)
                }
            }
        })
        return collectedValidDepartureTimes
    }

    _renderDepartureTimeView() {
        const {selectedDepartureDay} = this.state
        return (
            <View style={journeyPanelStyles.departureTimeView}>
                <DropDownPicker
                    items={this.state.validDepartureTimes}
                    placeholder={this._renderDepartureTimePlaceHolder()}
                    containerStyle={{height: '100%', width: '48%'}}
                    style={{backgroundColor: '#fafafa',}}
                    itemStyle={{justifyContent: 'center'}}
                    dropDownStyle={{backgroundColor: '#fafafa', height: 500}}
                    onChangeItem={departureTime => {
                        this.setState({selectedDepartureTime: departureTime})
                    }}
                />

                <TouchableOpacity
                    style={journeyPanelStyles.departureDayPicker}
                    onPress={() => {
                        this.setState({isCalendarShown: true})
                    }}
                >
                    <Icon name='event-note' size={30} color='#4E3F8A'/>
                    <Text style={{marginLeft: '8%'}}>
                        {
                            [selectedDepartureDay.getDate(),
                                selectedDepartureDay.getMonth() + 1,
                                selectedDepartureDay.getFullYear()
                            ].join('/')
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderDepartureTimePlaceHolder = () => (
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Icon name='schedule' size={30} color='#4E3F8A'/>
            <Text>Departure time</Text>
        </View>
    )

    _setAsToday = (shortFormatToday) => {
        const todayOfDateType = new Date([
            shortFormatToday.month,
            shortFormatToday.day,
            shortFormatToday.year
        ].join('/'))
        this.setState({
            selectedDepartureDay: todayOfDateType,
            today: todayOfDateType,
        })
    }

    _renderCalendar = () => (
        this.state.isCalendarShown
        &&
        <DateTimePicker
            value={this.state.selectedDepartureDay}
            minimumDate={this.state.today}
            mode="date"
            onChange={(event, date) => {
                this.setState({
                    isCalendarShown: false,
                    selectedDepartureDay: date,
                })

                if (this._isTodaySelected()) {
                    this.setState({
                        validDepartureTimes: this._getValidDepartureTimes(this.state.departureTimes)
                    })
                }
                else {
                    this.setState({
                        validDepartureTimes: this.state.departureTimes
                    })
                }
            }}
        />
    )

    _renderGeneralTrainStationView(fromProvince, toProvince) {
        return (
            <View style={journeyPanelStyles.generalTrainStationView}>
                <View style={journeyPanelStyles.fromOrToTrainStationView}>
                    <Image
                        source={fromProvince.image}
                        style={journeyPanelStyles.provinceImage}
                    />
                    <Text style={journeyPanelStyles.trainStationNameText}>{fromProvince.station} Station</Text>
                </View>
                <View style={journeyPanelStyles.arrowView}>
                    <Icon name='trending-flat' color='black' size={60}/>
                </View>
                <View style={journeyPanelStyles.fromOrToTrainStationView}>
                    <Image
                        source={toProvince.image}
                        style={journeyPanelStyles.provinceImage}
                    />
                    <Text style={journeyPanelStyles.trainStationNameText}>{toProvince.station} Station</Text>
                </View>
            </View>
        )
    }

    _renderTrainMap(fromProvince, toProvince) {
        return (
            <View style={journeyPanelStyles.trainMapView}>
                <View style={journeyPanelStyles.mapProvinceView}>
                    {this._renderMapForm(fromProvince.latitude, fromProvince.longitude, 'Departure Station')}
                </View>

                <View style={{flex: 2, backgroundColor: '#e3e3e3'}}></View>

                <View style={journeyPanelStyles.mapProvinceView}>
                    {this._renderMapForm(toProvince.latitude, toProvince.longitude, 'Destination Station')}
                </View>
            </View>
        )
    }

    _renderMapForm(latitude, longitude, title) {
        return (
            <MapView
                style={{flex: 1}}
                provider={'google'}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                }}
                zoomEnabled={true}
                showsUserLocation={false}
                followsUserLocation={false}
            >
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude
                    }}
                    title={title}
                >
                    <Icon
                        name='subway'
                        size={30}
                        color='#7D26CD'
                    />
                </Marker>
            </MapView>
        )
    }

    _renderGetOnBoardButton() {
        const isSelectedDepartureTimeNull = (this.state.selectedDepartureTime === null)
        const {railwayCompany, fromProvince, toProvince} = this.props.route.params
        const {selectedDepartureDay} = this.state
        return (
            <TouchableOpacity
                style={[journeyPanelStyles.getOnboardButton, {opacity: isSelectedDepartureTimeNull ? 0.5 : 1}]}
                disabled={isSelectedDepartureTimeNull}
                onPress={() => {
                    this.props.navigation.navigate(
                        SHOPPING_CART,
                        {
                            order: new Order(
                                railwayCompany,
                                fromProvince,
                                toProvince,
                                [
                                    selectedDepartureDay.getDate(),
                                    selectedDepartureDay.getMonth() + 1,
                                    selectedDepartureDay.getFullYear()
                                ].join('/'),
                                this.state.selectedDepartureTime.value
                            )
                        }
                    )
                }}
            >
                <View style={journeyPanelStyles.getOnboardButtonView}>
                    <Text style={journeyPanelStyles.getOnboardText}>Get Onboard</Text>
                    <View style={journeyPanelStyles.getOnboardIconView}>
                        <Icon
                            name='directions-walk'
                            size={25}
                            style={{color: 'black'}}
                        />
                        <Icon
                            name='train'
                            size={30}
                            style={{color: 'black'}}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
