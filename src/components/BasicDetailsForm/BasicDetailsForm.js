import React, { Component } from "react";
import s from "./BasicDetails.module.scss";
import DefaultLayout from "../common/defaultLayout/DefaultLayout";
import actions from "../../store/actions";
import { connect } from "react-redux";
import { get } from "lodash";
const mapStateToProps = (state) => {
  let stateList = get(state, "successReducer.stateList.states", []);
  let districtList = get(state, "successReducer.districtList.districts", []);
  let benefeciaries = get(
    state,
    "successReducer.co_benefeciary_res.beneficiaries",
    []
  );
  return {
    stateList,
    districtList,
    benefeciaries,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStates: () => dispatch(actions.getStates()),
    getDistricts: (qs) => dispatch(actions.getDistricts(qs)),
  };
};
class BasicDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchByPincode: false,
      searchByState: false,
      selectedState: 0,
      selectedDistrict: 0,
      selectedDistrictName: '',
      enteredPincode: 0,
      centerCount: 0,
      calendarRefreshTime: 15,
      iscustomDate: false,
      startDate: null,
      vaccineType: "Any",
      customDate: null,
      feeType: null,
      finalJson: {},
    };
  }
  componentDidMount(){
      let {benefeciaries}=this.props;
      let obj={beneficiary_dtls:[], location_dtls:[]};
      benefeciaries.map(e=>{
        obj.beneficiary_dtls.push({
            'bref_id': e.beneficiary_reference_id,
            'name': e.name,
            'vaccine:': e.vaccine,
            'age': new Date(Date.now()).getFullYear()-e.birth_year,
            'status': e.vaccination_status
        })
      })
      this.setState({finalJson: obj})
      console.log(obj,"objjj")
  }
  onPincodeClicked = () => {
    this.setState({ searchByPincode: true, searchByState: false });
  };
  onStateClicked = () => {
    this.props.getStates();
    this.setState({ searchByState: true, searchByPincode: false });
  };
  onStateOptionClick = (e) => {
    this.setState({ selectedState: e.target.value }, () => {
      this.props.getDistricts(this.state.selectedState);
    });
  };
  onDistrictOptionClick = (e) => {
    let {finalJson}=this.state;
    let obj={...finalJson}
    obj.location_dtls=[{district_id: e.target.value, district_name:e.target.selectedOptions[0].innerHTML,
    search_option:2 }]
    this.setState({ selectedDistrict: e.target.value, 
        selectedDistrictName:e.target.selectedOptions[0].innerHTML,
        finalJson:{...obj}})
  };
  pincodeHandler = (e) => {
    let {finalJson}=this.state;
    let obj={...finalJson}
    obj.location_dtls=[{pincode: e.target.value, search_option: 1}]
    this.setState({ enteredPincode: e.target.value, finalJson:{...obj} })
  };
  onCenterCountHandler = (e) => {
    let {finalJson}=this.state;
    let obj={...finalJson}
    obj.minimum_slots=e.target.value
    this.setState({ centerCount: e.target.value, finalJson:{...obj} }, () => {
      console.log(this.state.finalJson);
    });
  };
  calendarRefreshHandler = (e) => {
    let {finalJson}=this.state;
    let obj={...finalJson}
    obj.refresh_freq=e.target.value
    this.setState({ calendarRefreshTime: e.target.value, finalJson:{...obj} }, () => {
      console.log(this.state.finalJson);
    });
  };
  customStartDateHandler = (e) => {
    let {finalJson}=this.state;
    let obj={...finalJson}
    if (e.target.value === "today") {
        obj.start_date=new Date().toLocaleDateString()
      this.setState({ iscustomDate: false,finalJson:{...obj} },()=>{
          console.log(this.state.finalJson)
      });
    } else if (e.target.value === "tomorrow") {
        let currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        obj.start_date=currentDate.toLocaleDateString()
      this.setState({ iscustomDate: false,finalJson:{...obj} },()=>{
        console.log(this.state.finalJson)
    });
    } else {
      this.setState({ iscustomDate: true});
    }
    
  };
  setCustomDate = (e) => {
    let {finalJson}=this.state;
    let obj={...finalJson}
    obj.start_date=new Date(e.target.value).toLocaleDateString()
    this.setState({ customDate: e.target.value, finalJson:{...obj} }, () => {
      console.log(this.state.finalJson);
    });
  };
  typeOfVaccineHandler = (e) => {
    let {finalJson}=this.state;
    let obj={...finalJson}
    obj.vaccine_type=e.target.value
    this.setState({ vaccineType: e.target.value,finalJson:{...obj} },()=>{
        console.log(this.state.finalJson)
    })
  };
  feeTypeHandler = (e) => {
    let {finalJson}=this.state;
    let obj={...finalJson}
    obj.fee_type=[];
    if(e.target.value==='Any')
        obj.fee_type=["Free","Paid"]
    else{
        obj.fee_type.push(e.target.value)
    }
    this.setState({ feeType: e.target.value, finalJson:{...obj} }, () => {
      console.log(this.state.finalJson, "type of fee");
    });
  };
  submitClicked = () => {
    console.log(this.state.finalJson, "final json");
  };
  autoBookHandler = (e) => {
    let {finalJson}=this.state;
    let obj={...finalJson}
    obj.auto_book=e.target.value
    this.setState({ finalJson:{...obj} },()=>{
        console.log(this.state.finalJson)
    })
  }
  render() {
    let {
      searchByPincode,
      searchByState,
      iscustomDate,
      centerCount,
      calendarRefreshTime,
    } = this.state;
    let { stateList, districtList, benefeciaries } = this.props;
    console.log(benefeciaries)
    return (
      <DefaultLayout screenName="form">
        <form className={s.formWrapper}>
          <div>
            <label for="typeOfVaccine">Type of vaccine: </label>
            <input
              onChange={this.typeOfVaccineHandler}
              type="radio"
              id="Covaxin"
              name="vaccine"
              value={"Covaxin"}
            />
            <label for="Covaxin">Covaxin</label>
            <input
              onChange={this.typeOfVaccineHandler}
              type="radio"
              id="Covisheild"
              name="vaccine"
              value={"Covisheild"}
            />
            <label for="Covisheild">Covisheild</label>
            <input
              onChange={this.typeOfVaccineHandler}
              type="radio"
              id="Sputnik"
              name="vaccine"
              value={"Sputnik V"}
            />
            <label for="Sputnik">Sputnik</label>
            <input
              onChange={this.typeOfVaccineHandler}
              type="radio"
              id="Any"
              name="vaccine"
              value={"Any"}
            />
            <label for="Any">Any</label>
          </div>
          <div>
            <label for="searchBy">Search by: </label>
            <div>
              <input
                type="radio"
                onClick={this.onPincodeClicked}
                id="pincode"
                name="searchby"
                value="Pinocode"
              />
              <label for="Pincode">Pincode</label>
              <input
                onChange={this.pincodeHandler}
                disabled={!searchByPincode}
                name="pin"
                maxLength="6"
              ></input>
            </div>
            <div>
              <input
                type="radio"
                onClick={this.onStateClicked}
                id="state"
                name="searchby"
                value="state"
              />
              <label for="state">State</label>
              <select
                onChange={this.onStateOptionClick}
                disabled={!searchByState}
                name="state"
                id="states"
              >
                <option>select state</option>
                {stateList.map((e, i) => {
                  return (
                    <option key={e.state_id} value={e.state_id}>
                      {e.state_name}
                    </option>
                  );
                })}
              </select>
              <label for="district">District</label>
              <select
                onChange={this.onDistrictOptionClick}
                disabled={!searchByState}
                name="district"
                id="district"
              >
                <option>select disctrict</option>
                {districtList.map((e, i) => {
                  return (
                    <option key={e.district_id} value={e.district_id}>
                      {e.district_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <label>
              Filter out centers with availability less than (Minimum{" "}
              {benefeciaries.length})
            </label>
            <input
              type="text"
              pattern="[0-9]+"
              onChange={this.onCenterCountHandler}
              id="centerCount"
              name="centerCount"
              value={centerCount}
            />
            <br />
            <label>
              How often do you want to refresh the calendar (in seconds)?
              Default 15. Minimum 5
            </label>
            <input
              type="text"
              pattern="[0-9]+"
              onChange={this.calendarRefreshHandler}
              id="calendarRefreshTime"
              name="calendarRefreshTime"
              value={calendarRefreshTime}
            />
            <br />
            <label>
              Do you want to enable auto-booking?
            </label>
            <input
                type="radio"
                onClick={this.autoBookHandler}
                id="yes"
                name="autobook"
                value="y"
              />
              <label for="yes">Yes</label>
              <input
                type="radio"
                onClick={this.autoBookHandler}
                id="no"
                name="autobook"
                value="n"
              />
              <label for="yes">No</label>
            <div>
              <label for="searchStart">
                Search for next seven day starting from:{" "}
              </label>
              <input
                onChange={this.customStartDateHandler}
                type="radio"
                id="today"
                name="searchStart"
                value="today"
              />
              <label for="today">Today</label>
              <input
                onChange={this.customStartDateHandler}
                type="radio"
                id="tomorrow"
                name="searchStart"
                value="tomorrow"
              />
              <label for="tomorrow">Tomorrow</label>
              <input
                onChange={this.customStartDateHandler}
                type="radio"
                id="customDate"
                name="searchStart"
              />
              <div>
                <label for="startDate">Enter Date</label>
                <input
                  disabled={!iscustomDate}
                  onChange={this.setCustomDate}
                  type="date"
                  id="startDate"
                  name="searchStart"
                />
              </div>
            </div>
            <div>
              <label for="feeType">Do you have a fee type preference: </label>
              <input
                onChange={this.feeTypeHandler}
                type="radio"
                id="Paid"
                name="fee"
                value="Paid"
              />
              <label for="Paid">Paid</label>
              <input
                onChange={this.feeTypeHandler}
                type="radio"
                id="Free"
                name="fee"
                value="Free"
              />
              <label for="Free">Free</label>
              <input
                onChange={this.feeTypeHandler}
                type="radio"
                id="Any"
                name="fee"
                value="Any"
              />
              <label for="Any">Any</label>
            </div>
          </div>
          <button onClick={this.submitClicked}>Submit</button>
        </form>
      </DefaultLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetailsForm);
