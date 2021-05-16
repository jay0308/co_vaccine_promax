import React, { Component } from "react";
import s from "./style.module.scss";
import DefaultLayout from "../common/defaultLayout/DefaultLayout";
import global from "../../utils/common";
import {Link,withRouter} from "react-router-dom";

class PostPayment extends Component {
    componentDidMount() {
        // let {  bookingInstamojoAction } = this.props;
        // const { match: { params } } = this.props;
        // let qs = window.location.search;
        // let bookingId = params.bookingId
        // bookingInstamojoAction(bookingId, qs)
    }
    render() {
        return (
            <DefaultLayout screenName="postPayment">
                <div className={s.postPaymentContainer}>
                    {
                        global.getUrlParams().get("payment_status") && global.getUrlParams().get("payment_status") === "Credit" ?
                            <div className={s.success}>
                                <span>✔</span> Payment Success
                        </div>
                            :
                            <React.Fragment>
                                <div className={s.fail}>
                                    <span>!</span> Payment Failed
                                </div>

                            </React.Fragment>
                    }
                     <Link className={s.bookAgain} to="/">Book Again</Link>
                </div>
            </DefaultLayout>
        )
    }
}

export default withRouter(PostPayment);