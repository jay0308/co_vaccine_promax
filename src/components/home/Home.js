import React, { Component } from "react";
import s from "./home.module.scss";
import BusSearch from '../busSearch'
import DefaultLayout from "../common/defaultLayout/DefaultLayout";

export default class Home extends Component {
  componentDidMount() {
    let { getRoutesAction, getBusTypeAction } = this.props;
    getRoutesAction();
    getBusTypeAction();
  }
  componentWillUnmount() {
    let sr = { ...this.props.successReducer }
    if (sr && sr.searchBusResult) {
      sr.searchBusResult = null;
    }

    this.props.successAction(sr)
  }
  render() {
    let { successReducer } = this.props;
    return (
      <DefaultLayout screenName="home">
        <div className={s.mainCont}>
          <div className="searchRoute">
            <div className="searchSource">
              {
                successReducer && successReducer.getRoutes && successReducer.getBusType &&
                <BusSearch {...this.props} />
              }
            </div>
          </div>
        </div>

      </DefaultLayout>
    );
  }
}
