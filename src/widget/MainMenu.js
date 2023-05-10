import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../store/auth";
import {Nav} from "react-bootstrap";
import settingService from "../services/settingService";
const MainMenu = (props) => {
    const id = "BANNER_SALES";
    const [mainMenu,setMainMenu] = useState([])

    useEffect(() => {
        settingService.getMenu().then((res) => {
            console.log(res.data)
            setMainMenu(res.data)
            }
        );
    }, []);


    return (
        <>
            <ul className="nav navbar-nav hidden-xs hidden-sm" id="nav">
                {mainMenu
                    .filter((item) => item.parent_id === 0)
                    .map((parent) => (
                        <li className="menu-item" key={parent.id}>
                            <Link data-list-type="Header" data-content-type="Navigation"
                               data-content-title={parent.title} data-content-id="4"
                               to={parent.url}>{parent.title}</Link>
                            <div className="sub-menu-dropdown">
                                <ul className="sub-menu">
                                    {mainMenu
                                        .filter((item) => item.parent_id === parent.id)
                                        .map((child) => (
                                            <li key={child.id}>
                                                <Link data-list-type="Header" data-content-type="Navigation"
                                                   data-content-title="Về chúng tôi" data-content-id="4"
                                                   to={`${child.slug}`}>{child.title}</Link>
                                            </li>

                                    ))}

                                </ul>
                            </div>
                        </li>

                    ))}












            </ul>

        </>
    );
};

export default MainMenu;
