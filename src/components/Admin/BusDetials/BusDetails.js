import React from 'react';
import DefaultLayoutContainer from '../../common/defaultLayout/DefaultLayoutContainer';
import BusDetailsComp from './BusDetailsComp';
import s from "./busDetails.module.scss";
import Modal from '../../common/modal';
import AddBusForm from './AddBusForm';
import AddRoutesForm from './AddRoutesForm';
import AddbusTypeForm from './AddBusType';

class BusDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentComp: "",
            isEditBus:false,
            busData:null
        }
    }
    componentDidMount(){
        const {getBusAction,getBusTypeAction,getRoutesAction} = this.props;
        setTimeout(()=>{
            getBusAction();
        },200)
        getBusTypeAction();
        getRoutesAction();
    }
    componentWillUnmount(){
        let sr = { ...this.props.successReducer }
        if (sr && sr.getBus) {
            sr.getBus = null;            
        }
        if (sr && sr.createBus) {
            sr.createBus = null;            
        }
        if (sr && sr.editBus) {
            sr.edit = null;            
        }
        if (sr && sr.deleteBus) {
            sr.deleteBus = null;            
        }
        if (sr && sr.getBusType) {
            sr.getBusType = null;            
        }
        if (sr && sr.createBusType) {
            sr.createBusType = null;            
        }
        if (sr && sr.deleteBusType) {
            sr.deleteBusType = null;            
        }
        if (sr && sr.createRoutes) {
            sr.createRoutes = null;            
        }
        if (sr && sr.getRoutes) {
            sr.getRoutes = null;            
        }
        if (sr && sr.deleteRoutes) {
            sr.deleteRoutes = null;            
        }
        
        this.props.successAction(sr)
        
    }
    closeModal = () => {
        this.setState({
            showModal: false
        })
    }
    openPopup = (compName) => {
        this.setState({
            showModal: true,
            currentComp: compName
        })
    }
    getCustomComp = () => {
        let { currentComp,isEditBus,busData } = this.state;
        switch (currentComp) {
            case "addBus":
                return <AddBusForm {...this.props} onCloseHandler={this.closeModal} isEditBus={isEditBus} busData={busData}/>
            case "addRoutes":
                return <AddRoutesForm {...this.props} />
            case "addBusType":
                return <AddbusTypeForm {...this.props} />
            default:
                return ""
        }
    }
    editHandler = (data) => {
        this.setState({
            isEditBus:true,
            busData:data
        })
        this.openPopup("addBus")
    }
    deleteBusHandler = (id) => {
        let {deleteBusAction} = this.props;
        deleteBusAction(id)
    }
    render() {
        return (
            <DefaultLayoutContainer
                screenName="admin"
            >
                <div className={s.busDetailsHeader}>
                    <h2>Bus Details</h2>
                    <div className={s.actionBtns}>
                        <button onClick={() => { this.openPopup("addRoutes") }}>Add Routes</button>
                        <button onClick={() => {this.setState({isEditBus:false,busData:null}); this.openPopup("addBus") }}>Add Bus</button>
                        {/* <button onClick={() => { this.openPopup("addBusType") }}>Add Bus Types</button> */}
                    </div>

                </div>
                <BusDetailsComp {...this.props} onEdit = {this.editHandler} onDelete = {this.deleteBusHandler}/>
                {
                    this.state.showModal &&
                    <Modal
                        isShowCross={true}
                        customComp={this.getCustomComp()}
                        onCloseHandler = {this.closeModal}
                    />
                }
            </DefaultLayoutContainer>
        )
    }
}

export default BusDetails;