import React, { Component } from "react";
import s from "./busDetails.module.scss";
import Modal from "../../common/modal";
import global from "../../../utils/common";

class BusDetailsComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRouteModal: false,
            active: 0,
            currentBsData: null
        }
    }
    setActiveTab = (tab) => {
        this.setState({
            active: tab
        })
    }
    openRouteModal = () => {
        this.setState({
            showRouteModal: true,
            active: 0
        })
    }
    closeRouteModal = () => {
        this.setState({
            showRouteModal: false
        })
    }
    renderRouteModalContent = (ele) => {
        const { active } = this.state;
        return (
            <div className={s.routeModalCont}>
                <div className={s.tabsBox}>
                    <span onClick={() => { this.setActiveTab(0) }} className={`${s.tabs} ${active === 0 ? s.active : ""}`}>Up</span>
                    <span onClick={() => { this.setActiveTab(1) }} className={`${s.tabs} ${active === 1 ? s.active : ""}`}>Down</span>
                </div>
                <div className={s.tabContent}>
                    {
                        active === 0 ?
                            ele.routes && ele.routes.up &&
                            ele.routes.up.map((e, i) => {
                                return (
                                    <React.Fragment key={new Date().getMilliseconds() + i}>
                                        <span className={s.location}>
                                            <span>{this.getRoutesName(e.routeId)}</span><span>{`${new Date(e.time).getHours()}:${new Date(e.time).getMinutes()}`}</span>
                                        </span>
                                    </React.Fragment>
                                )
                            })
                            :
                            ele.routes && ele.routes.down &&
                            ele.routes.down.map((e, i) => {
                                return (
                                    <React.Fragment key={new Date().getMilliseconds() + i}>
                                        <span className={s.location}>
                                            <span>{this.getRoutesName(e.routeId)}</span><span>{`${new Date(e.time).getHours()}:${new Date(e.time).getMinutes()}`}</span>
                                        </span>
                                    </React.Fragment>
                                )
                            })
                    }
                </div>
            </div>
        )
    }
    renderBusCard = (ele, i) => {
        return (
            <div className={s.busDetailsCard} key={new Date().getTime() + i}>
                <div className={s.topBar}>
                    {ele.busNo}
                </div>
                <div className={s.busDetailsCardInner}>
                    <div className={s.row}><span className={s.label}>Bus Id</span><span className={s.value}>{ele._id}</span></div>
                    <div className={s.row}><span className={s.label}>Bus Name</span><span className={s.value}>{ele.busName}</span></div>
                    <div className={s.row}><span className={s.label}>Bus Number</span><span className={s.value}>{ele.busNo}</span></div>
                    <div className={s.row}><span className={s.label}>Bus Type</span><span className={s.value}>{this.getBusTypeName(ele.busType)}</span></div>
                    <div className={s.row}><span className={s.label}>Journey Date</span><span className={s.value}>{ele.runningDays === "onDate" ? ele.journeyDates ? ele.journeyDates.map((e) => {
                        return global.getDateInFormat(e, "dd/mm/yyyy")
                    }).join(",") : "" : ele.runningDays + " days"}</span></div>
                    <div className={s.row}><span className={s.label}>Fair Price</span><span className={s.value}>{ele.fairPrice}</span></div>
                    <div className={s.row}><span className={s.label}>Routes</span><span onClick={() => { this.setState({ currentBsData: ele }); this.openRouteModal() }} className={`${s.value} ${s.themeFont}`} >Check Full Routes</span></div>
                    <div className={s.routes}>
                        {
                            <div className={s.router}>
                                <span><b>Up:</b></span>
                                {
                                    ele.routes && ele.routes.up &&
                                    ele.routes.up.map((e, i) => {
                                        if (i > 0 && i < ele.routes.up.length - 1)
                                            return null
                                        return (
                                            <React.Fragment key={new Date().getMilliseconds() + i}>
                                                <span className={s.location}>
                                                    <span className={s.stop}></span><span>{this.getRoutesName(e.routeId)}</span><span>{`${new Date(e.time).getHours()}:${new Date(e.time).getMinutes()}`}</span>
                                                </span>
                                                {
                                                    i < ele.routes.up.length - 1 &&
                                                    <span className={s.arrow}> {">>"} </span>
                                                }
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        }

                    </div>
                    <div className={s.routes}>
                        <div className={s.router}>
                            <span><b>Down:</b></span>
                            {
                                ele.routes && ele.routes.down &&
                                ele.routes.down.map((e, i) => {
                                    if (i > 0 && i < ele.routes.down.length - 1)
                                        return null
                                    return (
                                        <React.Fragment key={new Date().getMilliseconds() + i}>
                                            <span className={s.location}>
                                                <span className={s.stop}></span><span>{this.getRoutesName(e.routeId)}</span><span>{`${new Date(e.time).getHours()}:${new Date(e.time).getMinutes()}`}</span>
                                            </span>
                                            {
                                                i < ele.routes.down.length - 1 &&
                                                <span className={s.arrow}> {"<<"} </span>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={s.bottomBar}>
                    <button onClick={() => { this.props.onDelete(ele._id) }}>Delete</button>
                    <button onClick={() => { this.props.onEdit(ele) }}>Edit</button>
                </div>
            </div>
        )
    }
    getBusTypeName = (id) => {
        const { successReducer } = this.props;
        let busType = successReducer && successReducer.getBusType && successReducer.getBusType.busTypeList || [];
        let filtered = busType.filter((e) => {
            if (e._id === id)
                return e
        })
        console.log("Filtered", filtered, busType, id)
        if (filtered.length > 0)
            return `${filtered[0].maxSeat}X${filtered[0].maxRows}:${filtered[0].desc}`

        return ""
    }
    getRoutesName = (id) => {
        const { successReducer } = this.props;
        let busType = successReducer && successReducer.getRoutes && successReducer.getRoutes.routes || [];
        // console.log("Routes",busType)
        let filtered = busType.filter((e) => {
            if (e._id === id)
                return e
        })
        if (filtered.length > 0)
            return filtered[0].routeName

        return ""
    }
    render() {
        const { successReducer } = this.props;
        return (
            <div className={s.busDetailsWrapper}>
                {
                    successReducer && successReducer.getBusType && successReducer.getRoutes && successReducer.getBus && successReducer.getBus.busList &&
                        successReducer.getBus.busList.length > 0 ?
                        successReducer.getBus.busList.map((e, i) => {
                            return this.renderBusCard(e, i)
                        })
                        :
                        <div className={s.noData}>
                            No Buses are added.
                    </div>

                }
                {
                    this.state.showRouteModal &&
                    this.state.currentBsData &&
                    <Modal
                        isShowCross={true}
                        customComp={this.renderRouteModalContent(this.state.currentBsData)}
                        onCloseHandler={this.closeRouteModal}
                    />
                }
            </div>
        )
    }
}

export default BusDetailsComp;