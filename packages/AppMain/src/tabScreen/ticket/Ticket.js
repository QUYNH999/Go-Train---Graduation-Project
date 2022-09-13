import React, {Component} from "react";
import {Dimensions, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {ticketStyles} from "./ticketStyles";
import QRCode from "react-native-qrcode-svg";
import {connect} from "react-redux";
import resetNavigation from "../../common/utils/navigation/resetNavigation";
import {HOME} from "../../navigator/definition/navigatorDefinitions";
import {BACK_TO_LIST} from "./definition/ticketDefinitions";
import closeScreenWhenLoggedOut from "../../common/utils/navigation/closeScreenWhenLoggedOut";

const windowAgainstTicketPadding = 25

class Ticket extends Component{

    _order = this.props.route.params.order;
    _fullname = this.props.appReducer.account.fullname;
    _phoneNumber = this.props.appReducer.account.phoneNumber;
    _tabScreen = this.props.navigation.getState().routes[0].name;

    componentDidUpdate(prevProps, prevState, snapshot) {
        closeScreenWhenLoggedOut(this.props.appReducer.isLogin, this.props.navigation, this._tabScreen)
    }

    render() {
        const totalTickets = [...this._order.adultTickets, ...this._order.childTickets]
        return(
            <View style={ticketStyles.container}>
                <View style={ticketStyles.generalTicketsView}>
                    <ScrollView
                        horizontal={true}
                        disableIntervalMomentum={true}
                        snapToInterval={Dimensions.get('window').width - windowAgainstTicketPadding}
                    >
                        {
                            totalTickets.map((ticket) => {
                                return this._renderTicketView(ticket)
                            })
                        }
                    </ScrollView>
                </View>
                {this._renderBackButton()}
            </View>
        )
    }

    _renderTicketView = (ticket) => (
        <View style={ticketStyles.ticketView}>
            {this._renderTicketContentView(ticket)}
            {this._renderQRcodeAndNote(ticket)}
            {this._renderPaymentSeal()}
        </View>
    )

    _renderTicketContentView = (ticket) => (
        <View style={ticketStyles.contentTicketView}>
            <ImageBackground
                source={require('./image/ticketBackground.jpg')}
                style={ticketStyles.ticketImageBackground}
            >
                {this._renderCompanyLogoAndName()}
                {this._renderMainContent(ticket)}
            </ImageBackground>
        </View>
    )

    _renderCompanyLogoAndName = () => (
        <View style={{flex: 2}}>
            <View style={ticketStyles.logoCompanyView}>
                <Image
                    source={{uri: this._order.railwayCompany.image.uri}}
                    style={{height: '77%', width: '15%'}}
                />
            </View>
            <View style={ticketStyles.railwayCompanyNameView}>
                <Text style={ticketStyles.railwayCompanyNameText}>{this._order.railwayCompany.name}</Text>
                {this._renderSubLine()}
            </View>
        </View>
    )

    _renderMainContent = (ticket) => (
        <View style={{flex: 6, padding: '3%'}}>
            {this._renderCustomerInformation()}
            {this._renderStation()}
            {this._renderSeatAndTime(ticket)}
            {this._renderPriceAndTicketCode(ticket)}
        </View>
    )

    _renderCustomerInformation = () => (
        <View style={{flex: 4}}>
            <View style={ticketStyles.fullnameView}>
                <Text style={ticketStyles.mainContentText}>Customer: </Text>
                <Text style={ticketStyles.mainContentText}>{this._fullname}</Text>
            </View>
            <View style={ticketStyles.phoneNumberView}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={ticketStyles.mainContentText}>Phone number: </Text>
                    <Text style={ticketStyles.mainContentText}>{this._phoneNumber}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    {this._renderSubLine()}
                </View>
            </View>
        </View>
    )

    _renderStation = () => (
        <View style={ticketStyles.journeyView}>
            <View style={ticketStyles.departureView}>
                <View style={ticketStyles.provinceView}>
                    <Text style={ticketStyles.mainContentText}>{this._order.departureProvince.title}</Text>
                </View>
                <Text style={ticketStyles.mainContentText}>{this._order.departureProvince.station}</Text>
                <Text style={ticketStyles.mainContentText}>Station</Text>
            </View>
            <View style={ticketStyles.fromToIconView}>
                <Icon name='trending-flat' size={50} color='#68228B'/>
            </View>
            <View style={ticketStyles.destinationView}>
                <View style={ticketStyles.provinceView}>
                    <Text style={[ticketStyles.mainContentText, {alignSelf: "flex-end"}]}>{this._order.destinationProvince.title}</Text>
                </View>
                <Text style={ticketStyles.mainContentText}>{this._order.destinationProvince.station}</Text>
                <Text style={ticketStyles.mainContentText}>Station</Text>
            </View>
        </View>
    )

    _renderSeatAndTime = (ticket) => (
        <View style={ticketStyles.seatAndTimeView}>
            <View style={ticketStyles.seatAndTimeBoxView}>
                <View style={ticketStyles.ticketType}>
                    <Text style={ticketStyles.mainContentText}>{this._classifyTicketType(ticket)}</Text>
                </View>
                <View style={ticketStyles.seatView}>
                    <Text style={ticketStyles.mainContentText}>Coach {ticket.slice(0,-2)} - </Text>
                    <Text style={ticketStyles.mainContentText}>Seat {ticket.slice(-2)}</Text>
                </View>
                <View style={ticketStyles.timeView}>
                    <Text style={ticketStyles.mainContentText}>{this._order.departureTime} - {this._order.departureDay}</Text>
                </View>
            </View>
        </View>
    )

    _classifyTicketType (ticket) {
        if (this._order.adultTickets.includes(ticket)) {
            return 'Adult Ticket'
        }
        return 'Child Ticket'
    }

    _renderPriceAndTicketCode = (ticket) => (
        <View style={ticketStyles.priceAndTicketCodeView}>
            <View style={{flex: 2, alignSelf: 'center'}}>
                {this._renderSubLine()}
            </View>
            <View style={{flex: 5}}>
                <View style={ticketStyles.priceView}>
                    <Text style={ticketStyles.mainContentText}>Listed: </Text>
                    <Text style={ticketStyles.mainContentText}>{this._classifyTicketPrice(ticket)} VND</Text>
                </View>
                <View style={ticketStyles.priceView}>
                    <Text style={ticketStyles.mainContentText}>Total: </Text>
                    <Text style={ticketStyles.mainContentText}>
                        {this._classifyTicketPrice(ticket) - ((this._classifyTicketPrice(ticket) * this._order.discountRate)) / 100} VND
                    </Text>
                </View>
            </View>
        </View>
    )

    _classifyTicketPrice (ticket) {
        if (this._order.adultTickets.includes(ticket)) {
            return this._order.defaultAdultPrice
        }
        return this._order.defaultChildPrice
    }

    _renderTicketCode(ticket) {
        const ticketType = this._classifyTicketType(ticket).slice(0,1)
        const departureName = this._order.departureProvince.station.slice(0,1)
        const destinationName = this._order.destinationProvince.station.slice(0,1)
        const coachName = ticket.slice(0,-2)
        const seatName = ticket.slice(-2)
        const hour = this._order.departureTime.split(':')[0]
        const minute = this._order.departureTime.split(':')[1]
        const day = this._order.departureDay.split('/')[0]
        const month = this._order.departureDay.split('/')[1]
        return (ticketType + departureName + destinationName + coachName + seatName + hour + minute + day + month)
    }

    _renderQRcodeAndNote = (ticket) => (
        <View style={ticketStyles.QRcodeAndSealView}>
            <View style={ticketStyles.generalQRcodeView}>
                <QRCode
                    value={this._renderTicketCode(ticket)}
                    color='black'
                    backgroundColor='white'
                    size={125}
                    logo={require('./image/qrCodeLogo.png')}
                    logoSize={30}
                    logoMargin={2}
                    logoBorderRadius={15}
                />
            </View>
            <View style={ticketStyles.noteView}>
                <Text style={ticketStyles.mainContentText}>Note: </Text>
                <Text>- Arrive at station before 30 minutes of departure time</Text>
                <Text>- Show the ticket for the ticket collector</Text>
            </View>
        </View>
    )

    _renderPaymentSeal = () => (
        <View style={ticketStyles.generalPaymentSeal}>
            <View style={ticketStyles.railwayCompanyNameInPaymentSealView}>
                <Text style={ticketStyles.railwayCompanyNameInPaymentSealText}>{this._order.railwayCompany.name}</Text>
            </View>
            <View style={ticketStyles.mainContentPaymentSealView}>
                <Text style={ticketStyles.mainContentPaymentSealText}>PAID</Text>
            </View>
        </View>
    )

    _renderSubLine = () => <Text style={{color: 'black'}}>----------------------------------------------------------</Text>

    _renderBackButton = () => {
        return(
            <View style={ticketStyles.homeBackView}>
                <TouchableOpacity
                    style={ticketStyles.homeBackBox}
                    onPress={() => {
                        if(this._tabScreen == HOME){
                            resetNavigation(this.props.navigation, this._tabScreen)
                        }else {
                            this.props.navigation.goBack()
                        }
                    }}
                >
                    <Text style={ticketStyles.homeBackText}>{this._renderBackButtonText(this._tabScreen)}</Text>
                    <Icon
                        name={this._renderBackButtonIcon(this._tabScreen)}
                        color='white'
                        size={25}/>
                </TouchableOpacity>
            </View>
        )
    }

    _renderBackButtonText = (tabScreen) => (tabScreen == HOME) ? HOME : BACK_TO_LIST

    _renderBackButtonIcon = (tabScreen) => (tabScreen == HOME) ? 'home' : 'library-books'
}

const mapStateToProps = ({appReducer}) => ({appReducer})

export default connect(mapStateToProps)(Ticket)
