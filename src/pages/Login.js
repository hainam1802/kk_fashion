import React, { useRef, useState, useEffect } from "react";
import "./Login.css";
import Input from "./../components/Input";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import {useDispatch} from "react-redux";
import {login} from "../store/auth";
import CustomButton from "../components/CustomButton";
import Header from "../containers/Header";
import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import {Navigate} from "react-router";
import {useSelector} from "react-redux";

const Login = (props) => {
  const [message, setMessage] = useState(""); // state
  const [isWaiting, setIsWaiting] = useState(false); // state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef(); //tạo ra Ref gán vào usernameref
  const passwordRef = useRef(); //tạo ra Ref gán vào passwordref

  const submitHandler = (e) => {
    e.preventDefault(); // ngăn chặn refesh khi submit mặc định trên form, thẻ a > di chuyển trang;
    const username = usernameRef.current.value; //this.usernameRef.current tương đương vs document.getElementById(username)
    const password = passwordRef.current.value;
    console.log(username, password);
    setIsWaiting(true)
    userService.login(username, password).then((res) => {
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
    // if (username === "admin" && password === "123456") {
    //   setMessage('Ok');
    // } else {
    //   setMessage('Bad');
    // }
  };

  // document.getElementById('txtUsername').focus();
  // useEffect(() => {
  //   usernameRef.current.focus();
  // }, []); //! focus là thẻ input username khi render lại hoặc lần đầu truy cập
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  return (
    <>
    {isLoggedIn ? (
        <Navigate to="/" />
    ):(
      <>
        <Header />
        <div className="content">
          <div className="container pb120">
            <div className="login-container">
              <section className="login-form">
                <div className="col-md-12 ">
                  <form id="login-form" onSubmit={submitHandler}
                        className="user-form m-auto" style={{width: "50%"}} >
                    <div className="form-title">
                      <span>Đăng nhập vào tài khoản của bạn</span>
                    </div>
                    <section>
                      <div className="form-body">
                        <div className="row">
                          <p className="text-center text-danger">{message}</p>
                          <div className="form-group">
                            <label className="col-sm-4"><i className="fa fa-user-o"></i>
                              Tài khoản <span className="text-danger">*</span>
                            </label>
                            <div className="col-sm-8">
                              <div className="form-wrapper">
                                <input className="form-control"
                                       ref={usernameRef}
                                       name="email"
                                       type="text"  maxLength="128"/>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="row">
                          <div className="form-group">
                            <label className="col-sm-4">
                              <i className="fa fa-lock"></i>
                              Mật khẩu<span className="text-danger">*</span>
                            </label>
                            <div className="col-sm-8">
                              <div className="form-wrapper">
                                <input className="form-control"
                                       name="password"
                                       ref={passwordRef}
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
                          <input type="hidden" name="submitLogin" value="1"/>
                          <button className="form-control-submit first-btn"
                                  isLoading={isWaiting} disabled={isWaiting} type="submit">
                            Đăng nhập
                          </button>
                          <Nav.Link as={NavLink} to="/register" className="second-btn fright">
                            Tạo tài khoản mới
                          </Nav.Link>
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
