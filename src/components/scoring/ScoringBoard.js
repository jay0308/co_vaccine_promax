import React, { Component } from "react";
import s from "./scoring.module.scss";

class ScoringBoard extends Component{
    constructor(props){
        super(props);

        if(!this.props.scoringReducer.batsmen && !this.props.scoringReducer.baller)
            this.props.history.push("/scoring")
    }
    componentDidMount(){
        this.props.getPlayerStyles()
    }
    render(){
        return(
            <div className={s.scoringBoard}>
                <div className={s.scoringBoardInner}>
                    Scoring Board
                </div>
            </div>
        )
    }
}

export default ScoringBoard;