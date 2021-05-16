import React, { Component } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CancelIcon from "@material-ui/icons/CheckCircle";
import global from "../../utils/common";

class BookingCancelled extends Component {
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
    render() {
        let { data } = this.props;
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
                        <div className="ticketRight cancelledIcon">
                            <CancelIcon /> Cancelled
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
                    {/* <div className="toogleDetailBtn expandbtn">
                        <ExpandMoreIcon />
                    </div> */}
                </div>
            </div>
        )
    }
}

export default BookingCancelled;