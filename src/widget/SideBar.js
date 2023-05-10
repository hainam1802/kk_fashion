import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../store/auth";
import {Nav} from "react-bootstrap";
const SideBar = (props) => {
    const dispatch = useDispatch()
    return (
        <>
            <div className="col-md-3">
                <div className="left-menu">
                    <h3>My account</h3>
                    <ul>
                        <li>
                            <Link id="identity-link" to="/profile">
                                <span className="link-item">
                                    Thông tin
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link id="history-link" to="/order-history">
                                <span className="link-item">
                                    Lịch sử và chi tiết đơn hàng
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link >
                                <span className="link-item">
                                    Địa chỉ
                                </span>
                            </Link>
                        </li>


                        <li><Link  onClick={() => dispatch(logout())}>Đăng xuất</Link></li>
                    </ul>
                </div>
            </div>

        </>
    );
};

export default SideBar;
