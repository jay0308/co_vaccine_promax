import React, { Component } from "react";
import DefaultLayoutContainer from '../../common/defaultLayout/DefaultLayoutContainer';
import s from "./style.module.scss";
import DateFnsUtils from '@date-io/date-fns';
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import global from "../../../utils/common";
import lodash from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import UserListItem from "./UserListItem";
import Modal from "../../common/modal";

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busNo: "",
            date: new Date(),
            status: "",
            activeTab: 0,
            pickupPopup: false,
            driverName: "",
            pickupManName: "",
            driverNo: "",
            pickupManNo: ""
        }
    }
    componentDidMount() {
        this.props.getRoutesAction()
    }
    componentWillUnmount() {
        let sr = { ...this.props.successReducer }
        if (sr && sr.bookingBusReports) {
            sr.bookingBusReports = null;
        }

        this.props.successAction(sr)

    }

    handleDateChange = (date) => {
        this.setState({
            date: date
        })
    }

    handleBusNo = (e) => {
        this.setState({
            busNo: e.target.value
        })
    }
    handleStatus = (e) => {
        this.setState({
            status: e.target.value
        })
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

    getReportsData = () => {
        let { bookingBusReportsAction } = this.props;
        let { busNo, status, date } = this.state
        if (busNo && status && date) {
            let reqBobj = {
                busNo,
                status,
                date
            }
            bookingBusReportsAction(reqBobj)
        } else {
            alert("Please fill all the details")
        }
    }

    getCsvData = () => {
        let csvData = [
            ["Bus No", "Bus Name", "User Name", "User Contact", "Seats", "Journey Time", "Source", "Destintation", "Payment Balance", "Status"]
        ];

        let { successReducer } = this.props;
        let _data = successReducer.bookingBusReports.bookings.map((e) => {
            let arr = [];
            arr.push(lodash.get(successReducer, "bookingBusReports.busDetails.busNo", ""));
            arr.push(lodash.get(successReducer, "bookingBusReports.busDetails.busName", ""))
            arr.push(e.userDetails[0] && e.userDetails[0].name)
            arr.push(e.userDetails[0] && e.userDetails[0].contactNo)
            arr.push(e.seatNo && e.seatNo.join(","))
            arr.push(global.getTimeInFormat(new Date(e.journeyTime), "hh:mm:am/pm"))
            arr.push(this.getRoutesName(e.sourceId))
            arr.push(this.getRoutesName(e.destId))
            arr.push(e.userDetails[0] && e.userDetails[0].paymentBalance || 0)
            arr.push(e.isCancelled === 1 ? "Cancelled" : "Paid")

            return arr;
        })
        if (_data && _data.length > 0) {
            csvData = [...csvData, ..._data]
        }
        return csvData;
    }

    handleTabClick = (tabId) => {
        this.setState({
            activeTab: tabId
        })
        if (tabId === 1) {
            this.props.getDefaultUserAction()
        }
    }

    openPickupPopup = () => {
        this.setState({
            pickupPopup: true
        })
    }

    closePickupPopup = () => {
        this.setState({
            pickupPopup: false,
            driverName: "",
            pickupManName: "",
            driverNo: "",
            pickupManNo: ""
        })
    }

    handleDriverName = (e) => {
        this.setState({
            driverName: e.target.value
        })
    }

    handleDriverNo = (e) => {
        this.setState({
            driverNo: e.target.value
        })
    }

    handlePickupManName = (e) => {
        this.setState({
            pickupManName: e.target.value
        })
    }
    handlePickupManNo = (e) => {
        this.setState({
            pickupManNo: e.target.value
        })
    }

    handleSendBtn = () => {
        let { driverName, driverNo, pickupManName, pickupManNo } = this.state
        let {sendTripStatusAction, successReducer} = this.props;
        if(!driverName || !driverNo || !pickupManName || !pickupManNo){
            alert("Fields are vacant");
        }

        let userMobileNoList = lodash.get(successReducer,"bookingBusReports.bookings",[]);

        userMobileNoList = userMobileNoList.map((e) => {
            return e.userDetails[0] ? e.userDetails[0].contactNo : ""
        })


        let reqBody = {
            driverName:driverName,
            driverNo:driverNo,
            pickupManName:pickupManName,
            pickupManNo:pickupManNo,
            userMobileNoList:userMobileNoList
        }
        sendTripStatusAction(reqBody)
        this.closePickupPopup()

    }

    renderPickupPop = () => {
        let { driverName, driverNo, pickupManName, pickupManNo } = this.state
        return (
            <div className={s.pickupPop}>
                <div className={s.formField}>
                    <TextField label={"Driver Name"} type="text" onChange={this.handleDriverName} value={driverName} />
                </div>
                <div className={s.formField}>
                    <TextField label={"Driver Mobile Number"} type="number" onChange={this.handleDriverNo} value={driverNo} />
                </div>

                <div className={s.formField}>
                    <TextField label={"Pickup Man Name"} type="text" onChange={this.handlePickupManName} value={pickupManName} />
                </div>

                <div className={s.formField}>
                    <TextField label={"Pickup Man Mobile number"} type="number" onChange={this.handlePickupManNo} value={pickupManNo} />
                </div>
                <div className={s.formField}>
                    <button onClick={this.handleSendBtn}>Send Sms</button>
                </div>
            </div>
        )
    }

    render() {
        const { successReducer } = this.props;
        const { status, date, busNo, activeTab, pickupPopup } = this.state;
        return (
            <DefaultLayoutContainer
                screenName="admin"
            >
                <div className={s.reportsContainer}>
                    <div className={s.reportsHeader}>
                        <h2>Reports</h2>

                    </div>
                    <div className={s.tabs}>
                        <div onClick={() => { this.handleTabClick(0) }} className={`${s.tab} ${activeTab === 0 ? s.active : ""}`}>
                            <span>Pick Up Chart</span>
                        </div>
                        <div onClick={() => { this.handleTabClick(1) }} className={`${s.tab} ${activeTab === 1 ? s.active : ""}`}>
                            <span>User Payment Balance List</span>
                        </div>
                    </div>
                    {
                        activeTab === 0 && <React.Fragment>
                            <div className={s.fields}>
                                <div className={s.formField}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date picker dialog"
                                            format="dd/MM/yyyy"
                                            value={date}
                                            onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className={s.formField}>
                                    <InputLabel id="select-bus-type-label">Select Booking Status</InputLabel>
                                    <Select labelId="select-bus-type-label" value={status} onChange={this.handleStatus}>
                                        <MenuItem value="all">All</MenuItem>
                                        <MenuItem value="paid">Paid</MenuItem>
                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                    </Select>
                                </div>
                                <div className={s.formField}>
                                    <TextField label={"Bus Number"} type="text" onChange={this.handleBusNo} value={busNo} />
                                </div>
                                <div className={s.formField}>
                                    <button onClick={this.getReportsData}>Search</button>
                                </div>
                            </div>
                            <div className={s.searchResults}>
                                {
                                    successReducer && successReducer.bookingBusReports && successReducer.bookingBusReports.bookings.length > 0 ?
                                        <React.Fragment>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>S.No.</th>
                                                        <th>Bus No</th>
                                                        <th>Bus Name</th>
                                                        <th>User Name</th>
                                                        <th>User Contact</th>
                                                        <th>Seats</th>
                                                        <th>Journey Time</th>
                                                        <th>Source</th>
                                                        <th>Destination</th>
                                                        <th>Payment Balance</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {

                                                        successReducer.bookingBusReports.bookings.map((e, i) => {
                                                            return (
                                                                <tr key={new Date().getTime() + i}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{lodash.get(successReducer, "bookingBusReports.busDetails.busNo", "")}</td>
                                                                    <td>{lodash.get(successReducer, "bookingBusReports.busDetails.busName", "")}</td>
                                                                    <td>{e.userDetails[0] && e.userDetails[0].name}</td>
                                                                    <td>{e.userDetails[0] && e.userDetails[0].contactNo}</td>
                                                                    <td>{e.seatNo && e.seatNo.join(",")}</td>
                                                                    <td>{global.getTimeInFormat(new Date(e.journeyTime), "hh:mm:am/pm")}</td>
                                                                    <td>{this.getRoutesName(e.sourceId)}</td>
                                                                    <td>{this.getRoutesName(e.destId)}</td>
                                                                    <td>{e.userDetails[0] && e.userDetails[0].paymentBalance || 0}</td>
                                                                    <td>{e.isCancelled === 1 ? "Cancelled" : "Paid"}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            <div className={s.wrapBtn}>
                                                <CSVLink className={s.download} data={this.getCsvData()}>Download Report</CSVLink>
                                                <button onClick={this.openPickupPopup}>Send Trip Confirmed SMS</button>

                                            </div>
                                        </React.Fragment>

                                        :
                                        <h3>No Results Found</h3>
                                }
                            </div>
                        </React.Fragment>
                    }
                    {
                        activeTab === 1 &&
                        <div className={s.defaultUserBox}>
                            {
                                successReducer && successReducer.getDefaultUser && successReducer.getDefaultUser.length > 0 ?
                                    successReducer.getDefaultUser.map((e, i) => {
                                        return (
                                            <UserListItem
                                                key={new Date().getTime() + i}
                                                index={i}
                                                data={e}
                                                {...this.props}
                                            />
                                        )
                                    })
                                    :
                                    <h3>No Results Found</h3>
                            }
                        </div>
                    }

                    {
                        pickupPopup &&
                        <Modal
                            isShowCross={true}
                            customComp={this.renderPickupPop()}
                            onCloseHandler={this.closePickupPopup}
                        />
                    }

                </div>
            </DefaultLayoutContainer>
        )
    }
}

export default Reports;