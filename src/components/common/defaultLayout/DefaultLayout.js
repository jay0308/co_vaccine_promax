import React, { Component } from "react";
import s from "./defaultLayout.module.scss";
import Header from "../header/HeaderContainer";
import LoaderContainer from "../loader/LoaderContainer";
import GenericPopupContainer from "../genericPopup/GenericPopupContainer";
import ErrorScreen from "../ErrorScreen";
import constants from "../../../utils/constants";
import Footer from "../footer";

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  componentDidCatch(error, errorInfo) {
    if (error) {
      this.setState({
        hasError: true,
      });
    }
  }
  isShowFooter = () => {
    let notShowFooterOnScreen = ["otp","login","register"];
    let {screenName} = this.props;
    return notShowFooterOnScreen.indexOf(screenName) > -1 ? false : true
  }
  render() {
    return (
      <React.Fragment>
        <Header
          {...this.props}
          screenName={
            this.state.hasError ? "errorScreen" : this.props.screenName || ""
          }
        />
        <div className={`${s.appContainer} ${this.props.screenName === "admin" ? s.adminPage : ""}`}>
          {this.state.hasError || this.props.appErrorMsg ? (
            <ErrorScreen
              {...this.props}
              loaderAction={this.props.loaderAction}
              history={this.props.history}
              errorMsg={
                this.props.appErrorMsg || constants.MSGS.genericErrorMsg
              }
            />
          ) : (
            this.props.children
          )}
        </div>
        {
          this.isShowFooter() &&
          <Footer {...this.props} />
        }
        <LoaderContainer />
        <GenericPopupContainer />
      </React.Fragment>
    );
  }
}

export default DefaultLayout;
