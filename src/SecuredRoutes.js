import React from "react";
import { withRouter } from "react-router-dom";
import s from "./app.module.scss";
class SecuredRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false
        }

        if (!localStorage.getItem("userInfo"))
            this.props.history.push("/login")



    }
    componentDidMount() {
        if (this.props.isAdmin) {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"))
            if (userInfo.isAdmin === 1) {
                this.setState({
                    isAdmin: true
                })
            }
        }else{
            this.setState({
                isAdmin: true
            })
        }
    }
    render() {
        return (
            this.state.isAdmin ?
                this.props.children
                :
                <div className={s.desktopRouteError}>
                    <span className={s.notFound}>Sorry</span><br />
                    <span>Seems, you don't have admin rights</span>
                </div>

        )
    }
}

export default withRouter(SecuredRoutes);