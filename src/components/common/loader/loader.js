import React from "react";
import s from "./loader.module.scss";
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = (props) => {
    if(props.loaderReducer)
        return(
            <div className={s.loaderWrapper}>
                <CircularProgress />
            </div>
        )
    return ""
}

export default Loader;