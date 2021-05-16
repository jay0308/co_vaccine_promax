import React, { Component } from "react";
import s from "./header.module.scss";
import MenuIcon from '@material-ui/icons/Menu';
import SidebarMenu from "../sidebarMenu";
import SearchIcon from '@material-ui/icons/Search';
import SearchComponent from "../searchComponent";
import { Link } from "react-router-dom";
import global from "../../../utils/common";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidebarMenu: false,
            showSearch: false
        }
    }
    openSidebarMenu = () => {
        this.setState({
            showSidebarMenu: true
        })
    }
    closeSidebarMenu = () => {
        this.setState({
            showSidebarMenu: false
        })
    }
    openSearch = () => {
        this.setState({
            showSearch: true
        })
    }
    closeSearch = () => {
        this.setState({
            showSearch: false
        })
        let sr = { ...this.props.successReducer }
        if (sr && sr.getUserList) {
            sr.getUserList = null;
            this.props.successAction(sr)
        }
    }

    userClickHandler = (userId) => {
        console.log(userId)
    }

    renderErrorScreenHeader = () => {
        return (
            <div className={s.errorScreenHeader}>
                Error
            </div>
        )
    }

    logout = () => {
        localStorage.removeItem("userInfo");
    }
    renderAdminHeader = () => {
        return (
            <React.Fragment>
                <div className={s.adminHeader}>
                    <span>Admin</span>
                    {
                        <span onClick={this.logout}><Link to="/login">Logout</Link></span>
                    }
                </div>
                <div className={s.sideMenu}>
                    <div className={s.menuOptions}>
                        <div className={s.menuItem}>
                            <Link to="/admin">Home</Link>
                        </div>
                        <div className={s.menuItem}>
                            <Link to="/admin/busDetails">Bus Details</Link>
                        </div>
                        <div className={s.menuItem}>
                            <Link to="/admin/busTypes">Bus Types</Link>
                        </div>
                        <div className={s.menuItem}>
                            <Link to="/admin/bookings">Bookings</Link>
                        </div>
                        <div className={s.menuItem}>
                            <Link to="/admin/reports">Reports</Link>
                        </div>
                        {/* <div className={s.menuItem} onClick={this.logout}>
                            <Link to="/login">logout</Link>
                        </div> */}
                    </div>
                </div>
            </React.Fragment >
        )
    }

    renderDefaultHeader = () => {
        const { userDataReducer, getUser, userList, headerHeight, screenName } = this.props;
        return (
            <div className={s.defaultHeader}>
                {userDataReducer && <span className={s.hamburger} onClick={this.openSidebarMenu}><MenuIcon /></span>}<Link to="/"><span>Guide Bus</span></Link>
                {/* {userDataReducer && <span className={s.SearchIcon} onClick={this.openSearch}><SearchIcon /></span>} */}
                
            </div>
        )
    }

    renderScreenNameBasedHeader = (screenName) => {
        switch (screenName) {
            case "errorScreen":
                return this.renderErrorScreenHeader();
            case "admin":
                return this.renderAdminHeader();
            default:
                return this.renderDefaultHeader()

        }
    }

    render() {
        const { userDataReducer, getUser, userList, headerHeight, screenName } = this.props;
        return (
            <React.Fragment>
                <div className={s.headerWrapper} style={{ height: headerHeight || "68px" }}>
                    <header className={s.headerSec}>
                        {this.renderScreenNameBasedHeader(screenName)}
                    </header>
                </div>
                {
                    this.state.showSidebarMenu &&
                    <SidebarMenu
                        closeSidebarMenu={this.closeSidebarMenu}
                        userDataReducer={userDataReducer}
                    />
                }
                {
                    this.state.showSearch &&
                    <SearchComponent
                        closeSearch={this.closeSearch}
                        userList={userList}
                        getUser={getUser}
                        userClickHandler={this.userClickHandler}
                    />
                }
            </React.Fragment>
        )
    }
}

export default Header;