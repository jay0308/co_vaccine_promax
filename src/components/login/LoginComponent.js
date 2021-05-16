import React, { Component } from "react";
import OtpScreen from "../common/otpScreen/OtpScreen";
import LoginScreen from "../common/loginScreen/LoginScreen";
import DefaultLayout from "../common/defaultLayout/DefaultLayout";

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            reqType: "login"
        }
    }

    sendOtpToParent = (otp, type) => {
        const { otpSubmit } = this.props;
        otpSubmit(parseInt(otp), this.state.email, this.state.reqType)
    }

    storeEmail = (email) => {
        this.setState({
            email: email
        })
        const { handleSubmit } = this.props;
        handleSubmit(email)
    }

    render() {
        const { sendOtp } = this.props
        if (sendOtp)
            return <DefaultLayout screenName="otp"> <OtpScreen sendOtpToParent={this.sendOtpToParent} {...this.props} /></DefaultLayout>
        else
            return (
                <DefaultLayout screenName="login">
                    <LoginScreen storeEmail={this.storeEmail} {...this.props} />
                </DefaultLayout>
            )
    }
}

export default LoginComponent;
