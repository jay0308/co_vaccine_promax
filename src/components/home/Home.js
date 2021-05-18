import React, { Component } from "react";
import s from "./home.module.scss";
import BusSearch from '../busSearch'
import DefaultLayout from "../common/defaultLayout/DefaultLayout";
import { get } from "lodash";
import BeneficiaryCard from "../beneficiaryCard";

export default class Home extends Component {
  componentDidMount() {
    let { getBeneficiaryAction } = this.props;
    getBeneficiaryAction();
  }
  render() {
    let { successReducer } = this.props;
    let benefeciaries = get(successReducer, "co_benefeciary_res.beneficiaries", [])
    return (
      <DefaultLayout screenName="home">
        <div className={s.mainCont}>
          <div className={s.mainContInner}>
            <div className={s.headLabel}>Select Beneficiaries</div>
            {
              benefeciaries.map((e, i) => {
                return (
                  <div style={{ cursor: "pointer" }}>
                    <BeneficiaryCard
                      key={e.beneficiary_reference_id}
                      {...e}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>

      </DefaultLayout>
    );
  }
}
