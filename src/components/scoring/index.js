import React, { Component } from "react";
import s from "./scoring.module.scss";
import SearchComponent from "../common/searchComponent";
import {Link} from "react-router-dom";

class Scoring extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchPlayer: false,
            batsmen: null,
            baller: null,
            current: ""
        }
    }

    setCurrent = (type) => {
        this.setState({
            current: type,
            showSearchPlayer: true
        })

    }

    closeSearch = () => {
        this.setState({
            showSearchPlayer: false
        })
    }

    userClickHandler = (user) => {
        const { scoringReducer, scoringAction } = this.props;
        if (this.state.current === "batsmen") {
            if (scoringReducer.baller) {
                if (scoringReducer.baller._id !== user._id) {
                    let obj = { ...scoringReducer }
                    obj.batsmen = user;
                    scoringAction(obj);
                }
            } else {
                let obj = { ...scoringReducer }
                obj.batsmen = user;
                scoringAction(obj);
            }
        } else {
            if (scoringReducer.batsmen) {
                if (scoringReducer.batsmen._id !== user._id) {
                    let obj = { ...scoringReducer }
                    obj.baller = user;
                    scoringAction(obj);
                }
            } else {
                let obj = { ...scoringReducer }
                obj.baller = user;
                scoringAction(obj);
            }
        }
        this.setState({
            showSearchPlayer: false
        })
    }

    changeBtn = () => {
        const { scoringAction } = this.props;
        let obj = { }
        scoringAction(obj);
        this.setState({
            current: null
        })
    }

    render() {
        const { showSearchPlayer} = this.state;
        const { userList, getUser, scoringReducer } = this.props;
        return (
            <div className={s.scoringContainer}>
                <div className={s.scoringContainerInner}>
                    <div className={s.choosePlayer}>
                        <div onClick={() => { this.setCurrent("batsmen") }} className={`${s.selector} ${s.batsmen} ${scoringReducer.batsmen ? s.selected : ""}`}><span>{scoringReducer.batsmen ? "Batsmen: " + scoringReducer.batsmen.name : "Select Batsmen"}</span></div>
                        <div className={`${s.selector} ${s.vs}`}><span>VS</span></div>
                        <div onClick={() => { this.setCurrent("baller") }} className={`${s.selector} ${s.baller} ${scoringReducer.baller ? s.selected : ""}`}><span>{scoringReducer.baller ? "Baller: " + scoringReducer.baller.name : "Select Baller"}</span></div>
                        {
                            scoringReducer.batsmen && scoringReducer.baller &&
                            <div className={s.actionBtns}>
                                <button onClick={this.changeBtn}>Change</button>
                                <button><Link to="/scoring/board">Continue</Link></button>
                            </div>
                        }
                    </div>
                </div>
                {
                    showSearchPlayer &&
                    <SearchComponent
                        closeSearch={this.closeSearch}
                        userList={userList}
                        getUser={getUser}
                        userClickHandler={this.userClickHandler}
                    />
                }
            </div>
        )
    }
}

export default Scoring;