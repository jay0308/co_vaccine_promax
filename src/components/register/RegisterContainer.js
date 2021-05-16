import { connect } from 'react-redux';
import actions  from '../../store/actions';
import RegisterComponent from "./RegisterComponent";

const mapStateToProps = (state) => {
    return {
        otpFormValues:state.form && state.form.OtpForm && state.form.OtpForm.values || null,
        sendOtp:state.successReducer && state.successReducer.sendOtp || null,
        registerFormValues:state.form && state.form.RegisterForm && state.form.RegisterForm.values || null,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loaderAction: (val) => dispatch(actions.loaderAction(val)),
        otpSubmit: (otp,email,userAction) => dispatch(actions.otpSubmit(otp,email,userAction)),
        createUser: (name,email) => dispatch(actions.createUser(name,email)) 
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);