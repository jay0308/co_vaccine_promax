import React, { Component } from "react";
import s from "../../login/login.module.scss";
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import global from "../../../utils/common";
import {withRouter,Link} from "react-router-dom";

class LoginScreen extends Component {
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
            />
        )
    render() {
        const { storeEmail, pristine, reset, submitting,loginFormValues } = this.props
        return (
            <div className={s.loginSection}>
                <h2>Login</h2>
                <form onSubmit={(e)=>{e.preventDefault(); loginFormValues && storeEmail(loginFormValues.mobileNo)}}>
                    <div className={s.textField}>
                        <Field
                            name="mobileNo"
                            component={this.renderTextField}
                            label="Your Mobile No"
                            className={s.textField}
                        />
                    </div>
                    <div className={s.submitBtns}>
                        <button type="submit" disabled={pristine || submitting}>
                            Next
                        </button>
                        {/* <button type="button" disabled={pristine || submitting} onClick={reset}>
                            Clear Values
                        </button> */}
                    </div>
                    <div className={s.registerTxt}>Yet not registered? <Link to="/register">Go Ahead</Link></div>
                </form>
            </div>
        )
    }
}

export default withRouter(reduxForm({
    form: 'LoginForm', // a unique identifier for this form
    validate:global.validate
  })(LoginScreen)); 