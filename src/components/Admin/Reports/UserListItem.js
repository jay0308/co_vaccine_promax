import React, { Component } from "react";
import s from "./style.module.scss";

class UserListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            balance: this.props.data.paymentBalance
        }
    }
    inputChange = (e) => {
        this.setState({
            balance: e.target.value
        })
    }
    handleEdit = () => {
        this.setState({
            isEdit:!this.state.isEdit
        })
    }
    handleSaveBtn = () => {
        let {data,updateUserBalanceAction} = this.props;
        let {balance} = this.state;
        let reqObj = {
            id:data._id,
            paymentBalance: parseFloat(balance)
        }
        updateUserBalanceAction(reqObj)
    }
    render() {
        let { data, index } = this.props;
        let { isEdit, balance } = this.state
        return (
            <div className={s.userListItem}>
                {
                    index === 0 &&
                    <div className={`${s.row} ${s.heading}`}>
                        <div className={s.block}>
                            User Id
                        </div>
                        <div className={s.block}>
                            User Name
                        </div>
                        <div className={s.block}>
                            User Contact Number
                        </div>
                        <div className={s.block}>
                            User Payment Balance
                        </div>
                        <div className={s.block}>
                            Action
                        </div>
                    </div>
                }
                <div className={s.row}>
                    <div className={s.block}>
                        {data._id}
                    </div>
                    <div className={s.block}>
                        {data.name}
                    </div>
                    <div className={s.block}>
                        {data.contactNo}
                    </div>
                    <div className={s.block}>
                        {
                            isEdit ?
                                <input type="number" value={balance} onChange={this.inputChange} />
                                :
                                data.paymentBalance

                        }
                    </div>
                    <div className={s.block}>
                        {
                            isEdit ?
                                <React.Fragment>
                                    <button onClick={this.handleSaveBtn}>Save</button>
                                    <button onClick={this.handleEdit}>Cancel</button>
                                </React.Fragment>
                                :
                                <button onClick={this.handleEdit}>Update Amount</button>

                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default UserListItem;