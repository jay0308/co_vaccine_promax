import React from "react";
import s from "./genericPopup.module.scss";

const Loader = (props) => {
    if(props.genericPopupReducer)
        return(
            <div className={s.genericPopup}>
                <div className={s.blackLayer} onClick={()=>props.genericPopupAction(null)}></div>
                <div className={s.modalContenr}>
                    <div className={s.content}>
                        {props.genericPopupReducer}
                        <button className={s.btn} onClick={()=>props.genericPopupAction(null)}>Ok</button>
                    </div>
                </div>
            </div>
        )
    return ""
}

export default Loader;