import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/auth";
import MainMenu from "../widget/MainMenu";
const Header = (props) => {
  const userInfo = useSelector((state)=> state.auth.userInfo)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?q=${searchTerm}`);

  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <div id="header-page" className="nav-fixed">
        <div className="top-bar">
          <div className="row">
            <div className="col-sm-6 col-md-push-3 col-xs-7">
              <div className="header-contact text-center fontutm">Miễn phí vận chuyển mọi đơn hàng</div>
            </div>
            <div className="col-md-3 col-sm-6 col-md-push-3 text-right col-xs-5">
              <div className="header-top-wrap">
                <div className="my-account">
                  <Link className="account" to="/profile">
                    <span className="fontutm">  {userInfo.username ?? 'Tài khoản'}    </span>
                    <i className="pe-7s-user"></i><span className="acount-tt"></span>
                  </Link>
                </div>
                <div id="_desktop_cart">
                  <div className="blockcart my-cart " >
                    <Link to="/cart">
                      <span className="hidden-xs">Giỏ hàng</span>
                      <i className="pe-7s-shopbag"></i>
                      {/*<span className="count">0</span>*/}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky-wrapper" id="mainmenu-area-sticky-wrapper">
          <div className="sticky-wrapper" id="sticky-wrapper">
            <div className="mainmenu-area">
              <nav className="menu_nav">
                <div className="flex mainmenu">
                  <div className="position_fix fontutm w45">
                    <div className="button_menu hidden-lg hidden-md">
                      <i className="fa fa-bars"></i></div>
                       <MainMenu/>
                  </div>
                  <div className="logo-center text-center">
                    <h1 className="top-logo">
                      <Link className="logo-blance" to="/">
                        <img className="logo lozad" src="https://cdn.kkfashion.vn/img/kk-fashion-logo-1552814160.jpg"
                             data-src="https://cdn.kkfashion.vn/img/kk-fashion-logo-1552814160.jpg"
                             alt="K&amp;K Fashion"/></Link>
                    </h1>
                  </div>
                  <div className="right-header text-right w45 flex">
                    <div className="showroom ml-auto">
                      <ul className="nav navbar-nav hidden-xs hidden-sm" id="nav-right">

                        <li className="menu-item"><a href="javascript:;">Hướng dẫn mua hàng</a>
                          <div className="sub-menu-dropdown">
                            <ul className="sub-menu">
                              <li><a data-list-type="Header" data-content-type="Navigation"
                                     data-content-title="Các bước mua hàng" data-content-id="9"
                                     href="https://www.kkfashion.vn/page/cac-buoc-mua-hang">Các bước mua hàng</a></li>
                              <li><a data-list-type="Header" data-content-type="Navigation"
                                     data-content-title="Quy định đổi hàng" data-content-id="7"
                                     href="https://www.kkfashion.vn/page/quy-dinh-doi-hang">Quy định đổi hàng</a></li>
                              <li><a data-list-type="Header" data-content-type="Navigation"
                                     data-content-title="Thông tin tài khoản" data-content-id="8"
                                     href="https://www.kkfashion.vn/page/thong-tin-tai-khoan">Thông tin tài khoản</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="search-form">
                      <form onSubmit={handleSubmit} className="search-action">
                        <input type="text" value={searchTerm} onChange={handleChange}  placeholder="Nhập tên sản phẩm" />
                        <button type="submit"> <i className="pe-7s-search"></i></button>
                      </form>

                    </div>
                  </div>
                </div>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Header; ;
