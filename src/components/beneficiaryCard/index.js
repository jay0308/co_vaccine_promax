import React from "react";
import s from "./style.module.scss";
import moment from "moment-timezone";

const BeneficiaryCard = props => {
    return (
        <div className={s.beneficiaryCont} onClick={props.onClickHandler}>
            <div className={s.inner}>
                <div className={s.row}>
                    <span className={s.name}>{props.name}</span>
                    <span className={s.status}>
                        <span className={s.label}>Vaccination Status : </span>
                        <span className={`${s.value} ${props.dose1_date && props.dose2_date ? (s.fully) : (props.dose1_date ? s.partially : s.none)}`}>{props.vaccination_status}</span>
                    </span>
                </div>
                <div className={s.row}>
                    <span className={s.dose1}>
                        <span className={`${s.label} ${props.dose1_date ? s.textGreen : ""}`}>Dose1 Status | {props.vaccine}</span>
                    </span>
                    <span>
                        <span className={`${s.value} ${props.dose1_date ? s.fully : ""}`}>{props.dose1_date}</span>
                    </span>
                </div>
                <div className={s.row}>
                    <span className={s.dose1}>
                        <span className={s.label}>Dose2 Status | {props.vaccine}</span>
                    </span>
                    <span>
                        <span className={`${s.value} ${props.dose2_date ? s.fully : ""}`}>{props.dose2_date || (props.dose1_date && `you can book after 84 days ${moment(props.dose1_date.split("-").reverse().join("/")).tz("Asia/Kolkata").add('days',84).format("DD-MM-YYYY")}`) }</span>

                    </span>

                </div>
            </div>
        </div>
    )
}

export default BeneficiaryCard;