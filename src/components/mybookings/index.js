import React, { Component } from "react";
import "./myBooking.scss";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CancelIcon from "@material-ui/icons/Cancel";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DefaultLayout from "../common/defaultLayout/DefaultLayout";
import BookingConfirmed from "./BookingConfirmed";
import BookingCancelled from "./BookingCancelled";

class Mybookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBooked: true,
      showcancelled: false,
    };
  }
  componentDidMount() {
    let { getRoutesAction,getMyInfoAction } = this.props;
    getRoutesAction();
    getMyInfoAction();
    this.bookingStatusCall()
  }
  bookingStatusCall = () => {
    let { userDataReducer, bookingStatusAction } = this.props;
    let { showcancelled } = this.state;
    let qs = "";
    if (userDataReducer) {
      qs = `?uId=${userDataReducer._id}&isCancelled=${showcancelled ? 1 : 0}`;
      bookingStatusAction(qs)
    }
  }
  showBookedTickets = (e) => {
    if (!this.state.showBooked) {
      this.setState({
        showBooked: true,
        showcancelled: false,
      }, () => { this.bookingStatusCall() });
    }
    // else{
    //   this.setState ({
    //     showBooked: false, 
    //     showcancelled: true,     
    //   });
    // }
  };
  showCancelledTickets = (e) => {
    if (!this.state.showcancelled) {
      this.setState({
        showcancelled: true,
        showBooked: false,
      }, () => { this.bookingStatusCall() });
    }
    // else{
    //   this.setState({
    //     showcancelled: false,
    //     showBooked: true, 
    //   });
    // }
    console.log(this.state.showBooked, "asas");
  };

  cancelHandler = (id) => {
    let { cancelBookingAction } = this.props;
    let reqObj = {
      bookingId: id
    }
    cancelBookingAction(reqObj)
  }

  render() {
    let { successReducer,userDataReducer } = this.props;
    return (
      <DefaultLayout screenName="myBookings">
        <div className="MyBookingsContainer">
          {
            userDataReducer &&
            userDataReducer.paymentBalance !== undefined && userDataReducer.paymentBalance !== null  && 
            userDataReducer.paymentBalance > 0 &&
            <div className="dueAmount">Amount due on you Rs. {userDataReducer.paymentBalance}</div>
          }
          <div className="bookingTabs">
            <span
              className={this.state.showBooked ? "active" : ""}
              onClick={this.showBookedTickets}
            >
              Booked
          </span>
            <span
              className={this.state.showcancelled ? "active" : ""}
              onClick={this.showCancelledTickets}
            >
              Cancelled
          </span>
          </div>
          <React.Fragment>
            {
              successReducer && successReducer.getRoutes ?
                <React.Fragment>
                  {this.state.showBooked && !this.state.showcancelled && successReducer &&
                    successReducer.bookingStatus &&
                    successReducer.bookingStatus.map((e, i) => {
                      return (
                        <BookingConfirmed {...this.props} key={new Date().getTime() + i} data={e} onCancel={this.cancelHandler} />
                      )
                    })
                  }

                  {this.state.showBooked && !this.state.showcancelled && successReducer &&
                    successReducer.bookingStatus &&
                    successReducer.bookingStatus.length === 0 &&
                    <div className="noDataFound">
                      No Data Found
                    </div>
                  }

                  {this.state.showcancelled && successReducer &&
                    successReducer.bookingStatus &&
                    successReducer.bookingStatus.map((e, i) => {
                      return (
                        <BookingCancelled {...this.props} key={new Date().getTime() + i} data={e} />
                      )
                    })
                  }

                  {this.state.showcancelled && successReducer &&
                    successReducer.bookingStatus &&
                    successReducer.bookingStatus.length === 0 &&
                    <div className="noDataFound">
                      No Data Found
                    </div>
                  }
                </React.Fragment>
                : ""

            }
          </React.Fragment>

        </div>

      </DefaultLayout>
    );
  }
}

export default Mybookings;
