import React, { Component } from "react";
import DefaultLayoutContainer from '../../common/defaultLayout/DefaultLayoutContainer';
import s from "./style.module.scss";
import Modal from '../../common/modal';
import AddbusType from "../BusDetials/AddBusType";

class BusTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            isEdit:false,
            busTypeData:null
        }
    }
    componentDidMount(){
        let {getBusTypeAction} = this.props;
        getBusTypeAction()
    }
    closeModal = () => {
        this.setState({
            showModal: false,
            isEdit:false,
            busTypeData:null
        })
    }
    openPopup = () => {
        this.setState({
            showModal: true
        })
    }
    handlEdit = (data) => {
        this.setState({
            isEdit:true,
            busTypeData:data
        })
        this.openPopup()
    }
    handleDelete = (data) => {
        let {deleteBusTypeAction} = this.props;
        deleteBusTypeAction(data._id)
    }
    getCustomComp = () => {
        return (
            <AddbusType closePopup={this.closeModal} {...this.props} busTypeData={this.state.busTypeData} isEdit={this.state.isEdit} />
        )
    }
    renderBusTypeList = (data, i) => {
        return (
            <div className={s.busTypeItem} key={new Date().getTime() + i}>
                <div className={s.inner}>
                    <div className={s.left}>
                        <div className={s.row}>
                            <span className={s.label}>Description</span>
                            <span className={s.value}>{data.desc}</span>
                        </div>
                        <div className={s.row}>
                            <span className={s.label}>Max Seats in Row</span>
                            <span className={s.value}>{data.maxSeat}</span>
                        </div>
                        <div className={s.row}>
                            <span className={s.label}>Max Rows</span>
                            <span className={s.value}>{data.maxRows}</span>
                        </div>
                        <div className={s.row}>
                            <button onClick={()=>{this.handlEdit(data)}}>Edit</button>
                            <button onClick={()=>{this.handleDelete(data)}}>Delete</button>
                        </div>
                    </div>
                    <div className={s.right}>
                        <div className={s.seats}>
                            {
                                data.seatMatrix.map((ele, i) => {
                                    return (
                                        <div className={s.seatRow} key={new Date().getTime() + i}>
                                            {
                                                ele.map((em, j) => {
                                                    return (
                                                        <div className={`${s.seatBox} ${data.seatMatrix[i][j] ? s.filled : ""}`} key={new Date().getTime() + j}>
                                                            {data.seatMatrix[i][j]}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        const { successReducer } = this.props;
        return (
            <DefaultLayoutContainer
                screenName="admin"
            >
                <div className={s.busTypeContainer}>
                    <div className={s.busTypesHeader}>
                        <h2>Bus Types</h2>
                        <div className={s.actionBtns}>
                            <button onClick={() => { this.openPopup("addBusType") }}>Add Bus Types</button>
                        </div>

                    </div>
                    <div className={s.busTypesListCont}>
                        {
                            successReducer && successReducer.getBusType &&
                            successReducer.getBusType.busTypeList.map((e, i) => {
                                return this.renderBusTypeList(e,i)
                            })
                        }
                    </div>
                    {
                        this.state.showModal &&
                        <Modal
                            isShowCross={true}
                            customComp={this.getCustomComp()}
                            onCloseHandler={this.closeModal}
                        />
                    }
                </div>
            </DefaultLayoutContainer>
        )
    }
}

export default BusTypes;