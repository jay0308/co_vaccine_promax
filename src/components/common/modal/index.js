import React, { Component } from "react";
import s from "./modal.module.scss";

class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            isShowModal:false
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({isShowModal:true})
        },500)
    }
    handleCloseModal = () => {
        this.setState({isShowModal:false})
        setTimeout(()=>{
            this.props.onCloseHandler && this.props.onCloseHandler()
        },500)
    }
    render() {
        const { modalHeader, isShowCross, content, customComp, disableOverlayClick } = this.props;
        return (
            <div className={`${s.modalWrapper} ${this.state.isShowModal ? s.open : ""}`}>
                <div className={s.modalOverlay} onClick={disableOverlayClick  ? () => {} : this.handleCloseModal}></div>
                <div className={s.modalInner}>
                    {modalHeader && <h2 className={s.header}>{modalHeader}</h2>}
                    {
                        isShowCross &&
                        <span className={s.close} onClick={this.handleCloseModal}></span>
                    }
                    <div className={s.content}>
                        {content}
                        {customComp}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;