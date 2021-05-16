import React, { Component } from "react";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import { Link } from "react-router-dom";
import "./MyAccount.scss";

class MyAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
    <div className="MyAccountContainer">
        <ul className="menu">
            <li><Link to="/myAccount" className="menuname">My Profile</Link><span>&rarr;</span></li>
            <li><Link to="/Mybookings" className="menuname">My bookings</Link><span>&rarr;</span></li>
            <li><Link to="" className="menuname">About Us</Link><span>&rarr;</span></li>
            <li><Link to="" className="menuname">Call Support</Link><span>&rarr;</span></li>
        </ul>
    </div>
    )
  }
}

export default MyAccount;
