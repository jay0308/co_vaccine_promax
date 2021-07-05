import { connect } from 'react-redux';
import actions  from '../../store/actions';
import LoginComponent from "./LoginComponent";
import {get} from "lodash";

const mapStateToProps = (state) => {
    return {
        loaderReducer: state.loaderReducer,
        loginFormValues:state.form && state.form.LoginForm && state.form.LoginForm.values || null,
        otpFormValues:state.form && state.form.OtpForm && state.form.OtpForm.values || null,
        sendOtp:state.successReducer && state.successReducer.sendOtp || null,
        co_generateToken_res: get(state,"successReducer.co_generateToken_res",null)
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loaderAction: (val) => dispatch(actions.loaderAction(val)),
        handleSubmit: (email) => dispatch(actions.co_generateToken(email)),
        otpSubmit: (otp,txnId) => dispatch(actions.co_validateOtp(otp,txnId)) 
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);