import React, { Component } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import global from "../../utils/common";
import Modal from "../common/modal";

class BookingConfirmed extends Component {
    constructor(props){
        super(props);
        this.state = {
            cancelId:null,
            showModal:false
        }
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
    openCnfrmModal = (id) => {
        this.setState({
            cancelId:id
        })
        this.openModal()
    }
    openModal = () => {
        this.setState({
            showModal:true
        })
    }
    closeModal = () => {
        this.setState({
            showModal:false
        })
    }
    onCnfrmCancel = () => {
        this.closeModal();
        if(this.state.cancelId)
            this.props.onCancel(this.state.cancelId)
    }
    getCustomComp = () => {
        return(
            <div className={"cancelCnfrn"}>
                <h2>Are you sure want to cancel?</h2>
                <p>Only 50% of the total fair will get refunded.</p>
                <div className={"btns"}>
                    <button onClick={this.closeModal}>No</button>
                    <button onClick={this.onCnfrmCancel}>Yes</button>
                </div>
            </div>
        )
    }
    render() {
        let { data, onCancel } = this.props;
        let {showModal} = this.state;
        if (!data)
            return ""
        return (
            <div className="bookedTicketList ticketListWrapper">
                <div className="ticket">
                    <div className="ticketTop">
                        <div className="ticketLeft">
                            <p className="route">{this.getRoutesName(data.sourceId)} to {this.getRoutesName(data.destId)}</p>
                            <p className="journeyDate">{global.getDateInFormat(new Date(data.journeyDate))}</p>
                        </div>
                        <div className="ticketRight bookedIcon">
                            <CheckCircleIcon /> Confirmed
                </div>
                    </div>
                    <div className="ticketDetail">
                        <div className="detailLeft">
                            <div className="detailRow">
                                <span className="field">Seat No. </span>
                                <span className="Value">{data.seatNo ? data.seatNo.join(",") : ""}</span>
                            </div>
                            <div className="detailRow">
                                <span className="field">Ticket No. </span>
                                <span className="Value">{data._id}</span>
                            </div>
                            <div className="detailRow">
                                <span className="field">total fare </span>
                                <span className="Value">Rs.{data.totalFair}</span>
                            </div>
                            <div className="detailRow">
                                <span className="field">Journey Time </span>
                                <span className="Value">{global.getTimeInFormat(new Date(data.journeyTime),"hh:mm:am/pm")}</span>
                            </div>
                        </div>
                        <div className="detailRight"></div>
                    </div>
                    {
                        global.checkTimestampsValidity(new Date().getTime(), new Date(data.updateDate).getTime(), 24) &&
                        <div className={"cancelBtn"}>
                            <p>You have only 24hrs to cancel.</p>
                            <button onClick={()=>{this.openCnfrmModal(data._id)}}>Cancel</button>
                        </div>
                    }
                    {/* <div className="toogleDetailBtn expandbtn">
                        <ExpandMoreIcon />
                    </div> */}
                </div>
                {
                    showModal &&
                    <Modal
                        isShowCross={true}
                        customComp={this.getCustomComp()}
                        onCloseHandler = {this.closeModal}
                    />
                }
            </div>
        )
    }
}

export default BookingConfirmed;