import React, { Component } from "react";
import global from "../../utils/common";
import { withRouter } from "react-router-dom";
// import BusDetailsCard from "../common/busDetailsCard";
class BusList extends Component {

  getBusTypeName = (id) => {
    const { successReducer } = this.props;
    let busType = successReducer && successReducer.getBusType && successReducer.getBusType.busTypeList || [];
    let filtered = busType.filter((e) => {
      if (e._id === id)
        return e
    })
    console.log("Filtered", filtered, busType, id)
    if (filtered.length > 0)
      return `${filtered[0].maxSeat}X${filtered[0].maxRows}:${filtered[0].desc}`

    return ""
  }

  onClickCard = (id, journeyTime) => {
    let { sourceId, destId, journeyDate } = this.props;
    if(global.isMobile()){
      this.props.history.push(`/SelectSeat?busId=${id}&journeyDate=${journeyDate}&sourceId=${sourceId}&destId=${destId}&journeyTime=${journeyTime}`)
    }else{
      this.props.history.push(`/admin/SelectSeat?busId=${id}&journeyDate=${journeyDate}&sourceId=${sourceId}&destId=${destId}&journeyTime=${journeyTime}`)
    }
    
  }

  render() {
    let { successReducer } = this.props
    return (
      <div className="listWrapper">
        {
          successReducer && successReducer.searchBusResult && successReducer.searchBusResult.length > 0 &&
          <h2>Available Buses</h2>
        }
        {
          // global.isMobile() &&
          successReducer && successReducer.searchBusResult &&
          successReducer.searchBusResult.map((e, i) => {
            return (
              <div className="ResultCard" key={new Date().getMilliseconds() + i} onClick={() => { this.onClickCard(e._id, e.source.time) }}>
                <div className="cardLeft">
                  <div className="time">
                    <span className="startTime">{global.getTimeInFormat(e.source.time, "hh:mm:am/pm")}</span>
                    <span className="reachTime">{global.getTimeInFormat(e.destination.time, "hh:mm:am/pm")}</span>
                    <p className="busName">{e.busName}({e.busNo})</p>
                    <p className="busType">Bus Type {this.getBusTypeName(e.busType)}</p>
                  </div>
                </div>
                <div className="cardRight">
                  <p className="fairAmount">Rs. {e.fairPrice}</p>
                  <p className="totalTime">{global.getHours(e.source.time, e.destination.time)}</p>
                  <p className="bookNow">Book Now</p>
                </div>
              </div>
            )
          })
        }
        {/* {
          !global.isMobile() &&
          successReducer && successReducer.searchBusResult &&
          successReducer.searchBusResult.map((e, i) => {
            return (
              <div className="resultDesktopCard">
                <div className="left">
                  <BusDetailsCard
                    key={new Date().getMilliseconds() + i}
                    {...this.props}
                    busData = {e}
                  />
                </div>
                <div className="right"></div>
              </div>
            )
          })
        } */}
        {
          successReducer && successReducer.searchBusResult && successReducer.searchBusResult.length === 0 &&
          <div className={"noBusFound"}>
            No Bus Found
         </div>
        }
      </div>
    );
  }
}

export default withRouter(BusList);