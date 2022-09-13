import React, {Component} from "react";
import NotificationDetail from "./component/notificationDetail/NotificationDetail";
import {connect} from "react-redux";
import Login from "../login/Login";

class Notification extends Component {
    render() {
        if (this.props.appReducer.isLogin) {
            return(
                //mục đích mở rộng code sau này, nếu chưa loginUtils thì ko hiện
                <NotificationDetail navigation = {this.props.navigation}/>
            )
        }
        return <Login navigation = {this.props.navigation}/>
    }
}

const mapStateToProps = ({appReducer}) => ({appReducer})

export default connect(mapStateToProps)(Notification)

