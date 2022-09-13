import React, {Component} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {paymentStyles} from "./paymentStyles";
import AddCardPopup from "./addCardPopup/AddCardPopup";
import analyzeCardNo from "./utils/analyzeCardNo";
import isValidMonth from "./utils/isValidMonth";
import isValidYear from "./utils/isValidYear";
import isValidCCV from "./utils/isValidCCV";
import createLocalChannels from "../../common/utils/pushNotification/local/createLocalChannels";
import createLocalPushNotification from "../../common/utils/pushNotification/local/createLocalPushNotification";
import {PAYMENT} from "./definition/paymentDefinitions";
import getCurrentDateTimeFromTimeServer from "server/src/api/topic/currentDateTime/getCurrentDateTimeFromTimeServer";
import LoadingIndicator from "../../common/component/loadingIndicator/LoadingIndicator";
import getAllStoredCreditCards from "server/src/database/topic/creditCard/getAllStoredCreditCards";
import {connect} from "react-redux";
import saveNewCreditCard from "server/src/database/topic/creditCard/saveNewCreditCard";
import removeStoredCreditCard from "server/src/database/topic/creditCard/removeStoredCreditCard";
import saveNewBookingHistoryItem from "server/src/database/topic/bookingHistory/saveNewBookingHistoryItem";
import saveBoughtSeats from "server/src/database/topic/trainSeat/saveBoughtSeats";
import {HOME, PROFILE, TICKET} from "../../navigator/definition/navigatorDefinitions";
import closeScreenWhenLoggedOut from "../../common/utils/navigation/closeScreenWhenLoggedOut";

class Payment extends Component {

    _tabScreen = this.props.navigation.getState().routes[0].name;

    state = {
        isLoading: false,
        storedCreditCards: [],
        selectedCard: undefined,
        isAddCardPressed: false,
        isSaveCardPressed: false,
    }

    componentDidMount() {
        createLocalChannels(PAYMENT)
        getAllStoredCreditCards(this.props.appReducer.account.phoneNumber, this._setStoredCreditCards)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        closeScreenWhenLoggedOut(this.props.appReducer.isLogin, this.props.navigation, HOME)
    }

    render() {
        return(
            <View style={paymentStyles.container}>
                {this.state.isLoading && <LoadingIndicator/>}
                {this._renderEscapeSpace()}
                <View style={paymentStyles.coverPhoto}>
                    {this._renderDeleteButton()}
                </View>
                {
                    this.state.isAddCardPressed
                        ?
                    this._renderAddCardPopup()
                        :
                    this._renderAddCardButton()
                }

                <View style={paymentStyles.body}>
                    {this._renderPlusButtonView()}
                    {this._renderCardListView()}
                </View>
                {this._renderPayNowAndSaveButton()}
            </View>
        )
    }

    _setStoredCreditCards = (collectedCreditCards) => {
        this.setState({storedCreditCards: collectedCreditCards})
    }

    _renderAddCardPopup = () => (
        <View style={paymentStyles.addCardPopup}>
            <AddCardPopup
                isSaveCardPressed={this.state.isSaveCardPressed}
                checkNewCardInput={this._checkNewCardInput}
            />
        </View>
    )

    _renderEscapeSpace = () => (
        this.state.isAddCardPressed
        &&
        <TouchableOpacity
            style={paymentStyles.escapeSpace}
            onPress={() => {
                this.setState({
                    isAddCardPressed: false
                })
            }}
        />
    )

    _renderAddCardButton = () => (
        <TouchableOpacity
            style={paymentStyles.addCardButtonView}
            onPress={() => {
                this.setState({
                    isAddCardPressed: true
                })
            }}
        >
            <MaterialIcons name='add' size={70} color='black'/>
        </TouchableOpacity>
    )

    _renderDeleteButton = () => {
        const isDeleteButtonNotReady = (this.state.selectedCard === undefined || this.state.storedCreditCards.length == 0)
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity
                    disabled={isDeleteButtonNotReady}
                    style={{opacity: isDeleteButtonNotReady ? 0.5 : 1}}
                    onPress={() => {
                        this.setState({ isLoading: true })
                        removeStoredCreditCard(
                            this.props.appReducer.account.phoneNumber,
                            this.state.selectedCard.id,
                            this._createPaymentCardPushNotification
                        )
                    }}
                >
                    {this._renderIcon('delete')}
                </TouchableOpacity>
            </View>

        )
    }

    _renderPlusButtonView = () => <View style={paymentStyles.plusButtonView}/>

    _renderCardListView = () => {
        const cardQuantity = this.state.storedCreditCards.length
        const isOddQuantity = !(cardQuantity % 2 == 0)
        const rowList = []
        for(let row=1; row <= cardQuantity; row+=2){
            rowList.push(this._renderCardRow(row, cardQuantity, isOddQuantity))
        }
        return (
            <View style={paymentStyles.cardListView}>
                <ScrollView>
                    {rowList}
                </ScrollView>
            </View>
        )
    }

    _renderCardRow = (row, cardQuantity, isOddQuantity) => {
        const isRenderSecond = !(row == cardQuantity && isOddQuantity == true)
        return (
            <View style={paymentStyles.cardRow}>
                {this._renderCardCell(this.state.storedCreditCards[row-1])}
                {
                    isRenderSecond
                        ?
                    this._renderCardCell(this.state.storedCreditCards[row])
                        :
                        <View style={[
                            paymentStyles.cardCell,
                            {borderWidth: 0, backgroundColor: undefined, elevation: 0}]
                        }/>
                }
            </View>
        )
    }

    _renderCardCell = (card) => (
        <TouchableOpacity
            style={paymentStyles.cardCell}
            onPress={() => {
                if(this.state.selectedCard === card){
                    this.setState({selectedCard: undefined})
                }else {
                    this.setState({selectedCard: card})
                }
            }}
        >
            {(this.state.selectedCard === card) && this._renderTickIcon()}
            <View style={{flex: 1, width: '100%'}}/>
            <View style={paymentStyles.cardCellContent}>
                <Text style={paymentStyles.cardDigitsText}>*** {card?.last4DigitString}</Text>
            </View>
        </TouchableOpacity>
    )

    _renderTickIcon = () => (
        <View style={paymentStyles.tickIcon}>
            <MaterialIcons name='check' size={30} color='#F7F7F7'/>
        </View>
    )

    _renderPayNowAndSaveButton = () => (
        <View style={paymentStyles.payNowOrSaveButtonView}>
            {
                this.state.isAddCardPressed
                    ?
                    this._renderSaveCardButton()
                    :
                    this._renderPayNowButton()
            }
        </View>
    )

    _renderPayNowButton = () => {
        if(this._tabScreen != PROFILE){
            const isPayNowUnready = (this.state.selectedCard === undefined || this.state.storedCreditCards.length == 0)
            return (
                <TouchableOpacity
                    style={[
                        paymentStyles.payNowOrSaveButton,
                        {opacity: isPayNowUnready ? 0.5 : 1}
                    ]}
                    disabled={isPayNowUnready}
                    onPress={async () => {
                        this.setState({isLoading: true})
                        this._saveSelectedSeatsAsBought()
                        const currentDateTime = await getCurrentDateTimeFromTimeServer()
                        saveNewBookingHistoryItem(
                            this.props.appReducer.account.phoneNumber,
                            this.props.route.params.order,
                            this._createOrderCode(currentDateTime),
                            this.props.notificationReducer.unseenNotificationQuantity,
                            this._createPaymentCardPushNotification,
                            currentDateTime
                        )
                        this.props.navigation.navigate(TICKET, {
                                tabScreen: HOME,
                                order: this.props.route.params.order
                            }
                        )
                    }}
                >
                    <Text style={paymentStyles.payNowOrSaveText}>Pay now</Text>
                    <View style={{width: '5%'}}/>
                    {this._renderIcon('account-balance-wallet')}
                </TouchableOpacity>
            )
        }
    }

    _saveSelectedSeatsAsBought = () => {
        const {railwayCompany, placeTimePoint, adultTickets, childTickets, boughtSeats} = this.props.route.params.order
        saveBoughtSeats(railwayCompany.id, placeTimePoint, [...boughtSeats, ...adultTickets, ...childTickets])
    }

    _createOrderCode = (currentDateTime) => {
        const firstCustomerNameCharacter = this.props.appReducer.account.fullname.slice(0,1).toUpperCase()
        const lastPhoneNumber3Character = this.props.appReducer.account.phoneNumber.slice(-3)
        const {day, month, year, hour, minute, seconds} = currentDateTime
        return (firstCustomerNameCharacter + lastPhoneNumber3Character + day + month + year + hour + minute + seconds)
    }

    _renderSaveCardButton = () => (
        <TouchableOpacity
            style={paymentStyles.payNowOrSaveButton}
            onPress={() => {
                if(this.state.isAddCardPressed){
                    this.setState({ isSaveCardPressed: true })
                }
            }}
        >
            <Text style={paymentStyles.payNowOrSaveText}>Save</Text>
            <View style={{width: '5%'}}/>
            {this._renderIcon('save')}
        </TouchableOpacity>
    )

    _renderIcon = (name) => <MaterialIcons name={name} color='black' size={35}/>

    _checkNewCardInput = (newCard) => {
        let messages = ''
        if(Object.values(newCard).find(value => value === '') !== undefined){
            messages += 'Please fill all fields\n'
        }else {
            if(analyzeCardNo(newCard.cardNo) == null){
                messages += 'Invalid card No.\n'
            }
            if(isValidCCV(newCard.ccv) === false){
                messages += 'Invalid CCV\n'
            }
            if(isValidMonth(parseInt(newCard.expiryMonth)) === false){
                messages += 'Invalid month\n'
            }
            if(isValidYear(parseInt(newCard.expiryYear)) === false){
                messages += 'Invalid year\n'
            }
        }
        if(messages.length>0){
            alert(messages)
        }else{
            this.setState({
                isAddCardPressed: false,
                isLoading: true
            })
            saveNewCreditCard(
                this.props.appReducer.account.phoneNumber,
                newCard.cardNo.slice(-4),
                this._createPaymentCardPushNotification
            )
        }
        this.setState({
            isSaveCardPressed: false
        })
    }

    _createPaymentCardPushNotification = async (title, bigText, dateTime = null) => {
        const currentDateTime = dateTime || await getCurrentDateTimeFromTimeServer()
        createLocalPushNotification(PAYMENT, title, bigText, currentDateTime)
        this.setState({isLoading: false})
    }
}

const mapStateToProps = ({appReducer, notificationReducer}) => (
    {appReducer, notificationReducer}
)

export default connect(mapStateToProps)(Payment)
