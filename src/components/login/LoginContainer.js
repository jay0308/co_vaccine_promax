import { connect } from 'react-redux';
import actions  from '../../store/actions';
import LoginComponent from "./LoginComponent";

const mapStateToProps = (state) => {
    return {
        loaderReducer: state.loaderReducer,
        loginFormValues:state.form && state.form.LoginForm && state.form.LoginForm.values || null,
        otpFormValues:state.form && state.form.OtpForm && state.form.OtpForm.values || null,
        sendOtp:state.successReducer && state.successReducer.sendOtp || null
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loaderAction: (val) => dispatch(actions.loaderAction(val)),
        handleSubmit: (email) => dispatch(actions.loginSubmit(email)),
        otpSubmit: (otp,email,userAction) => dispatch(actions.otpSubmit(otp,email,userAction)) 
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);