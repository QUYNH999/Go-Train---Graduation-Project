import React, {Component} from "react";
import ProfileInfo from "./component/profileInfo/ProfileInfo";
import {connect} from "react-redux";
import Login from "../login/Login";

class Profile extends Component{
    render() {
        if (this.props.appReducer.isLogin) {
            return <ProfileInfo navigation = {this.props.navigation}/>
        }
        return <Login
            navigation = {this.props.navigation}
            isShoppingCartReady={this.props.appReducer.isShoppingCartReady}
        />
    }
}

const mapStateToProps = ({appReducer}) => ({appReducer})

export default connect(mapStateToProps)(Profile)
