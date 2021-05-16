import React from "react";
import global from "./utils/common";
import s from "./app.module.scss";

class DesktopRoutes extends React.Component {
    componentDidMount() {

    }
    render() {
        return (
            <React.Fragment>
                {
                    global.isMobile() ?
                        <div className={s.desktopRouteError}>
                            <span className={s.notFound}>404</span><br />
                            <span>Seems, you have open wrong url</span>
                        </div>
                        :
                        this.props.children
                }
            </React.Fragment>
        )
    }
}

export default DesktopRoutes;