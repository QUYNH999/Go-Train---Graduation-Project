import React, {Component} from "react";
import {Animated, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DropDownPicker from "react-native-custom-dropdown";
import {shoppingCartStyles} from "./shoppingCartStyles";
import TrainDiagram from "./trainDiagram/TrainDiagram";
import getCurrentDateFromTimeServer from "server/src/api/topic/currentDate/getCurrentDateFromTimeServer";
import getAllVouchersItems from "server/src/database/topic/voucher/getAllVouchersItems";
import {ADULT} from "./trainDiagram/definition/shoppingCartDefinitions";
import getAllDefaultPrices from "server/src/api/topic/defaultPrice/getAllDefaultPrices";
import LoadingIndicator from "../../../../common/component/loadingIndicator/LoadingIndicator";
import {connect} from "react-redux";
import {BackFromPayment} from "./utils/BackFromPayment";
import {PAYMENT, PROFILE} from "../../../../navigator/definition/navigatorDefinitions";
import {bindActionCreators} from "redux";
import {saveIsShoppingCartReady, saveSelectedVoucher} from "../../../../reduxSagaShop/action/appActions";

const positionX = 0;
const trainPosition = new Animated.ValueXY({x: positionX, y: 1400});
const getTrainBackAnimation = Animated.timing(
        trainPosition,
        {
            toValue: {x: positionX, y: 50},
            duration: 500,
        });

class ShoppingCart extends Component{

    state = {
        isLoading: true,
        boughtSeats: [],
        selectedAdultSeats: [],
        selectedChildSeats: [],
        defaultAdultPrice: 0,
        defaultChildPrice: 0,
        voucherItems: [],
        isLoginRequired: false,
    }

    _order = this.props.route.params.order;
    _listedPrice = 0;
    _discount = 0;

    async componentDidMount() {
        const defaultPrice = await getAllDefaultPrices()
        this._setDefaultPrice(defaultPrice)
        const today = await getCurrentDateFromTimeServer()
        getAllVouchersItems(this._setVoucherItems, today)
        this._moveTrain(0)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.isLoginRequired){
            this.props.saveIsShoppingCartReady(true)
            this.setState({isLoginRequired: false})
        }
    }

    render() {
        this._listedPrice = this._getListedPrice()
        this._discount = this._getDiscount(this._listedPrice)
        return(
            <View style={shoppingCartStyles.container}>
                {!this.state.isLoading && <BackFromPayment moveTrain={this._moveTrain}/>}
                {this.state.isLoading && <LoadingIndicator/>}
                <View style={shoppingCartStyles.cartBody}>
                    <View style={shoppingCartStyles.cartContent}>
                        {this._renderRailway(this._order.railwayCompany)}
                        {this._renderProvinceJourney(this._order.departureProvince.title, this._order.destinationProvince.title)}
                        {this._renderStationJourney(this._order.departureProvince.station, this._order.destinationProvince.station)}
                        {this._renderInterval(this._order.departureDay, this._order.departureTime)}
                        {this._renderSeats()}
                        {this._renderListedPrice(this._listedPrice)}
                        {this._renderVoucher()}
                        {this._renderDiscount(this._discount)}
                        {this._renderTotalPrice(this._listedPrice, this._discount)}
                    </View>
                    <View style={shoppingCartStyles.trainView}>
                        {this._renderTrainDiagram()}
                    </View>
                </View>
                {this._renderBooknowButton(this._listedPrice)}
            </View>
        )
    }

    _setDefaultPrice = (defaultPrice) => {
        this.setState({
            defaultAdultPrice: defaultPrice.adultPrice,
            defaultChildPrice: defaultPrice.childPrice
        })
    }

    _setVoucherItems = (collectedVoucherItems) => {
        this.setState({
            voucherItems: collectedVoucherItems,
            isLoading: false
        })
    }

    _getListedPrice = () => {
        const {selectedAdultSeats, selectedChildSeats, defaultAdultPrice, defaultChildPrice} = this.state
        return (selectedAdultSeats.length*defaultAdultPrice) + (selectedChildSeats.length*defaultChildPrice)
    }

    _getDiscount = (listedPrice) => (listedPrice * this.props.appReducer.selectedVoucher.value)/100

    _renderRailway = (railwayCompany) => (
        <View style={shoppingCartStyles.railwayView}>
            <Image source={railwayCompany.image} style={{width: '20%', height: '115%'}}/>
            <Text style={[shoppingCartStyles.generalText, {fontSize: 23}]}>{railwayCompany.name}</Text>
        </View>
    )

    _renderProvinceJourney = (departureProvinceName, destinationProvinceName) => (
        <View style={{alignItems: 'center'}}>
            <Text style={[shoppingCartStyles.generalText, {fontSize: 23}]}>{departureProvinceName}</Text>
            <Icon name='south' color='white' size={30}/>
            <Text style={[shoppingCartStyles.generalText, {fontSize: 23}]}>{destinationProvinceName}</Text>
        </View>
    )

    _renderStationJourney = (departureStation, destinationStation) => (
        <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                {this._renderIcon('location-city')}
                <Text style={[shoppingCartStyles.generalText, {fontSize: 19}]}>{departureStation} Station</Text>
            </View>
            <Icon name='south' color='white' size={30}/>
            <View style={{flexDirection: 'row'}}>
                {this._renderIcon('location-city')}
                <Text style={[shoppingCartStyles.generalText, {fontSize: 19}]}>{destinationStation} Station</Text>
            </View>
        </View>
    )

    _renderInterval = (departureDay, departureTime) => (
        <View style={{flexDirection: "row"}}>
            {this._renderIcon('schedule')}
            <Text style={[shoppingCartStyles.generalText, {fontSize: 19}]}>{departureDay}</Text>
            <Text style={[shoppingCartStyles.generalText, {fontSize: 19}]}> -- </Text>
            <Text style={[shoppingCartStyles.generalText, {fontSize: 19}]}>{departureTime}</Text>
        </View>
    )

    _renderSeats = () => {
        const adultSeatsString = this._convertIntoString(this.state.selectedAdultSeats)
        const childSeatsString = this._convertIntoString(this.state.selectedChildSeats)
        return (
            <View style={{flexDirection: "row"}}>
                {this._renderIcon('airline-seat-recline-normal')}
                <Text style={[shoppingCartStyles.generalText, {fontSize: 20}]}>
                    Seats:
                    <Text> </Text>
                    {adultSeatsString}
                    {
                        (childSeatsString != undefined && adultSeatsString != undefined)
                        &&
                        <Text>, </Text>
                    }
                    {childSeatsString}
                </Text>
            </View>
        )
    }

    _updateSeatList = (seats, ticketType) => {
        if(ticketType === ADULT){
            this.setState({selectedAdultSeats: seats})
        }else {
            this.setState({selectedChildSeats: seats})
        }
    }

    _convertIntoString = (selectedSeats) => {
        let seatString = selectedSeats[0]
        for (let index in selectedSeats){
            if (index == 0) continue
            seatString += ', ' + selectedSeats[index]
        }
        return seatString
    }

    _renderListedPrice = (listedPrice) => (
        <View style={{flexDirection: "row"}}>
            {this._renderIcon('payments')}
            <Text style={[shoppingCartStyles.generalText, {fontSize: 20, marginLeft: '3%'}]}>
                Listed price: {listedPrice/1000}k
            </Text>
        </View>
    )

    _renderVoucher = () => (
        <View style={{flexDirection: "row"}}>
            {this._renderIcon('receipt-long')}
            <DropDownPicker
                items={this.state.voucherItems}
                containerStyle={{height: 40, width: '85%'}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{justifyContent: 'flex-start'}}
                dropDownStyle={{backgroundColor: '#fafafa', height: '250%'}}
                onChangeItem={voucherItem => {
                    this.props.saveSelectedVoucher(voucherItem)
                }}
            />
            <View style={shoppingCartStyles.dropDownPickerLabelView}>
                <Text>{this.props.appReducer.selectedVoucher?.label}</Text>
            </View>
        </View>
    )

    _renderDiscount = (discount) => (
        <View style={shoppingCartStyles.discountView}>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
                {this._renderIcon('request-quote')}
                <Text style={{fontSize: 19, fontWeight: 'bold'}}>Discount: -{discount/1000}k</Text>
            </View>
        </View>
    )

    _renderTotalPrice = (listedPrice, discount) => (
        <View style={{flexDirection: "row"}}>
            <FontAwesome5Icon  name='coins' color='black' size={30}/>
            <Text style={[shoppingCartStyles.generalText, {fontSize: 20, marginLeft: '3%'}]}>
                Total price: {(listedPrice - discount)/1000}k
            </Text>
        </View>
    )

    _renderBooknowButton = () => {
        const isSeatUnselected = (this.state.selectedAdultSeats.length < 1 && this.state.selectedChildSeats.length < 1)
        return (
            <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
                <TouchableOpacity
                    style={[
                        shoppingCartStyles.booknowButton,
                        {opacity: isSeatUnselected ? 0.5 : 1}
                    ]}
                    disabled={isSeatUnselected}
                    onPress={() => {
                        if(!this.props.appReducer.isLogin){
                            this.setState({isLoginRequired: true})
                            this.props.navigation.jumpTo(PROFILE)
                        }else {
                            this._moveTrain(-1300,true)
                        }
                    }}
                >
                    <Text style={shoppingCartStyles.booknowText}>Book now</Text>
                    {this._renderIcon('near-me')}
                </TouchableOpacity>
            </View>
        )
    }

    _renderIcon = (name) => <Icon name={name} color='black' size={30}/>

    _moveTrain = (toY, slowBack = false) => {
        const runTrainAnimation = Animated.timing(
            trainPosition,
            {
                toValue: {x: positionX, y: toY},
                duration: 2000,
            }
        );
        if(slowBack){
            Animated.sequence([getTrainBackAnimation, runTrainAnimation])
                    .start(() => {
                        this.props.navigation.navigate(PAYMENT, {order: this._getModifiedOrder()})
                    });
        }else {
            Animated.sequence([runTrainAnimation]).start();
        }
    }

    _getModifiedOrder = () => {
        this._order.adultTickets = this.state.selectedAdultSeats
        this._order.childTickets = this.state.selectedChildSeats
        this._order.defaultAdultPrice = this.state.defaultAdultPrice
        this._order.defaultChildPrice = this.state.defaultChildPrice
        this._order.discountRate = this.props.appReducer.selectedVoucher.value
        this._order.boughtSeats = this.state.boughtSeats
        this._order.placeTimePoint = this._getPlaceTimePoint()
        return this._order
    }

    _renderTrainDiagram = () => (
        <View style={shoppingCartStyles.trainRunningSpace}>
            <ScrollView>
                <Animated.View
                    style={{transform: [{ translateX: trainPosition.x}, {translateY: trainPosition.y}]}}
                >
                    <TrainDiagram
                        placeTimePoint = {this._getPlaceTimePoint()}
                        railwayCompanyId = {this.props.route.params.order.railwayCompany.id}
                        updateSeatList = {this._updateSeatList}
                        sendBoughtSeatsToShoppingCart = {(collectedBoughtSeats) => {this.setState({boughtSeats: collectedBoughtSeats})}}
                    />
                </Animated.View>
            </ScrollView>
        </View>
    )

    _getPlaceTimePoint = () => {
        const [day, month, year] = this._order.departureDay.split('/')
        const [hour, minute] = this._order.departureTime.split(':')
        return [
            this._order.departureProvince.title.replace(/\s/g, '').toLowerCase(),
            this._order.destinationProvince.title.replace(/\s/g, '').toLowerCase(),
            day, month, year,
            hour, minute
        ].join('_')
    }
}

const mapStateToProps = ({appReducer}) => ({appReducer})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({saveIsShoppingCartReady, saveSelectedVoucher},dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
