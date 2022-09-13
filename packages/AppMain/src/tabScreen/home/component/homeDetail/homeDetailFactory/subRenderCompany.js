import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {homeDetailStyles} from "../homeDetailStyles";

export function subRenderCompany(railwayCompany, logoHeight, logoWidth, fromProvince, toProvince, goJourneyPanelScreen) {
    const selectedFromProvinceName = fromProvince?.title
    const selectedToProvinceName = toProvince?.title

    const isProvinceActive = isStationExisting(railwayCompany.activeProvinces, selectedFromProvinceName, selectedToProvinceName)

    return(
        <TouchableOpacity
            style={homeDetailStyles.companyView}
            disabled={checkTouchableAbility(isProvinceActive, selectedFromProvinceName, selectedToProvinceName)}
            onPress={() => {
                if (selectedFromProvinceName == null && selectedToProvinceName == null) {
                    alert('Please select both provinces')
                }else if(selectedFromProvinceName === selectedToProvinceName){
                    alert('Provinces are duplicated')
                }
                else {
                    goJourneyPanelScreen(railwayCompany, fromProvince, toProvince)
                }
            }}
        >
            <View>
                <Image
                    source={railwayCompany.image}
                    style={{
                        height: logoHeight,
                        width: logoWidth,
                        opacity: getOpacity(isProvinceActive, selectedFromProvinceName, selectedToProvinceName),
                }}
                />
            </View>
            <View style={homeDetailStyles.companyNameView}>
                <Text style={homeDetailStyles.companyNameText}>{railwayCompany.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

function getOpacity(isStationExisting, selectedFromProvinceName, selectedToProvinceName) {
    if (selectedFromProvinceName == null && selectedToProvinceName == null) return 1
    if(isStationExisting === true){
        return 1
    }
    return 0.4
}

function isStationExisting(activeProvinces, selectedFromProvinceName, selectedToProvinceName) {
    return (
        activeProvinces.includes(selectedFromProvinceName)
        &&
        activeProvinces.includes(selectedToProvinceName)
    )
}

function checkTouchableAbility(isStationExisting, selectedFromProvinceName, selectedToProvinceName) {
    if (selectedFromProvinceName == null && selectedToProvinceName == null) {
        return false
    }
    return !isStationExisting
}
