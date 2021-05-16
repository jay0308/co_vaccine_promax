import React, { Component } from "react";
import OtpScreen from "../common/otpScreen/OtpScreen";
import RegisterScreen from "../common/registerScreen";
import DefaultLayout from "../../components/common/defaultLayout/DefaultLayoutContainer";

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            reqType: "signup"
        }
    }
    sendOtpToParent = (otp) => {
        const { otpSubmit } = this.props;
        otpSubmit(parseInt(otp), this.state.email, this.state.reqType)
    }

    sendRegisterDataToParent = (name, email) => {
        this.setState({
            email: email
        })
        const { createUser } = this.props;
        createUser(name, email)
    }
    render() {
        const { sendOtp } = this.props
        return (
            <DefaultLayout>
                {
                    sendOtp ?
                        <OtpScreen sendOtpToParent={this.sendOtpToParent} {...this.props} />
                        :
                        <RegisterScreen sendRegisterDataToParent={this.sendRegisterDataToParent} {...this.props} />
                }
            </DefaultLayout>
        )
    }
}

export default RegisterComponent;