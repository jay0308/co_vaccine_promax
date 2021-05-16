import React, { Component } from "react";
import s from "./errorScreen.module.scss";
import {withRouter} from "react-router-dom";


class ErrorScreen extends Component {
    retryHandler = (props) => {
        let str = `${window.location.pathname}${window.location.search}`
        this.props.history.push(`/errorFallback?redirect=${str}`);
    }
    render(){
        const {errorMsg} = this.props;
        return (
            <div className={s.errorScreenContainer}>
                <div className={s.errorScreenInner}>
                    <div className={s.content}>
                        <div className={s.errorMsg}>{errorMsg}</div>
                        <button onClick={this.retryHandler}>Retry</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ErrorScreen);