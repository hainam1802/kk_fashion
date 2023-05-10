import React, {useEffect, useState} from "react";
import SideBar from "../widget/SideBar";
import {Link} from "react-router-dom";
import productService from "../services/productService";
import userService from "../services/userService";
import {useSelector} from "react-redux";
const Profile = (props) => {
    const token = useSelector((state)=> state.auth.token)
    const [user,setUser] = useState([])
    useEffect(() => {
        userService.get(token).then((res) => {
            console.log(res)
             setUser(res.data)
            }
        );
    }, [token]);
    return (
        <>
            <div className="page-header single-breadcrums hidden-sm-down" style={{marginTop: "160px"}}>
                <div className="page-breadcrumbs">
                    <nav data-depth="3" className="breadcrumbs">
                        <ol itemScope="" itemType="http://schema.org/BreadcrumbList">
                            <li itemProp="itemListElement" itemScope=""
>
                                <Link itemProp="item" to="/">
                                    <span itemProp="name">Trang chủ</span>
                                </Link>
                                <meta itemProp="position" content="1"/>
                                <span className="sep">/</span>
                            </li>
                            <li itemProp="itemListElement" itemScope=""
>
                                <Link itemProp="item" to="#">
                                    <span itemProp="name">Tài khoản của bạn</span>
                                </Link>
                                <meta itemProp="position" content="2"/>
                                <span className="sep">/</span>
                            </li>
                            <li itemProp="itemListElement" itemScope=""
>
                                <span itemProp="name" className="last">Thông tin cá nhân của bạn</span>
                                <meta itemProp="position" content="3"/>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="content">
                <div className="container pb120">
                    <div className="row">
                        <SideBar/>

                        <div className="col-md-9">
                            <section id="content" className="page-content">
                                <aside id="notifications" className="container"></aside>
                                <form action="https://www.kkfashion.vn/thong-tin-tai-khoan" id="customer-form"
                                      className="js-customer-form user-form" method="post">
                                    <div className="form-title">
                                        <span>Thông tin</span>
                                    </div>
                                    <section>
                                        <div className="form-body">
                                            <input name="id_customer" type="hidden" value="138204"/>
                                            <div className="row">
                                                <div className="form-group">
                                                    <label className="col-sm-4"><i className="fa fa-user"></i>Họ
                                                        tên<span className="text-danger">*</span></label>
                                                    <div className="col-sm-8">
                                                        <div className="form-wrapper">
                                                            <input name="username" className="form-control" type="text"
                                                                   defaultValue={user.username} maxLength="128"
                                                                   required="" disabled/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="row">
                                                <div className="form-group">
                                                    <label className="col-sm-4"><i className="fa fa-envelope-o"></i>Email<span
                                                        className="text-danger">*</span></label>
                                                    <div className="col-sm-8">
                                                        <div className="form-wrapper">
                                                            <input className="form-control"
                                                                   name="email" type="email"
                                                                   value={user.email}
                                                                   maxLength="128"
                                                                   required="" disabled/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="row">
                                                <div className="form-group">
                                                    <label className="col-sm-4"><i className="fa fa-birthday-cake"></i>
                                                        Số điện thoại<span className="text-danger">*</span></label>
                                                    <div className="col-sm-8">
                                                        <div className="form-wrapper">
                                                            <input
                                                                className="form-control"
                                                                   name="birthday" type="text"
                                                                defaultValue={user.phone}
                                                                 maxLength="128" required=""disabled />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="row">
                                                <div className="form-group">
                                                    <label className="col-sm-4"><i className="fa fa-lock"></i>Mật khẩu
                                                        hiện tại<span className="text-danger">*</span></label>
                                                    <div className="col-sm-8">
                                                        <div className="form-wrapper">
                                                            <input className="form-control" name="password"
                                                                   type="password" value="******" maxLength="128"
                                                                   minLength="6" required="" disabled/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            {/*<div className="row">*/}
                                            {/*    <div className="form-group">*/}
                                            {/*        <label className="col-sm-4"><i className="fa fa-lock"></i>Đổi Mật*/}
                                            {/*            khẩu mới<span className="text-danger">*</span></label>*/}
                                            {/*        <div className="col-sm-8">*/}
                                            {/*            <div className="form-wrapper">*/}
                                            {/*                <input className="form-control" name="new_password"*/}
                                            {/*                       type="password" value="" maxLength="128"*/}
                                            {/*                       minLength="6"/>*/}
                                            {/*            </div>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>

                                        {/*<footer className="form-footer clearfix">*/}
                                        {/*    <input type="hidden" name="submitCreate" value="1"/>*/}

                                        {/*    <button className="btn btn-dark form-control-submit float-xs-right"*/}
                                        {/*            data-link-action="save-customer" type="submit">*/}
                                        {/*        Lưu*/}
                                        {/*    </button>*/}
                                        {/*</footer>*/}
                                    </section>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Profile;
