import React, { Component } from "react";
import s from "./busDetails.module.scss";
import "./mui-override.css";
import { TextField } from '@material-ui/core';

class AddbusType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                {
                    busType: "",
                    description:""
                }
            ],
        }
    }
    addRoutes = () => {
        let routeUp = [...this.state.routes]
        routeUp.push({
            routeId: "",
            km: "",
            time: "",

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
    handleChangeListner = (e,index,type) => {
        let {routes} = this.state
        routes[index][type] = e.target.value
        this.setState({
            routes
        })
    }
    createBusType = () => {
        let {createBusTypeAction} = this.props;
        let {routes} = this.state;
        createBusTypeAction(routes);
        this.setState({
            routes:[
                {
                    busType: "",
                    description:""
                }
            ]
        })
    }
    deleteBusType = (id) => {
        let {deleteBusTypeAction} = this.props;
        deleteBusTypeAction(id)
    }
    renderRoutesForm = (index) => {
        let {routes} = this.state;
        return (
            <div className={s.routesForm}>
                <div className={s.routeCol} style={{width:"80%"}}>
                    <div style={{ marginBottom: "20px" }}>
                        <TextField type="text" placeholder="Bus Type" value={routes[index].busType} onChange = {(e) => {this.handleChangeListner(e,index,"busType")}}/>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <TextField type="text" placeholder="Description" value={routes[index].description} onChange = {(e) => {this.handleChangeListner(e,index,"description")}}/>
                    </div>

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
            <div className={`${s.addBusForm} ${s.addBusTypeForm}`}>
                <h2>Add Routes</h2>
                <div className={s.avalRoutes}>
                    {
                        successReducer && successReducer.getBusType &&
                        successReducer.getBusType.busTypeList.map((e, i) => {
                            return (
                                <div className={s.row} key={new Date().getMilliseconds() + i}>
                                    <div className={s.busTypeDesc}>
                                        <p><b>Bus Type: </b>{e.busType}</p>
                                        <p><b>Description:</b>{e.description}</p>
                                    </div>
                                    <button onClick={()=>{this.deleteBusType(e._id)}}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={s.formInner}>
                    <div>
                        <p className={s.hint}>Use Format:-  totalSeat:totalRow:Ac/Non Ac:3X2</p>
                        <p className={s.hint}>eg: 50:10:NAC-S:3X2</p>
                    </div>
                    <div className={`${s.formField} ${s.column}`}>
                        {
                            routes.map((e, i) => {
                                return this.renderRoutesForm(i)
                            })
                        }
                        <button className={s.addBtn} onClick={this.addRoutes}>Add</button>
                    </div>
                    <button className={s.submitBtn} onClick = {this.createBusType}>Submit</button>
                </div>
            </div>
        )
    }
}

export default AddbusType;