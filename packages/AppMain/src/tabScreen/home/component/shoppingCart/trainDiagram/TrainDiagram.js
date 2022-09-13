import React, {Component} from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import {trainDiagramStyles} from "./trainDiagramStyles";
import {ADULT, CHILD} from "./definition/shoppingCartDefinitions";
import convertIntoRomanNumber from "server/src/database/topic/trainSeat/utils/convertIntoRomanNumber";
import checkExistingBoughtSeatsByPlaceTimePoint from "server/src/database/topic/trainSeat/checkExistingBoughtSeatsByPlaceTimePoint";

const availableSeatColor = '#64D2FF'
const boughtColor = '#52504a'
const adultSeatColor = '#18e002'
const childSeatColor = '#f2e533'

export default class TrainDiagram extends Component{

    state = {
        boughtSeats: [],
        selectedAdultSeats: [],
        selectedChildSeats: []
    }

    componentDidMount() {
        checkExistingBoughtSeatsByPlaceTimePoint(
            this.props.railwayCompanyId,
            this.props.placeTimePoint,
            this._setBoughtSeats
        )
    }

    render() {
        return(
            <View>
                <View style={trainDiagramStyles.trainHead}>
                    {this._renderSeatColorExplaination()}
                </View>
                {this._renderTrainBody()}
                <View style={{height: 35}}/>
            </View>
        )
    }

    _setBoughtSeats = (collectedBoughtSeats) => {
        this.setState({boughtSeats: collectedBoughtSeats})
        this.props.sendBoughtSeatsToShoppingCart(collectedBoughtSeats)
    }

    _renderSeatColorExplaination = () => (
        <View style={{marginTop: '25%'}}>
            <View style={trainDiagramStyles.sampleSeatView}>
                <View style={[trainDiagramStyles.sampleSeat, {backgroundColor: availableSeatColor}]}/>
                <Text>Available ticket</Text>
            </View>
            <View style={trainDiagramStyles.sampleSeatView}>
                <View style={[trainDiagramStyles.sampleSeat, {backgroundColor: boughtColor}]}/>
                <Text>Bought ticket</Text>
            </View>
            <View style={trainDiagramStyles.sampleSeatView}>
                <View style={[trainDiagramStyles.sampleSeat, {backgroundColor: adultSeatColor}]}/>
                <Text>Adult ticket</Text>
            </View>
            <View style={trainDiagramStyles.sampleSeatView}>
                <View style={[trainDiagramStyles.sampleSeat, {backgroundColor: childSeatColor}]}/>
                <Text>Child ticket</Text>
            </View>
        </View>
    )

    _renderTrainBody = () => {
        const coaches = []
        for(let coachNumeral=1; coachNumeral<4; coachNumeral++){
            coaches.push(
                <View>
                    {this._renderTrainCoach(coachNumeral)}
                </View>
            )
        }
        return (
            <View>
                {coaches}
            </View>
        )
    }

    _renderTrainCoach = (coachNumeral) => {
        const coachName = convertIntoRomanNumber(coachNumeral)
        return (
            <View style={trainDiagramStyles.trainCoach}>
                <Text style={trainDiagramStyles.coachName}>{coachName}</Text>
                <View style={{flexDirection: "row"}}>
                    {this._renderSeatColumn(coachName, 'A')}
                    {this._renderSeatColumn(coachName, 'B')}
                    <View style={{width: 10}}/>
                    {this._renderSeatColumn(coachName, 'C')}
                    {this._renderSeatColumn(coachName, 'D')}
                </View>
            </View>
        )
    }

    _renderSeatColumn = (coachName, columnAlphabet) => {
        const columnSeats = []
        for(let seatNumeral=0; seatNumeral<9; seatNumeral++){
            columnSeats.push(this._renderSeat(coachName, columnAlphabet,seatNumeral))
        }
        return (
            <View style={{alignItems: "center", marginHorizontal: '2%'}}>
                <Text style={{fontWeight: "bold"}}>{columnAlphabet}</Text>
                {columnSeats}
            </View>
        )
    }

    _renderSeat = (coachName, columnAlphabet, seatNumeral) => {
        const seatName = (coachName+columnAlphabet+seatNumeral).toString()
        const seatColor = this._getSeatColor(seatName)
        return (
            <TouchableOpacity
                style={[
                    trainDiagramStyles.seat,
                    {backgroundColor: seatColor}
                ]}
                disabled={(seatColor == boughtColor)}
                onPress={() => {this._pressSeat(seatName)}}
            >
                <Text style={{fontSize: 12}}>{columnAlphabet + seatNumeral}</Text>
            </TouchableOpacity>
        )
    }

    _getSeatColor = (seatName) => {
        if(this.state.selectedAdultSeats.includes(seatName)) return adultSeatColor
        if(this.state.selectedChildSeats.includes(seatName)) return childSeatColor
        if(this.state.boughtSeats.includes(seatName)) return boughtColor
        return availableSeatColor
    }

    _pressSeat = (seatName) => {
        const currentAdultSeats = this.state.selectedAdultSeats
        const adultSeatIndex = currentAdultSeats.indexOf(seatName)

        const currentChildSeats = this.state.selectedChildSeats
        const childSeatIndex = currentChildSeats.indexOf(seatName)

        if(adultSeatIndex == -1 && childSeatIndex == -1){
            this._selectTicket(seatName, currentAdultSeats, currentChildSeats)
        }else{
            if(adultSeatIndex != -1){
                currentAdultSeats.splice(adultSeatIndex,1)
                this.setState({
                    selectedAdultSeats: currentAdultSeats
                })
                this.props.updateSeatList(this.state.selectedAdultSeats, ADULT)
            }
            if(childSeatIndex != -1){
                currentChildSeats.splice(childSeatIndex, 1)
                this.setState({
                    selectedChildSeats: currentChildSeats
                })
                this.props.updateSeatList(this.state.selectedChildSeats, CHILD)
            }
        }
    }

    _selectTicket = (seatName, currentAdultSeats, currentChildSeats) => {
        Alert.alert(
            "Ticket Type",
            "Please select your ticket",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: ADULT,
                    onPress: () => {
                        currentAdultSeats.push(seatName)
                        this.setState({ selectedAdultSeats: currentAdultSeats })
                        this.props.updateSeatList(this.state.selectedAdultSeats, ADULT)
                    }
                },
                {   text: CHILD,
                    onPress: () => {
                        currentChildSeats.push(seatName)
                        this.setState({ selectedChildSeats: currentChildSeats })
                        this.props.updateSeatList(this.state.selectedChildSeats, CHILD)
                    }
                },
            ],
            { cancelable: false }
        );
    }
}
