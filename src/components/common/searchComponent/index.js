import React, { Component } from "react";
import s from "./search.module.scss";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: "",
            searchResult: [],
            searchInput: ""
        }
    }
    componentDidMount() {
        this.refs.searchInp.focus();
        setTimeout(() => {
            this.setState({ showSearch: s["open"] })
        }, 150)
    }
    closeMenu = () => {
        this.setState({
            showSearch: ""
        })
        const { closeSearch } = this.props;
        setTimeout(() => {
            closeSearch()
        }, 150)
    }
    onInputChange = (e) => {
        this.setState({
            searchInput: e.target.value
        })
        this.props.getUser(e.target.value)
    }
    render() {
        const { showSearch, searchResult, searchInput } = this.state;
        const { userList, userClickHandler } = this.props;
        return (
            <div className={s.searchCont}>
                {
                    <div className={`${s.searchLayer} ${showSearch}`}>
                        <div className={s.backBtn} onClick={this.closeMenu}><KeyboardBackspaceIcon /></div>
                        <input ref="searchInp" type="text" placeholder="Search player" value={searchInput} onChange={this.onInputChange} />

                        <div className={s.searchResult}>
                            {
                                userList &&
                                userList.map((e, i) => {
                                    return (
                                        <div className={s.listRow} onClick={userClickHandler ? ()=>{userClickHandler(e)} : ()=>{}} key={new Date().getMilliseconds() + i}>
                                            {e.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default SearchComponent;