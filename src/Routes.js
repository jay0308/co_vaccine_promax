import React from "react";
import s from "./app.module.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/HomeContainer";
import LoginComponent from "./components/login/LoginContainer";
import RegisterComponent from "./components/register/RegisterContainer";
import ErrorFallback from "./components/common/ErrorScreen/ErrorFallback";
import SecuredRoutes from "./SecuredRoutes";
import global from "./utils/common";

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

              <SecuredRoutes>
                {
                  // global.isMobile() &&
                  <React.Fragment>
                    <Route exact path="/">
                      <Home />
                    </Route>

                  </React.Fragment>
                }

              </SecuredRoutes>
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
