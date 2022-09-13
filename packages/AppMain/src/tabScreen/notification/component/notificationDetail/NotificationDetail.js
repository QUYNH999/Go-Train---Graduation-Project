import React, {Component} from "react";
import {FlatList, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {notificationDetailStyles} from "./notificationDetailStyles";
import getAllBookingHistoryItems from "server/src/database/topic/bookingHistory/getAllBookingHistoryItems";
import getAllVouchersItems from "server/src/database/topic/voucher/getAllVouchersItems";
import Icon from "react-native-vector-icons/MaterialIcons";
import SwitchSelector from "react-native-switch-selector";
import {CANCELLED_BOOKING, SUCCESSFUL_BOOKING, VOUCHER} from "./definition/titleDefinitions";
import {BOOKING_HISTORY} from "./definition/switchDefinitions";
import {connect} from "react-redux";
import getCurrentDateFromTimeServer from "server/src/api/topic/currentDate/getCurrentDateFromTimeServer";
import LoadingIndicator from "../../../../common/component/loadingIndicator/LoadingIndicator";
import Order from "../../../../common/entity/order/Order";
import Province from "../../../home/component/homeDetail/province/Province";
import {RailwayCompany} from "server/src/database/topic/railwayCompany/RailwayCompany";
import {HOME, TICKET} from "../../../../navigator/definition/navigatorDefinitions";
import {bindActionCreators} from "redux";
import {saveSelectedVoucher} from "../../../../reduxSagaShop/action/appActions";
import {NotificationDetailFocused} from "./utils/NotificationDetailFocused";

const options = [
    {label: BOOKING_HISTORY, value: BOOKING_HISTORY},
    {label: VOUCHER, value: VOUCHER},
]

class NotificationDetail extends Component {

    state = {
        isLoading: true,
        selector: BOOKING_HISTORY,
        voucherItems: [],
        bookingHistoryItems: [],
        isExistingBookingHistoryItems: true,
        isExistingVoucherItems: true
    }

    async componentDidMount() {
        const today = await getCurrentDateFromTimeServer()
        getAllVouchersItems(this._setAllVoucherItems, today)
        getAllBookingHistoryItems(this._setAllBookingHistoryItems, this.props.appReducer.account.phoneNumber)
    }

    render() {
        return (
            <View style={notificationDetailStyles.container}>
                {this.state.isLoading && <LoadingIndicator/>}
                <NotificationDetailFocused/>
                <ImageBackground
                    source={this._getBackgroundImageSource()}
                    style={{
                        alignSelf: 'stretch',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    {this._renderSwitchSelector()}
                    {
                        this.state.selector == BOOKING_HISTORY
                            ? this._renderBookingHistory()
                            : this._renderVoucher()
                    }
                </ImageBackground>
            </View>
        )
    }

    _getBackgroundImageSource() {
        switch (this.state.selector) {
            case BOOKING_HISTORY: return require('./image/bookingHistoryBackground.jpg')
            case VOUCHER: return require('./image/voucherBackground.webp')
            default: return 'help-center'
        }
    }

    _renderSwitchSelector = () => (
        <SwitchSelector
            style={{padding: 24}}
            options={options}
            hasPadding
            initial={0}
            textColor='#551A8B'
            selectedTextStyle={{fontSize: 17, fontWeight: 'bold'}}
            selectedColor='white'
            buttonColor='#9A32CD'
            borderColor='#551A8B'
            onPress={(value) => {this.setState({selector: value})}}
        />
    )

    _renderBookingHistory = () => {
        if (this.state.isExistingBookingHistoryItems == false) {
            return this._renderNotFound('Booking History')
        }
        return (
            <FlatList
                data={this.state.bookingHistoryItems}
                keyExtractor={(notificationItem, index) => index.toString()}
                renderItem={this._renderNotificationBox}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    _renderVoucher = () => {
        if (this.state.isExistingVoucherItems == false) {
            return this._renderNotFound('Voucher')
        }
        return(
            <FlatList
                data={this.state.voucherItems}
                keyExtractor={(notificationItem, index) => index.toString()}
                renderItem={this._renderNotificationBox}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    _renderNotFound = (type) => (
        <View style={notificationDetailStyles.notFoundView}>
            <Text style={notificationDetailStyles.notFoundText}>{type} NOT found</Text>
        </View>
    )

    _renderNotificationBox = ({item}) => {
        return (
            // An item is a notificationItem
            <TouchableOpacity
                style={notificationDetailStyles.notificationBox}
                onPress={() => {
                    if (item.title === 'Voucher') {
                        this.props.navigation.jumpTo(HOME)
                        this.props.saveSelectedVoucher(item)
                    }
                    else {
                        this.props.navigation.navigate(TICKET, {
                            order: this._convertIntoOrder(item)
                        })
                    }
                } }
            >
                {this._renderBoxTitle(item.title)}
                {this._renderBoxContent(item)}
            </TouchableOpacity>
        )
    }

    _convertIntoOrder = (bookingHistoryItem) => {
        return new Order(
            new RailwayCompany(
                null,
                bookingHistoryItem.companyName,
                {uri: bookingHistoryItem.companyImage},
                null,
            ),
            new Province(
                null,
                bookingHistoryItem.departureProvince,
                bookingHistoryItem.departureStation,
                null,
                null,
                null,
            ),
            new Province(
                null,
                bookingHistoryItem.destinationProvince,
                bookingHistoryItem.destinationStation,
                null,
                null,
                null,
            ),
            bookingHistoryItem.date,
            bookingHistoryItem.time,
            bookingHistoryItem.adultTickets,
            bookingHistoryItem.childTickets,
            bookingHistoryItem.defaultAdultPrice,
            bookingHistoryItem.defaultChildPrice,
            bookingHistoryItem.discountRate,
        )
    }

    _renderBoxTitle = (title) => (
        <View style={notificationDetailStyles.titleAndIconBox}>
            <View style={notificationDetailStyles.titleBox}>
                <Text style={notificationDetailStyles.titleText}>{title}</Text>
            </View>
            <View style={notificationDetailStyles.iconBox}>
                <Icon
                    name={this._iconType(title)}
                    color={this._iconColor(title)}
                    size={35}
                />
            </View>
        </View>
    )

    _iconType(title) {
        switch (title) {
            case SUCCESSFUL_BOOKING: return 'check-circle'
            case CANCELLED_BOOKING: return 'cancel'
            case VOUCHER: return 'redeem'
            default: return 'help-center'
        }
    }

    _iconColor(title) {
        switch (title) {
            case SUCCESSFUL_BOOKING: return '#AFD788'
            case CANCELLED_BOOKING: return '#EE7C6B'
            case VOUCHER: return '#ff9d9d'
            default: return 'help-center'
        }
    }

    _renderBoxContent = (notificationItem) => (
        <View style={notificationDetailStyles.contentBox}>
            {this._considerTypeOfNotification(notificationItem)}
        </View>
    )

    _considerTypeOfNotification(notificationItem) {
        switch (notificationItem.title){
            case SUCCESSFUL_BOOKING: return this._renderBookingView(notificationItem)
            case CANCELLED_BOOKING: return this._renderBookingView(notificationItem)
            case VOUCHER: return this._renderVoucherView(notificationItem)
        }
    }

    _renderBookingView = (notificationItem) => (
        <View style={notificationDetailStyles.bookingOrVoucherContentView}>
            <View style={notificationDetailStyles.journeyOrDescriptionView}>
                <Icon name='train' size={25} color='#C7C300'/>
                <Text
                    style={notificationDetailStyles.journeyOrDescriptionText}>Journey: {notificationItem.description}</Text>
            </View>
            <View style={notificationDetailStyles.timeView}>
                <Icon name='schedule' size={25} color='#C7C300'/>
                <Text style={notificationDetailStyles.timeAndCodeText}>Time: {notificationItem.time} - {notificationItem.date}</Text>
            </View>
            <View style={notificationDetailStyles.ticketCodeView}>
                <Icon name='qr-code' size={25} color='#C7C300'/>
                <Text style={notificationDetailStyles.timeAndCodeText}>Order Code: {notificationItem.orderCode}</Text>
            </View>
        </View>
    )

    _renderVoucherView = (voucherItem) => (
        <View
            style={notificationDetailStyles.bookingOrVoucherContentView}>
            <View style={notificationDetailStyles.journeyOrDescriptionView}>
                <Icon name='event-note' size={25} color='#C7C300'/>
                <Text style={notificationDetailStyles.journeyOrDescriptionText}>
                    Description: {voucherItem.description}
                </Text>
            </View>
            <View style={notificationDetailStyles.timeView}>
                <Icon name='schedule' size={25} color='#C7C300'/>
                <Text style={notificationDetailStyles.timeAndCodeText}>
                    Time: {voucherItem.startTime} - {voucherItem.deadline}
                </Text>
            </View>
            <View style={notificationDetailStyles.voucherCodeView}>
                <Icon name='qr-code' size={25} color='#C7C300'/>
                <Text style={notificationDetailStyles.voucherCodeTitleText}>Voucher Code: </Text>
                <Text style={notificationDetailStyles.voucherCodeContentText}>{voucherItem.label}</Text>
            </View>
        </View>
    )

    _setAllVoucherItems = (collectedVoucherItems) => {
        if (collectedVoucherItems.length == 0) {
            this.setState({isExistingVoucherItems: false})
        }else{
            this.setState({
                isExistingVoucherItems: true,
                voucherItems: collectedVoucherItems
            })
        }
    }

    _setAllBookingHistoryItems = (collectedBookingHistoryItems) => {
        if (collectedBookingHistoryItems.length == 0) {
            this.setState({ isExistingBookingHistoryItems: false })
        } else {
            this.setState({
                isExistingBookingHistoryItems: true,
                bookingHistoryItems: collectedBookingHistoryItems
            })
        }
        this.setState({ isLoading: false })
    }
}

const mapStateToProps = ({appReducer}) => ({appReducer})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({saveSelectedVoucher},dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDetail)
