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
        const { otpSubmit, co_generateToken_res } = this.props;
        otpSubmit(parseInt(otp), co_generateToken_res.txnId)
    }

    storeEmail = (email) => {
        this.setState({
            email: email
        })
        const { handleSubmit } = this.props;
        handleSubmit(email)
    }

    resendOtp = () => {
        const { handleSubmit } = this.props;
        handleSubmit(this.state.email)
    }

    render() {
        const { co_generateToken_res } = this.props
        if (co_generateToken_res)
            return <DefaultLayout screenName="otp"> <OtpScreen sendOtpToParent={this.sendOtpToParent} {...this.props} resendOtp = {this.resendOtp} /></DefaultLayout>
        else
            return (
                <DefaultLayout screenName="login">
                    <LoginScreen storeEmail={this.storeEmail} {...this.props} />
                </DefaultLayout>
            )
    }
}

export default LoginComponent;
