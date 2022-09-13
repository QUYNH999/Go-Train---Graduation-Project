import React, {Component} from "react";
import HomeDetail from "./component/homeDetail/HomeDetail";

export default class Home extends Component {
    render() {
        return(
            <HomeDetail navigation = {this.props.navigation}/>
        )
    }
}
