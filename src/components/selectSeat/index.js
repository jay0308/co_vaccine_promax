import React, { Component } from "react";
import "./selectSeat.scss";
import DefaultLayout from "../common/defaultLayout/DefaultLayoutContainer";
import global from "../../utils/common";
import BusDetailsCard from "../common/busDetailsCard";
import BusSeatAllocation from "./BusSeatAllocation";

class SelectSeat extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let searchParms = global.getUrlParams()
    let busId = searchParms.get("busId")
    let sourceId = searchParms.get("sourceId")
    let destId = searchParms.get("destId")
    let journeyDate = searchParms.get("journeyDate")
    let journeyTime = searchParms.get("journeyTime")
    console.log("URL PRMS", busId, sourceId, destId, journeyDate, journeyTime)

    let { bookingDetailsAction, userDataReducer, getRoutesAction, getBusTypeAction } = this.props;
    if (userDataReducer) {
      let reqObj = {
        busId: busId,
        sourceId: sourceId,
        destId: destId,
        journeyDate: journeyDate,
        journeyTime: journeyTime,
        userId: userDataReducer._id
      }
      getBusTypeAction();
      getRoutesAction();
      bookingDetailsAction(reqObj)
    }

  }
  componentWillUnmount() {
    let sr = { ...this.props.successReducer }
    if (sr && sr.bookingDetails) {
        sr.bookingDetails = null;
    }

    this.props.successAction(sr)
}


  render() {
    let { successReducer } = this.props;
    return (
      <DefaultLayout screenName={global.isMobile() ? "selectSeat" : "admin"}>
        {
          successReducer && successReducer.getBusType && successReducer.getRoutes &&
          <div>
            {
              successReducer && successReducer.bookingDetails &&
              <div className={"busCard"}>
                <BusDetailsCard
                  {...this.props}
                  busData={successReducer.bookingDetails.busDetails}
                />
              </div>
            }
            <div className="SelectSeatContainer">
              <div className="seatCategory">
                <span className="type available">
                  {/* <AirlineSeatReclineNormalIcon /> */}
                  <span className="available"></span>
                  Available
                </span>
                <span className="type booked">
                  {/* <AirlineSeatReclineNormalIcon /> */}
                  <span className="booked"></span>
                  Booked
                </span>
                <span className="type selected">
                  <span className="selected"></span>
                  {/* <AirlineSeatReclineNormalIcon /> */}
                  Selected
                </span>
                {/* <span className="type ladies">
                  <AirlineSeatReclineNormalIcon />
                  Ladies
                </span> */}
              </div>
            </div>
            <div className="seatForSelection">
              {
                successReducer && successReducer.bookingDetails &&
                <BusSeatAllocation
                  {...this.props}
                  busData={successReducer.bookingDetails.busDetails}
                  bookingDetails = {successReducer.bookingDetails}
                />
              }
            </div>
          </div>
        }


      </DefaultLayout>

    );
  }
}

export default SelectSeat;
