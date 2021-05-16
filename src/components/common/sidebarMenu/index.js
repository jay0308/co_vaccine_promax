import React, { Component } from "react";
import s from "./sidebarMenu.module.scss";
import {Link} from "react-router-dom";

class SidebarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenuCont: "",
            menuList: [
                {
                    "menuName": "Home",
                    "icon": "",
                    "link": "/"
                },
                {
                    "menuName": "My Bookings",
                    "icon": "",
                    "link": "/myBookings"
                },
                // {
                //     "menuName": "My Account",
                //     "icon": "",
                //     "link": "/myAccount"
                // },
                {
                    "menuName": "Help",
                    "icon": "",
                    "link": "/help"
                }
                
            ]
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ showMenuCont: s["open"] })
        }, 150)
    }
    closeMenu = () => {
        this.setState({
            showMenuCont: ""
        })
        const { closeSidebarMenu } = this.props;
        setTimeout(() => {
            closeSidebarMenu()
        }, 150)
    }
    logout = () => {
        localStorage.removeItem("userInfo");
    }
    render() {
        const { showMenuCont, menuList } = this.state;
        const { userDataReducer } = this.props;
        return (
            <div className={s.sidebarMenuCont}>
                <div className={s.blackLayer} onClick={this.closeMenu}></div>
                {
                    <div className={`${s.menuCont} ${showMenuCont}`}>
                        <div className={s.menuContInner}>
                            <div className={s.menuProfile}>
                                <div className={s.profileBox}>
                                    <div className={s.profileImg}>

                                    </div>
                                    <div className={s.profileDetails}>
                                        <span className={s.userName}>{userDataReducer.name}</span>
                                        <span className={s.userCont}>{userDataReducer.contactNo}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={s.menuOptions}>
                                {
                                    menuList && menuList.map((e, i) => {
                                        return (
                                            <div key={new Date().getMilliseconds() + i} className={s.menuList}><Link onClick={this.closeMenu} to={e.link}>{e.menuName}</Link></div>
                                        )
                                    })
                                }
                                <div className={s.menuList}><Link onClick={this.logout} to={"/login"}>Logout</Link></div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default SidebarMenu