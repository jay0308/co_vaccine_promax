import React from 'react';
import DefaultLayoutContainer from '../../common/defaultLayout/DefaultLayoutContainer';
import s from "./bookings.module.scss";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import lodash from "lodash";

class Bookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFilter: new Date()
        }
    }
    componentDidMount() {
        let { bookingStatusAction, getRoutesAction,getBusAction } = this.props;
        let { dateFilter } = this.state;
        let qs = `?date=${dateFilter}`;
        bookingStatusAction(qs)
        getRoutesAction();
        getBusAction();
    }
    getBusDetails = (busId) => {
        let {successReducer} = this.props;
        if(lodash.get(successReducer,"getBus.busList",false)){
            for (let i = 0; i < successReducer.getBus.busList.length; i++) {
                const element = successReducer.getBus.busList[i];
                if(element._id === busId){
                    return element
                }
            }
        }
        return false;
    }
    handleDateChange = (date) => {
        this.setState({
            dateFilter: date
        })
        let { bookingStatusAction } = this.props;
        let qs = `?date=${date}`;
        bookingStatusAction(qs)
    }
    getRoutesName = (id) => {
        const { successReducer } = this.props;
        let busType = successReducer && successReducer.getRoutes && successReducer.getRoutes.routes || [];
        // console.log("Routes",busType)
        let filtered = busType.filter((e) => {
            if (e._id === id)
                return e
        })
        if (filtered.length > 0)
            return filtered[0].routeName

        return ""
    }
    refundNow = (bookingId,refundStatus) => {
        let {refundAction} = this.props;
        let reqObj = {
            bookingId:bookingId,
            isRefunded:refundStatus
        }
        refundAction(reqObj)
    }
    render() {
        let { dateFilter } = this.state;
        let { successReducer } = this.props;
        return (
            <DefaultLayoutContainer
                screenName="admin"
            >
                {
                    successReducer && successReducer.getRoutes &&
                    <div className={s.bookingsHeader}>
                        <h2>Booking Details</h2>
                        <div className={s.dateFilter}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format="dd/MM/yyyy"
                                    value={dateFilter}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className={s.bookinsDetailsContainer}>
                            {
                                successReducer && successReducer.bookingStatus &&
                                successReducer.getBus && successReducer.getBus.busList &&
                                successReducer.bookingStatus.map((e, i) => {
                                    return (
                                        <div className={s.bookingCard} key={new Date().getTime() + i}>
                                            <div className={s.row}>
                                                <div className={s.label}>Booking Id:</div>
                                                <div className={s.value}>{e._id}</div>
                                            </div>
                                            <div className={s.row}>
                                                <div className={s.label}>Bus Number:</div>
                                                <div className={s.value}>{this.getBusDetails(e.busId) ? this.getBusDetails(e.busId).busNo : ""}</div>
                                            </div>
                                            <div className={s.row}>
                                                <div className={s.label}>Source:</div>
                                                <div className={s.value}>{this.getRoutesName(e.sourceId)}</div>
                                            </div>
                                            <div className={s.row}>
                                                <div className={s.label}>Destination:</div>
                                                <div className={s.value}>{this.getRoutesName(e.destId)}</div>
                                            </div>
                                            <div className={s.row}>
                                                <div className={s.label}>User Id:</div>
                                                <div className={s.value}>{e.userId}</div>
                                            </div>
                                            {
                                                e.userDetails && e.userDetails.length > 0 &&
                                                <React.Fragment>
                                                    <div className={s.row}>
                                                        <div className={s.label}>User Name:</div>
                                                        <div className={s.value}>{e.userDetails[0].name}</div>
                                                    </div>
                                                    <div className={s.row}>
                                                        <div className={s.label}>User Contact Number:</div>
                                                        <div className={s.value}>{e.userDetails[0].contactNo}</div>
                                                    </div>

                                                </React.Fragment>
                                            }
                                            <div className={s.row}>
                                                <div className={s.label}>Seat No:</div>
                                                <div className={s.value}>{e.seatNo ? e.seatNo.join(",") : ""}</div>
                                            </div>
                                            <div className={s.row}>
                                                <div className={s.label}>Status:</div>
                                                <div className={s.value}>{e.isCancelled === 1 ? "Cancelled" : "Confirmed"}</div>
                                            </div>
                                            {
                                                e.isCancelled === 1 &&
                                                <div className={s.row}>
                                                    <div className={s.label}>Refund Status:</div>
                                                    <div className={s.value}><span className={e.isRefunded && e.isRefunded === 1 ? s.refunded : s.notRefunded}>{e.isRefunded && e.isRefunded === 1 ? "Refunded" : "Not Refunded"}</span>
                                                        {
                                                            (!e.isRefunded || e.isRefunded === 0) ? <span className={s.refundNowBtn} onClick={() => { this.refundNow(e._id,1) }}>Refund Now</span>
                                                            :
                                                            <span className={s.refundNowBtn} onClick={() => { this.refundNow(e._id,0) }}>Mark as not Refund</span>
                                                        }
                                                    </div>
                                                </div>
                                            }
                                            <div className={s.row}>
                                                <div className={s.label}>Total Fair:</div>
                                                <div className={s.value}>Rs. {e.totalFair}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                successReducer && successReducer.bookingStatus &&
                                successReducer.bookingStatus.length === 0 &&
                                <div className={s.noDataFound}>
                                    <h2>No Data Found</h2>
                                </div>
                            }

                        </div>
                    </div>
                }

            </DefaultLayoutContainer>
        )
    }
}

export default Bookings;