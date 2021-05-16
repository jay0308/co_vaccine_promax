import React, { Component } from "react";
import s from "./busDetails.module.scss";
import "./mui-override.css";
import { TextField, Checkbox, Select, MenuItem, InputLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import global from "../../../utils/common";

class AddBusForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busName: "",
            busNo: "",
            busType: "",
            fairPrice: "",
            isFixed: true,
            runDaily: true,
            runningDays: "daily",
            journeyDates: [],
            tmpDate: new Date(),
            routesUp: [
                {
                    routeId: "",
                    km: "",
                    time: "00:01",

                }
            ],
            routesDown: [
                {
                    routeId: "",
                    km: "",
                    time: "00:01",

                }
            ],
            seats: null,
            selectedSeat: []
        }
    }
    componentDidMount() {
        let { isEditBus, busData } = this.props;
        if (isEditBus && busData) {
            let obj = {
                busName: busData.busName,
                busNo: busData.busNo,
                busType: busData.busType,
                fairPrice: busData.fairPrice,
                isFixed: busData.isFixed,
                // runDaily: busData.runDaily,
                runningDays: busData.runningDays,
                journeyDates: busData.journeyDates || [],
                routesUp: busData.routes.up,
                routesDown: busData.routes.down
            }
            this.setState(obj)
            this.setState({
                seats: this.getSeatFormat(busData.busType)
            })
        }
    }
    handleSeatChange(i, j) {
        let seats = [...this.state.seats];
        let selectedSeat = [...this.state.selectedSeat]
        console.log(seats[i][j])
        if (seats[i][j]) {
            if (!seats[i][j].checked) {
                selectedSeat.push(seats[i][j].name)
            } else {
                let index = selectedSeat.indexOf(seats[i][j].name);
                if (index > -1) {
                    selectedSeat.splice(index, 1);
                }
            }
            seats[i][j].checked = !seats[i][j].checked;
            console.log(seats)
            this.setState({
                seats: seats,
                selectedSeat: selectedSeat
            })
        }
    }
    getBusTypeObj = (id) => {
        const { successReducer } = this.props;
        let busType = successReducer && successReducer.getBusType && successReducer.getBusType.busTypeList || [];
        let filtered = busType.filter((e) => {
            if (e._id === id)
                return e
        })
        console.log("Filtered", filtered, busType, id)
        if (filtered.length > 0)
            return filtered[0]

        return ""
    }
    getSeatFormat = (busType) => {
        let bustypeData = this.getBusTypeObj(busType)
        let obj = [];
        bustypeData && bustypeData.seatMatrix && bustypeData.seatMatrix.map((ele) => {
            let arr = []
            ele.map((e) => {
                arr.push({ name: e, checked: this.checkIfSeatIsAllocated(e) })
            })
            obj.push(arr)
        })
        return obj;
    }
    checkIfSeatIsAllocated = (seatNo) => {
        let { isEditBus, busData } = this.props;
        let { selectedSeat } = this.state;
        if (isEditBus && busData && busData.seatBlocked && busData.seatBlocked.length > 0) {
            for (let i = 0; i < busData.seatBlocked.length; i++) {
                const element = busData.seatBlocked[i];
                if (element === seatNo) {
                    selectedSeat.push(element)
                    this.setState({
                        selectedSeat: selectedSeat
                    })
                    return true;
                }
            }

        } else {
            return false
        }
    }
    addRoutUp = () => {
        let routesUp = [...this.state.routesUp]
        routesUp.push({
            routeId: "",
            km: "",
            time: "",

        })
        this.setState({
            routesUp: routesUp
        })
    }
    addRoutDown = () => {
        let routesDown = [...this.state.routesDown]
        routesDown.push({
            routeId: "",
            km: "",
            time: "",

        })
        this.setState({
            routesDown: routesDown
        })
    }
    deleteroutesUp = (index) => {
        let routesUp = [...this.state.routesUp]
        routesUp = routesUp.filter((e, i) => {
            if (i !== index) {
                return e
            }
        })
        this.setState({
            routesUp: routesUp
        })
    }
    deleteRouteDown = (index) => {
        let routesDown = [...this.state.routesDown]
        routesDown = routesDown.filter((e, i) => {
            if (i !== index) {
                return e
            }
        })
        this.setState({
            routesDown: routesDown
        })
    }
    // form field inputs
    handleBusName = (e) => {
        this.setState({
            busName: e.target.value
        })
    }
    handleBusNo = (e) => {
        this.setState({
            busNo: e.target.value
        })
    }
    handleBusType = (e) => {
        this.setState({
            busType: e.target.value,
            seats: this.getSeatFormat(e.target.value)
        })
    }
    handleBusFairPrice = (e) => {
        this.setState({
            fairPrice: e.target.value
        })
    }
    handleIsFixed = (e) => {
        this.setState({
            isFixed: !this.state.isFixed
        })
    }
    handleDateChange = (date) => {
        this.setState({
            tmpDate: date
        })
    }
    addDate = () => {
        let { tmpDate, journeyDates } = this.state;
        if (tmpDate) {
            let arr = [...journeyDates];
            arr.push(tmpDate)
            this.setState({
                journeyDates: arr
            })
        }
    }
    removeDate = (index) => {
        let arr = [...this.state.journeyDates]
        arr.splice(index, 1);
        this.setState({
            journeyDates: arr
        })
    }
    handleRunDaily = (e) => {
        this.setState({
            runDaily: !this.state.runDaily
        })
    }
    handleRunningDays = (event) => {
        this.setState({
            runningDays: event.target.value
        })
    }
    handleSelectRoute = (e, i, type) => {
        let { routesUp, routesDown } = this.state
        if (type === "up") {
            routesUp[i].routeId = e.target.value
        } else {
            routesDown[i].routeId = e.target.value
        }
        this.setState({
            routesUp,
            routesDown
        })
    }
    handleTime = (date, i, type) => {
        let { routesUp, routesDown } = this.state

        if (type === "up") {
            routesUp[i].time = date
        } else {
            routesDown[i].time = date
        }
        console.log(routesUp[i].time)
        this.setState({
            routesUp,
            routesDown
        })
    }
    handleKm = (e, i, type) => {
        let { routesUp, routesDown } = this.state
        if (type === "up") {
            routesUp[i].km = e.target.value
        } else {
            routesDown[i].km = e.target.value
        }
        this.setState({
            routesUp,
            routesDown
        })
    }
    handleSubmit = () => {
        let { busName, busNo, busType, fairPrice, isFixed, journeyDates, runningDays, routesUp, routesDown, selectedSeat } = this.state;
        if (!busName || !busNo || !busType || !fairPrice) {
            alert("please fill all the fields")
            return false;
        }
        if (runningDays === "onDate") {
            if (!journeyDates || journeyDates.length === 0) {
                alert("please add dates")
                return false;
            }
        }
        let obj = {
            busName: busName,
            busNo: busNo,
            busType: busType,
            fairPrice: fairPrice,
            isFixed: isFixed,
            journeyDates: journeyDates,
            runningDays: runningDays,
            routes: {
                up: routesUp,
                down: routesDown
            },
            seatBlocked: selectedSeat
        }

        console.log(obj)
        let { createBusAction, onCloseHandler, editBusAction, isEditBus, busData } = this.props;

        if (isEditBus) {
            obj._id = busData._id
            editBusAction(obj)
        } else
            createBusAction(obj);
        this.setState({
            busName: "",
            busNo: "",
            busType: "",
            fairPrice: "",
            isFixed: true,
            runDaily: true,
            journeyDate: new Date(),
            routesUp: [
                {
                    routeId: "",
                    km: "",
                    time: "00:01",

                }
            ],
            routesDown: [
                {
                    routeId: "",
                    km: "",
                    time: "00:01",

                }
            ]
        })
        onCloseHandler();
    }


    renderRoutesForm = (index, routeType) => {
        let { successReducer } = this.props;
        let { routesUp, routesDown } = this.state;
        return (
            <div className={s.routesForm}>
                <div className={s.routeCol} style={{ width: "30%" }}>
                    <InputLabel id="select-route-label">Select Routes</InputLabel>
                    <Select labelId="select-route-label" onChange={(e) => { this.handleSelectRoute(e, index, routeType) }} value={routeType === "up" ? routesUp[index].routeId : routesDown[index].routeId}>
                        {
                            successReducer && successReducer.getRoutes &&
                            successReducer.getRoutes.routes.map((e, i) => {
                                return (
                                    <MenuItem value={e._id}>{e.routeName}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className={s.routeCol} style={{ width: "10%" }}>
                    <TextField type="text" placeholder="km" value={routeType === "up" ? routesUp[index].km : routesDown[index].km} onChange={(e) => { this.handleKm(e, index, routeType) }} />
                </div>
                <div className={s.routeCol} style={{ width: "40%" }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            // label="Time picker"
                            value={routeType === "up" ? routesUp[index].time : routesDown[index].time}
                            onChange={(date) => { this.handleTime(date, index, routeType) }}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className={s.routeCol} style={{ width: "20%" }}>
                    <button onClick={routeType === "up" ? () => { this.deleteroutesUp(index) } : () => { this.deleteRouteDown(index) }}>Delete</button>
                </div>
            </div>
        )
    }
    render() {
        let { successReducer } = this.props;
        const { busName, busNo, busType, fairPrice, isFixed, tmpDate, runDaily, journeyDates, routesUp, routesDown, seats, selectedSeat, runningDays } = this.state;
        return (
            <div className={s.addBusForm}>
                <h2>Add Bus</h2>
                <div className={s.formBox}>
                    <div className={s.formInner}>
                        <div className={s.formField}>
                            <TextField label={"Bus Name"} type="text" onChange={this.handleBusName} value={busName} />
                        </div>
                        <div className={s.formField}>
                            <TextField label={"Bus Number"} type="text" onChange={this.handleBusNo} value={busNo} />
                        </div>
                        <div className={s.formField}>
                            <InputLabel id="select-bus-type-label">Select Bus Type</InputLabel>
                            <Select labelId="select-bus-type-label" value={busType} onChange={this.handleBusType}>

                                {
                                    successReducer && successReducer.getBusType &&
                                    successReducer.getBusType.busTypeList.map((e, i) => {
                                        return (
                                            <MenuItem value={e._id}>{e.maxSeat}X{e.maxRows}:{e.desc}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className={s.formField}>
                            <div className={s.formFieldLeft}>
                                <TextField label="Fair Price" type="text" value={fairPrice} onChange={this.handleBusFairPrice} />
                            </div>
                            <div className={s.formFieldRight}>
                                <FormControlLabel
                                    value="start"
                                    control={<Checkbox checked={isFixed} onChange={this.handleIsFixed} />}
                                    label="Is Fixed?"
                                    labelPlacement="start"
                                />

                            </div>
                        </div>
                        <div className={`${s.formField} ${s.column}`}>

                            <div className={s.formRow}>
                                {/* <FormControlLabel
                                    value="start"
                                    control={<Checkbox label="Runs Daily?" onChange={this.handleRunDaily} checked={runDaily} />}
                                    label="Runs Daily?"
                                    labelPlacement="start"
                                /> */}

                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Running Days</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={runningDays} onChange={this.handleRunningDays}>
                                        <FormControlLabel value="even" control={<Radio />} label="Even Days" />
                                        <FormControlLabel value="odd" control={<Radio />} label="Odd Days" />
                                        <FormControlLabel value="daily" control={<Radio />} label="Daily" />
                                        <FormControlLabel value="onDate" control={<Radio />} label="On Dates" />
                                    </RadioGroup>
                                </FormControl>

                            </div>
                            {
                                runningDays === "onDate" &&
                                <div className={s.formRow}>
                                    <div className={s.block}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Date picker dialog"
                                                format="dd/MM/yyyy"
                                                value={tmpDate}
                                                onChange={this.handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        <span className={s.addDate} onClick={this.addDate}>Add Dates</span>
                                    </div>
                                    {
                                        journeyDates && journeyDates.length > 0 &&
                                        <div className={`${s.block} ${s.dateRow}`}>
                                            {
                                                journeyDates.map((e, i) => {
                                                    return <div key={new Date().getTime() + i} className={s.dateList}>{global.getDateInFormat(new Date(e), "dd/mm/yyyy")}<span onClick={() => { this.removeDate(i) }}>X</span></div>
                                                })
                                            }
                                        </div>
                                    }
                                    {/* <TextField laebl="Journey Date" type="date" value={journeyDate} /> */}
                                </div>
                            }
                        </div>
                        <div className={`${s.formField} ${s.column}`}>
                            <label>Routes Up</label>
                            {
                                routesUp.map((e, i) => {
                                    return this.renderRoutesForm(i, "up")
                                })
                            }
                            <button onClick={this.addRoutUp}>Add</button>
                        </div>
                        <div className={`${s.formField} ${s.column}`}>
                            <label>Routes Down</label>
                            {
                                routesDown.map((e, i) => {
                                    return this.renderRoutesForm(i, "down")
                                })
                            }
                            <button onClick={this.addRoutDown}>Add</button>
                        </div>
                        <button onClick={this.handleSubmit} className={s.submitBtn}>Submit</button>
                    </div>

                    <div className={s.seatMatrix}>
                        {
                            !seats ?
                                <h3>Select bus type to see bus seat strcture</h3>
                                :
                                <h3>Select seats to block</h3>
                        }
                        {
                            seats &&
                            seats.map((e, i) => {
                                return (
                                    <div className={s.row}>
                                        {
                                            e &&
                                            e.map((ele, j) => {
                                                return (
                                                    <div className={s.block} key={new Date().getMilliseconds() + i + j}>
                                                        {
                                                            ele && ele.name &&
                                                            <React.Fragment>
                                                                {
                                                                    // ele.disabled ?
                                                                    //     <input type="checkbox" disabled onChange={() => { this.handleSeatChange(i, j) }} checked={ele.checked} />
                                                                    //     :
                                                                    <span className={`${s.customCheckbox} ${ele.checked || ele.disabled ? s.checked : ""}`} onClick={() => { this.handleSeatChange(i, j) }} />
                                                                }

                                                                <span>{ele.name}</span>
                                                            </React.Fragment>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </div>
        )
    }
}

export default AddBusForm;