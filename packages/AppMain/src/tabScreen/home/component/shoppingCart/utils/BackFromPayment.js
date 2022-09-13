import React from "react";
import {useFocusEffect} from "@react-navigation/native";

export const BackFromPayment = ({moveTrain}) => {
    useFocusEffect(() => {
        moveTrain(0)
    });
    return null
}
