import React, { Component } from "react";
import s from "./errorScreen.module.scss";
import CircularProgress from '@material-ui/core/CircularProgress';
import {withRouter} from "react-router-dom";

const getRedirectUrl = () => {
    let url = window.location.href;
    let urlSPlit = url.split("redirect=");
    if(urlSPlit && urlSPlit.length > 1){
        return urlSPlit[1];
    }
    return "";
}
class ErrorFallback extends Component{
    componentDidMount(){
        setTimeout(()=>{
            if(getRedirectUrl())
                this.props.history.push(getRedirectUrl())
                console.log(this.props.history)
        },500)
    }
    render(){
        return(
            <div className={s.errorFallback}>
                <CircularProgress />
            </div>
        )
    }
}

export default withRouter(ErrorFallback);