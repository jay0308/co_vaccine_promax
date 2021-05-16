import React from "react";
import "./busSearch.scss";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import SearchIcon from "@material-ui/icons/Search";
import BusList from "./BusList";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import global from "../../utils/common";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [src, setSrc] = React.useState("");
  const [dest, setDest] = React.useState("");
  const [error, setError] = React.useState("");
  const [journeyDate, setJourneyDate] = React.useState(new Date());
  let { successReducer, busSearchAction, successAction } = props;

  const handleChange = (event, type,value) => {
    if (type === "src")
      value && setSrc(value.id);
    else
      value && setDest(value.id);
  };
  const handleJourneyDate = (date) => {
    setJourneyDate(date)
  }
  const onBusSearch = () => {
    setError("")
    let sr = { ...successReducer }
    if (sr && sr.searchBusResult) {
      sr.searchBusResult = null;
    }
    successAction(sr)
    if (src && dest && journeyDate && src !== dest) {
      let qs = `?sId=${src}&dId=${dest}&date=${journeyDate}`;
      busSearchAction(qs)
    } else {
      setError("Fields are either vacant or src and destination are same")
    }
  }
  return (
    <div className="busSearchContainer">
      <div className="searchWrapper">
        <span className="swapIcon">
          <SwapVerticalCircleIcon />
        </span>
        <div className="source">
          <img src={process.env.PUBLIC_URL + "/images/get-on-bus.png"} alt="src" />
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-label">Source</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={src}
              onChange={(e) => { handleChange(e, "src") }}
            >
              {
                successReducer && successReducer.getRoutes &&
                successReducer.getRoutes.routes.map((e, i) => {
                  return <MenuItem key={new Date().getMilliseconds() + i} value={e._id}>{e.routeName}</MenuItem>
                })
              }
            </Select> */}
            <Autocomplete
              id="combo-box-demo"
              options={successReducer && successReducer.getRoutes ? successReducer.getRoutes.routes.map((e)=>({title:e.routeName,id:e._id})) : []}
              getOptionLabel={(option) => option.title}
              // style={{ width: 300 }}
              onChange={(e,value) => { handleChange(e, "src",value) }}
              renderInput={(params) => <TextField {...params} label="Select Source" variant="outlined" />}
            />
          </FormControl>
        </div>
        <div className="destination">
          <img src={process.env.PUBLIC_URL + "/images/get-off-bus.png"} alt="dest" />
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-label">Destination</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dest}
              onChange={(e) => { handleChange(e, "dest") }}
            >
              {
                successReducer && successReducer.getRoutes &&
                successReducer.getRoutes.routes.map((e, i) => {
                  return <MenuItem key={new Date().getMilliseconds() + i} value={e._id}>{e.routeName}</MenuItem>
                })
              }
            </Select> */}
            <Autocomplete
              id="combo-box-demo"
              options={successReducer && successReducer.getRoutes ? successReducer.getRoutes.routes.map((e)=>({title:e.routeName,id:e._id})) : []}
              getOptionLabel={(option) => option.title}
              // style={{ width: 300 }}
              onChange={(e,value) => { handleChange(e, "dest",value) }}
              renderInput={(params) => <TextField {...params} label="Select Destination" variant="outlined" />}
            />
          </FormControl>
        </div>
      </div>
      <div className="selectDate">
        <div className="dateWrapper">
          <div className="wrapperLeft">
            <p>When you want to go</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                // label="Date picker dialog"
                minDate={new Date()}
                format="dd/MM/yyyy"
                value={journeyDate}
                onChange={handleJourneyDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </div>
      <div className="searchBtnWrapper">
        <span className="searchBtn" onClick={onBusSearch}>
          Search Buses <SearchIcon />
        </span>
      </div>
      {
        error &&
        <div className={"error"}>
          Error:  {error}
        </div>
      }
      <div className="">
        <BusList {...props} sourceId={src} destId={dest} journeyDate={journeyDate} />
      </div>
    </div>
  );
}
