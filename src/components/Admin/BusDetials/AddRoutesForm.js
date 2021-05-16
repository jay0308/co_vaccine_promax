import React, { Component } from "react";
import s from "./busDetails.module.scss";
import "./mui-override.css";
import { TextField} from '@material-ui/core';
import RouteComp from "./RouteComp";

class AddRoutesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                {
                    routeName: ""

                }
            ],
        }
    }
    addRoutes = () => {
        let routeUp = [...this.state.routes]
        routeUp.push({
            routeName: "",

        })
        this.setState({
            routes: routeUp
        })
    }
    deleteRoutes = (index) => {
        let routesDown = [...this.state.routes]
        routesDown = routesDown.filter((e, i) => {
            if (i !== index) {
                return e
            }
        })
        this.setState({
            routes: routesDown
        })
    }
    handleChangeListner = (e,index) => {
        let {routes} = this.state
        routes[index]["routeName"] = e.target.value
        this.setState({
            routes
        })
    }
    createBusRoute = () => {
        let {createRoutesAction} = this.props;
        let {routes} = this.state;
        createRoutesAction(routes);
        this.setState({
            routes:[
                {
                    routeName:""
                }
            ]
        })
    }
    deleteBusRoute = (id) => {
        let {deleteRoutesAction} = this.props;
        deleteRoutesAction(id)
    }
    editBusRoute = (id,routeName) => {
        let {editRoutesAction} = this.props;
        let obj = {
            _id:id,
            routeName:routeName
        }
        editRoutesAction(obj)
    }
    renderRoutesForm = (index) => {
        let {routes} = this.state
        return (
            <div className={s.routesForm} style={{width:"100%"}}>
                <div className={s.routeCol} style={{width:"55.5%"}}>
                    <TextField type="text" placeholder="Route Name" value={routes[index].routeName} onChange = {(e) => {this.handleChangeListner(e,index)}} />
                </div>
                <div className={s.routeCol}>
                    <button onClick={() => { this.deleteRoutes(index) }}>Delete</button>
                </div>
            </div>
        )
    }
    render() {
        const { routes } = this.state;
        const { successReducer } = this.props;
        return (
            <div className={s.addBusForm}>
                <h2>Add Routes</h2>
                <div className={s.avalRoutes}>
                    {
                        successReducer && successReducer.getRoutes &&
                        successReducer.getRoutes.routes.map((e, i) => {
                            return (
                                <RouteComp
                                    key={new Date().getMilliseconds() + i}
                                    routeName = {e.routeName}
                                    routeId = {e._id}
                                    deleteBusRoute = {this.deleteBusRoute}
                                    editBusRoute = {this.editBusRoute}
                                />
                                // <div className={s.row} key={new Date().getMilliseconds() + i}>
                                //     <span style={{width:"50%"}}>{e.routeName}</span>
                                //     <button onClick={()=>{this.deleteBusRoute(e._id)}}>Delete</button>
                                // </div>
                            )
                        })
                    }
                </div>
                <div className={s.formInner}>
                    <div className={`${s.formField} ${s.column}`}>
                        {
                            routes.map((e, i) => {
                                return this.renderRoutesForm(i)
                            })
                        }
                        <button className={s.addBtn} onClick={this.addRoutes}>Add</button>
                    </div>
                    <button onClick={this.createBusRoute} className={s.submitBtn}>Submit</button>
                </div>
            </div>
        )
    }
}

export default AddRoutesForm;