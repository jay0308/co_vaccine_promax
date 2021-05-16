import React from "react";
import s from "./app.module.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/HomeContainer";
import LoginComponent from "./components/login/LoginContainer";
import RegisterComponent from "./components/register/RegisterContainer";
import MyBookingsContainer from "./components/mybookings/MyBookingContainer";
import BusSearchContainer from "./components/busSearch";
import SelectSeatContainer from "./components/selectSeat/SelectSeatContainer";
import AdminContainer from "./components/Admin/AdminContainer";
import ErrorFallback from "./components/common/ErrorScreen/ErrorFallback";
import MyAccountContainer from "./components/myAccount";
import DesktopRoutes from "./DesktopRoutes";
import BusDetailsContainer from "./components/Admin/BusDetials/BusDetailsContainer";
import BookingsContainer from "./components/Admin/Bookings/BookingsContainer";
import SecuredRoutes from "./SecuredRoutes";
import PostPaymentContainer from "./components/PostPayment/PostPaymentContainer";
import BusTypesContainer from "./components/Admin/BusTypes/BusTypesContainer";
import ReportsContainer from "./components/Admin/Reports/ReportsContainer";
import SelectSeatAdmin from "./components/Admin/SelectSeatAdmin";
import global from "./utils/common";
import Help from "./components/Help";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div className={s.appShell}>
          <div className={s.appContainer}>
            <Switch>
              <Route exact path="/login">
                <LoginComponent />
              </Route>
              <Route exact path="/register">
                <RegisterComponent />
              </Route>

              <SecuredRoutes>
                {
                  global.isMobile() &&
                  <React.Fragment>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route exact path="/myBookings">
                      <MyBookingsContainer />
                    </Route>
                    <Route exact path="/BusSearch">
                      <BusSearchContainer />
                    </Route>
                    <Route exact path="/SelectSeat">
                      <SelectSeatContainer />
                    </Route>
                    <Route exact path="/myAccount">
                      <MyAccountContainer />
                    </Route>
                    <Route exact path="/help">
                      <Help />
                    </Route>
                    <Route exact path="/postPayment/:bookingId">
                      <PostPaymentContainer />
                    </Route>

                  </React.Fragment>
                }


                <Route exact path="/admin">
                  <SecuredRoutes isAdmin={true}>
                    <DesktopRoutes>
                      <AdminContainer />
                    </DesktopRoutes>
                  </SecuredRoutes>
                </Route>
                <Route exact path="/admin/busDetails">
                  <SecuredRoutes isAdmin={true}>
                    <DesktopRoutes>
                      <BusDetailsContainer />
                    </DesktopRoutes>
                  </SecuredRoutes>
                </Route>
                <Route exact path="/admin/busTypes">
                  <SecuredRoutes isAdmin={true}>
                    <DesktopRoutes>
                      <BusTypesContainer />
                    </DesktopRoutes>
                  </SecuredRoutes>
                </Route>
                <Route exact path="/admin/bookings">
                  <SecuredRoutes isAdmin={true}>
                    <DesktopRoutes>
                      <BookingsContainer />
                    </DesktopRoutes>
                  </SecuredRoutes>
                </Route>
                <Route exact path="/admin/reports">
                  <SecuredRoutes isAdmin={true}>
                    <DesktopRoutes>
                      <ReportsContainer />
                    </DesktopRoutes>
                  </SecuredRoutes>
                </Route>
                <Route exact path="/admin/selectSeat">
                  <SecuredRoutes isAdmin={true}>
                    <DesktopRoutes>
                      <SelectSeatAdmin />
                    </DesktopRoutes>
                  </SecuredRoutes>
                </Route>



              </SecuredRoutes>

              {/* Only on desktop */}
              {/* <DesktopRoutes>
                <SecuredRoutes isAdmin={true}>
                  <Route exact path="/admin">
                    <AdminContainer />
                  </Route>
                  <Route exact path="/admin/busDetails">
                    <BusDetailsContainer />
                  </Route>
                  <Route exact path="/admin/bookings">
                    <BookingsContainer />
                  </Route>

                </SecuredRoutes>
              </DesktopRoutes> */}


              <Route exact path="/errorFallback">
                <ErrorFallback />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Routes;
