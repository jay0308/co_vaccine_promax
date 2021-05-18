import React, { Component } from "react";
import s from "../../login/login.module.scss";
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import global from "../../../utils/common";
import {isEqual}  from "lodash";

class OtpScreen extends Component{
    constructor(props){
        super(props);
        this.timer = null;
        this.state = {
            timerCounter:3*60
        }

    }
    componentDidMount(){
        this.startTimer()
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.co_generateToken_res && !isEqual(nextProps.co_generateToken_res,this.props.co_generateToken_res)){
            this.startTimer()
        }
    }

    renderTextField = ({
        label,
        input,
        meta: { touched, invalid, error },
        ...custom
    }) => (
            <TextField
                label={label}
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
                {...input}
                {...custom}
                className={s.textField}
                type = "number"
            />
        )
    startTimer = () => {
        this.timer = setInterval(()=>{
            if(this.state.timerCounter === 0){
                clearInterval(this.timer)
                return 
            }
            this.setState({
                timerCounter:this.state.timerCounter - 1
            })
        },1000)
    }
    resendBtnHandler = () => {
        this.setState({
            timerCounter:3*60
        },()=>{
            this.props.resendOtp()
        })
    }
    render(){
        const { sendOtpToParent, pristine, reset, submitting,otpFormValues } = this.props
        return (
            <div className={s.loginSection}>
                <h2>Otp</h2>
                <form onSubmit={(e)=>{e.preventDefault(); otpFormValues && sendOtpToParent(otpFormValues.otp,"login")}}>
                    <div className={s.textField}>
                        <Field
                            name="otp"
                            component={this.renderTextField}
                            label="Enter Otp"
                            className={s.textField}
                        />
                    </div>
                    <div className={s.submitBtns}>
                        <button type="submit" disabled={pristine || submitting}>
                            Verify Otp
                        </button>
                        {/* <button type="button" disabled={pristine || submitting} onClick={reset}>
                            Clear Values
                        </button> */}
                    </div>
                    {
                        this.state.timerCounter === 0 ?
                        <div className={s.resendBtn} onClick={this.resendBtnHandler}>Resend OTP</div>
                        :
                        <div className={s.resendText}>Resend after {this.state.timerCounter}s</div>

                    }
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'OtpForm', // a unique identifier for this form
    validate:global.validate
  })(OtpScreen)