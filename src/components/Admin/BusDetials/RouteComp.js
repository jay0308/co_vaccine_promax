import React, { Component } from "react";
import s from "./busDetails.module.scss";
import { TextField} from '@material-ui/core';

class RouteComp extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEdit:false,
            routeName:this.props.routeName
        }
    }
    handleChangeListner = (e) => {
        this.setState({
            routeName:e.target.value
        })
    }
    handleEditButton = () => {
        this.setState({
            isEdit:true
        })
    }
    handleCancelButton = () => {
        this.setState({
            isEdit:false,
            routeName:this.props.routeName
        })
    }
    render() {
        let { routeId, editBusRoute, deleteBusRoute } = this.props;
        let {isEdit,routeName} = this.state;
        return (
            <React.Fragment>
                {
                    isEdit ?
                    <div className={s.row}>
                        <TextField type="text" placeholder="Route Name" value={routeName} onChange = {(e) => {this.handleChangeListner(e)}} />
                        <button onClick={() => { editBusRoute(routeId,routeName) }}>Save</button>
                        <button onClick={this.handleCancelButton}>Cancel</button>
                    </div>
                    :
                    <div className={s.row}>
                        <span style={{ width: "50%" }}>{routeName}</span>
                        <button onClick={() => { this.handleEditButton(routeId) }}>Edit</button>
                        <button onClick={() => { deleteBusRoute(routeId) }}>Delete</button>
                    </div>

                }
            </React.Fragment>
        )
    }
}

export default RouteComp;