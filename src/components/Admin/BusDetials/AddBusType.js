import React, { Component } from "react";
import s from "./busDetails.module.scss";
import "./mui-override.css";
import { TextField } from '@material-ui/core';

class AddbusType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxSeat: 0,
            maxRows: 0,
            seatMatrix: [],
            cuurentRef: "",
            desc: ""
        }
    }
    componentDidMount() {
        let { isEdit, busTypeData } = this.props
        if (isEdit && busTypeData) {
            this.setState({
                maxSeat: busTypeData.maxSeat,
                maxRows: busTypeData.maxRows,
                seatMatrix: busTypeData.seatMatrix,
                desc: busTypeData.desc
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.refs[this.state.cuurentRef]) {
            let elem = this.refs[this.state.cuurentRef]
            let allInp = elem.getElementsByTagName("input");
            if (allInp && allInp.length > 0) {
                allInp[0].focus()
            }
        }
    }
    handleBusSeat = (e) => {
        this.setState({
            maxSeat: e.target.value
        }, () => {
            this.setSeatMatrix()
        })

    }
    handleMaxRows = (e) => {
        this.setState({
            maxRows: e.target.value
        }, () => {
            this.setSeatMatrix()
        })
    }
    handleDesc = (e) => {
        this.setState({
            desc: e.target.value
        })
    }
    setSeatMatrix = () => {
        let { maxSeat, maxRows } = this.state;
        let seatMatrix = []
        for (let i = 0; i < parseInt(maxRows); i++) {
            let arr = [];
            for (let j = 0; j < parseInt(maxSeat); j++) {
                arr[j] = "";
            }
            seatMatrix.push(arr)
        }
        this.setState({
            seatMatrix
        })
    }
    setSeatNumber = (e, i, j) => {
        let { seatMatrix } = this.state;
        seatMatrix[i][j] = e.target.value;
        this.setState({
            seatMatrix,
            cuurentRef: `${i}-${j}`
        })
    }

    handleSubmit = () => {
        let { createBusTypeAction, closePopup, editBusTypeAction, isEdit,busTypeData } = this.props;
        let { desc, seatMatrix, maxSeat, maxRows } = this.state;
        let reqObj = [{
            desc: desc,
            seatMatrix: seatMatrix,
            maxSeat: maxSeat,
            maxRows: maxRows
        }]
        if (isEdit) {
            let reqObj = {
                _id:busTypeData._id,
                desc: desc,
                seatMatrix: seatMatrix,
                maxSeat: maxSeat,
                maxRows: maxRows
            }
            editBusTypeAction(reqObj)
        } else {
            createBusTypeAction(reqObj);
        }
        closePopup()
    }
    renderSeatStructure = () => {
        let { maxSeat, maxRows, seatMatrix } = this.state;
        if (!maxSeat && !maxRows)
            return ""


        return (
            <div className={s.seatAreaCont}>
                <h3>Select seats</h3>
                <div className={s.selectSeatArea}>
                    {
                        seatMatrix.map((ele, i) => {
                            return (
                                <div className={s.seatRow} key={new Date().getTime() + i}>
                                    {
                                        ele.map((em, j) => {
                                            return (
                                                <div className={`${s.seatBox} ${seatMatrix[i][j] ? s.filled : ""}`} key={new Date().getTime() + j}>
                                                    <TextField ref={`${i}-${j}`} type="text" value={seatMatrix[i][j]} onChange={(e) => { this.setSeatNumber(e, i, j) }} />
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
        )
    }
    render() {
        const { maxSeat, maxRows, desc } = this.state;
        const { successReducer } = this.props;
        return (
            <div className={`${s.addBusForm} ${s.addBusTypeForm}`}>
                <h2>Add Bus Type</h2>

                <div className={s.formInner}>
                    <div className={s.formField}>
                        <TextField label={"Description"} type="text" onChange={this.handleDesc} value={desc} placeholder="Non Ac, Sleeper" />
                    </div>
                    <div className={s.formField}>
                        <div className={s.formFieldLeft}>
                            <TextField label="Max. Seat in a Row" type="number" value={maxSeat} onChange={this.handleBusSeat} />
                        </div>
                        <span style={{
                            "font-size": "20px",
                            "margin": "12px 30px",
                            "font-weight": "500"
                        }}>X</span>
                        <div className={s.formFieldRight}>
                            <TextField label="Max. Rows" type="number" value={maxRows} onChange={this.handleMaxRows} />
                        </div>
                    </div>
                    <div className={s.formField}>
                        {this.renderSeatStructure()}
                    </div>
                    {
                        maxRows > 0 && maxSeat > 0 &&
                        <button onClick={this.handleSubmit} className={s.submitBtn}>Submit</button>
                    }
                </div>
            </div>
        )
    }
}

export default AddbusType;