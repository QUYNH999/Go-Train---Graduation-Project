import React, {Component} from "react";
import {Image, ImageBackground, Text, TextInput, View} from "react-native";
import {addCardPopupStyles} from "./addCardPopupStyles";
import analyzeCardNo from "../utils/analyzeCardNo";
import {MASTERCARD, VISA} from "./definition/creditBrandDefinitions";
import NewCreditCard from "../card/NewCreditCard";
import {CARD_HOLDER, CARD_NO, CCV, ISSUE_MONTH, ISSUE_YEAR} from "./definition/inputTitleDefinitions";

export default class AddCardPopup extends Component{
    state = {
        cardNo: '',
        cardHolder: '',
        ccv : '',
        expiryMonth: '',
        expiryYear: '',
        creditBrand: null,
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isSaveCardPressed === true){
            this.props.checkNewCardInput(this._getNewCardInput())
        }
    }

    render() {
        return(
            <ImageBackground
                style={addCardPopupStyles.creditCardBackground}
                source={require('./image/creditCardBackground.jpg')}
            >
                <View style={addCardPopupStyles.container}>
                    {this._renderCardNo()}
                    {this._renderCardHolerName()}
                    {this._renderCCV()}
                    {this._renderExpiredDateAndCreditLogo()}
                </View>
            </ImageBackground>
        )
    }

    _renderCardNo = () => (
        <View style={addCardPopupStyles.inputView}>
            {this._renderTitle(CARD_NO)}
            {this._renderInput(this.state.cardNo, CARD_NO)}
        </View>
    )

    _renderCardHolerName = () => (
        <View style={addCardPopupStyles.inputView}>
            {this._renderTitle(CARD_HOLDER)}
            {this._renderInput(this.state.cardHolder, CARD_HOLDER)}
        </View>
    )

    _renderCCV = () => (
        <View style={addCardPopupStyles.inputView}>
            {this._renderTitle(CCV)}
            {this._renderInput(this.state.ccv, CCV)}
            <View style={{width: '50%'}}/>
        </View>
    )

    _renderExpiredDateAndCreditLogo = () => (
        <View style={addCardPopupStyles.inputView}>
            {this._renderTitle('Valid thru')}
            {this._renderInput(this.state.expiryMonth, ISSUE_MONTH)}
            <Text style={{fontSize: 20, fontWeight: "bold"}}>/</Text>
            {this._renderInput(this.state.expiryYear, ISSUE_YEAR)}
            {this._renderCreditLogoView()}
        </View>
    )

    _renderCreditLogoView = () => {
        return(
            <View style={addCardPopupStyles.creditLogoView}>
                {this._renderCreditLogo()}
            </View>
        )
    }

    _renderCreditLogo = () => {
        switch (this.state.creditBrand) {
            case MASTERCARD: return (
                <Image
                    source={require('./image/mastercardLogo.png')}
                    style={{width: 70, height: 70}}
                />
            )

            case VISA: return (
                <Image
                    source={require('./image/visaLogo.png')}
                    style={{width: 60, height: 20}}
                />
            )

            default: return <View/>
        }
    }

    _renderTitle = (title) => (
        <View style={addCardPopupStyles.titleView}>
            <Text>{title}</Text>
        </View>
    )

    _renderInput = (stateProperty, title) => (
        <TextInput
            style={addCardPopupStyles.input}
            keyboardType={title !== CARD_HOLDER ? 'numeric' : 'default'}
            maxLength={this._getMaxLength(title)}
            value={stateProperty}
            onChangeText = {(text) => {
                if(title === CARD_HOLDER){
                    this._removeNumericCharacterAndMakeUpperCase(text)
                }else {
                    this._removeNonNumericCharacters(text, title)
                }
            }}
            onEndEditing = {(value) => {
                if(title === CARD_NO){
                    this._identifyCreditBrand(value.nativeEvent.text)
                }
            }}
        />
    )

    _getMaxLength = (title) => {
        switch (title) {
            case CARD_NO: return 16
            case ISSUE_MONTH: case ISSUE_YEAR: return 2
            case CCV: return 3
            default: return undefined
        }
    }

    _removeNumericCharacterAndMakeUpperCase = (text) => {
        this.setState({
            cardHolder: text.replace(/[^a-zA-Z ]/g, '').toUpperCase()
        })
    }

    _removeNonNumericCharacters = (text, title) => {
        const onlyNumberValue = text.replace(/[^0-9]/g, '')
        switch (title) {
            case CARD_NO: {
                this.setState({ cardNo: onlyNumberValue });
                break;
            }
            case ISSUE_MONTH: {
                this.setState({ expiryMonth: onlyNumberValue });
                break;
            }
            case ISSUE_YEAR: {
                this.setState({ expiryYear: onlyNumberValue });
                break;
            }
            case CCV: {
                this.setState({ ccv: onlyNumberValue });
                break;
            }
        }
    }

    _identifyCreditBrand = (text) => {
        this.setState({
            creditBrand: analyzeCardNo(text)
        })
    }

    _getNewCardInput = () => (
        new NewCreditCard(
            this.state.cardNo,
            this.state.cardHolder,
            this.state.ccv,
            this.state.expiryMonth,
            this.state.expiryYear
        )
    )
}
