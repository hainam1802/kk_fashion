import React, { useRef, useState, useEffect } from "react";
import "./Login.css";
import Input from "./../components/Input";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/auth";
import CustomButton from "../components/CustomButton";
import Header from "../containers/Header";
import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import {Navigate} from "react-router";


const Login = (props) => {
    const [message, setMessage] = useState(""); // state
    const [isWaiting, setIsWaiting] = useState(false); // state
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usernameRef = useRef(); //tạo ra Ref gán vào usernameref
    const passwordRef = useRef(); //tạo ra Ref gán vào passwordref
    const phoneRef = useRef();
    const emailRef = useRef();
    const passwordConfirmRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault(); // ngăn chặn refesh khi submit mặc định trên form, thẻ a > di chuyển trang;
        const username = usernameRef.current.value; //this.usernameRef.current tương đương vs document.getElementById(username)
        const password = passwordRef.current.value;
        const phone = phoneRef.current.value;
        const email = emailRef.current.value;
        const passwordconfirm = passwordConfirmRef.current.value;
        setIsWaiting(true)
        userService.register(username, password,phone,email,passwordconfirm).then((res) => {
            console.log(email)
            setIsWaiting(false);
            if (res.status === 1) {
                setMessage("");
                dispatch(login({
                    token: res.token,
                    userInfo: res.user
                }))
                navigate("/");
            } else {
                setMessage(res.message);
            }
        });
    };
    // // document.getElementById('txtUsername').focus();
    // useEffect(() => {
    //     usernameRef.current.focus();
    // }, []); //! focus là thẻ input username khi render lại hoặc lần đầu truy cập
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    return (
        <>
            {isLoggedIn ? (
                <Navigate to="/" />
            ):(
                <>
                    <Header />
                    <div className="content" style={{marginTop: "200px"}}>
                        <div className="container pb120">
                            <div className="login-container">
                                <section className="register-form">
                                    <div className="col-md-12">
                                        <form onSubmit={submitHandler}
                                              className=" user-form m-auto" style={{width: "50%"}} >
                                            <div className="form-title">
                                                <span>Tạo tài khoản mới</span>
                                                <div>
                                                    <Nav.Link as={NavLink} to="/login" >
                                                        Đã có một tài khoản?
                                                    </Nav.Link>
                                                </div>
                                            </div>
                                            <section>
                                                <div className="form-body">
                                                    <div className="row">
                                                        <p className="text-center text-danger">{message}</p>
                                                        <div className="form-group">
                                                            <label className="col-sm-4"><i className="fa fa-user"></i>Họ
                                                                tên<span className="text-danger">*</span></label>
                                                            <div className="col-sm-8">
                                                                <div className="form-wrapper">
                                                                    <input name="username"
                                                                           ref={usernameRef}
                                                                           className="form-control"
                                                                           type="text"
                                                                           maxLength="128" required=""/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group">
                                                            <label className="col-sm-4"><i className="fa fa-phone"></i>Số điện
                                                                thoại<span className="text-danger">*</span></label>
                                                            <div className="col-sm-8">
                                                                <div className="form-wrapper">
                                                                    <input name="phone"
                                                                           ref={phoneRef}
                                                                           className="form-control"
                                                                           type="number"
                                                                           minLength="10" maxLength="10"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group">
                                                            <label className="col-sm-4"><i className="fa fa-envelope-o"></i>Email<span
                                                                className="text-danger">*</span></label>
                                                            <div className="col-sm-8">
                                                                <div className="form-wrapper">
                                                                    <input className="form-control"
                                                                           ref={emailRef}
                                                                           name="email" type="email"
                                                                           maxLength="128" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group">
                                                            <label className="col-sm-4"><i className="fa fa-lock"></i>Mật
                                                                khẩu<span className="text-danger">*</span></label>
                                                            <div className="col-sm-8">
                                                                <div className="form-wrapper">
                                                                    <input className="form-control"
                                                                           ref={passwordRef}
                                                                           name="password"
                                                                           type="password"
                                                                           maxLength="128"
                                                                           minLength="6" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group">
                                                            <label className="col-sm-4"><i className="fa fa-lock"></i>Mật
                                                                khẩu xác nhận<span className="text-danger">*</span></label>
                                                            <div className="col-sm-8">
                                                                <div className="form-wrapper">
                                                                    <input className="form-control"
                                                                           ref={passwordConfirmRef}
                                                                           name="password_confirmation"
                                                                           type="password"
                                                                           maxLength="128"
                                                                           minLength="6" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="form-footer">
                                                    <div>
                                                        <button className="form-control-submit float-xs-right first-btn"
                                                                type="submit">
                                                            Đăng ký
                                                        </button>
                                                    </div>
                                                </div>
                                            </section>
                                        </form>
                                    </div>

                                </section>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
export default Login;
