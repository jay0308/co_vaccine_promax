import React from 'react';
import DefaultLayoutContainer from '../common/defaultLayout/DefaultLayoutContainer';
import s from "./style.module.scss";
import { TextField } from '@material-ui/core';
import BusSearch from '../busSearch'

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId: "",
            todo: "",
            userMobileNo: ""
        }
    }
    componentDidMount() {
        let { getRoutesAction, getBusTypeAction } = this.props;
        getRoutesAction();
        getBusTypeAction();
    }
    componentWillUnmount() {
        let sr = { ...this.props.successReducer }
        if (sr && sr.searchBusResult) {
            sr.searchBusResult = null;
        }

        this.props.successAction(sr)
    }
    setBookingId = (e) => {
        this.setState({
            bookingId: e.target.value
        })
    }
    setuserMobileNo = (e) => {
        this.setState({
            userMobileNo: e.target.value
        })
    }
    handleRadioBtn = (e) => {
        this.setState({
            todo: e.target.value
        })
    }
    handleSubmit = () => {
        let { bookingId, todo, userMobileNo } = this.state;
        if (bookingId && todo && userMobileNo) {
            let phoneno = /^\d{10}$/;
            if (!userMobileNo.match(phoneno)) {
                alert("Invalid Mobile No")
                return false
            }
            let { bookingInstamojoAction, cancelBookingAction } = this.props;
            if (todo === "pay") {
                let qs = `?payment_id=admin&payment_request_id=admin&payment_status=Credit&userMobile=${userMobileNo}`;
                bookingInstamojoAction(bookingId, qs)
            } else {
                let reqObj = {
                    bookingId: bookingId,
                    userMobileNo:userMobileNo
                }
                cancelBookingAction(reqObj)
            }

        } else {
            alert("Please fill all the fields")
        }
    }
    renderCancelPayForm = () => {
        let { bookingId, userMobileNo } = this.state;
        return (
            <div className={s.cancelPayForm}>
                <div className={s.inner}>
                    <div className={s.field}>
                        <TextField label="Enter user mobile no." type="text" value={userMobileNo} onChange={(e) => { this.setuserMobileNo(e) }} />
                    </div>
                    <div className={s.field}>
                        <TextField label="Enter Booking Id" type="text" value={bookingId} onChange={(e) => { this.setBookingId(e) }} />
                    </div>
                    <div className={s.field}>
                        <label>
                            Mark paid
                            <input type="radio" name="bokkingStatus" value="pay" onChange={this.handleRadioBtn} />
                        </label>
                        <label>
                            Mark Cancelled
                            <input type="radio" name="bokkingStatus" value="cancel" onChange={this.handleRadioBtn} />
                        </label>
                    </div>
                    <div className={s.field}>
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        let { successReducer } = this.props;
        return (
            <DefaultLayoutContainer
                screenName="admin"
            >
                <div className={s.adminHomeCont}>
                    <div className={s.adminHeader}>
                        <h2>Admin</h2>
                    </div>
                    {
                        successReducer && successReducer.getRoutes && successReducer.getBusType &&
                        <BusSearch {...this.props} />
                    }
                    {this.renderCancelPayForm()}
                </div>
            </DefaultLayoutContainer>
        )
    }
}

export default Admin;