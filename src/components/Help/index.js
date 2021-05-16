import React, { Component } from "react";
import DefaultLayout from "../common/defaultLayout/DefaultLayout";
import s from "./style.module.scss";

class Help extends Component {
    render() {
        return (
            <DefaultLayout screenName="help">
                <div className={s.helpSec}>
                    <div className={s.helpSecInner}>
                        <div className={s.helpRow}>
                            <span className={s.label}>Contact No:</span>
                            <a href="tel:9876543210"><span className={s.value}>9876543210</span></a>
                        </div>
                        <div className={s.helpRow}>
                            <span className={s.label}>Email:</span>
                            <a href="mailto:guidebus6@gmail.com"><span className={s.value}>guidebus6@gmail.com</span></a>
                        </div>
                    </div>
                </div>

            </DefaultLayout>
        )
    }
}

export default Help;