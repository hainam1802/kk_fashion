import React, {useEffect, useState} from "react";
import SideBar from "../widget/SideBar";
import {Link} from "react-router-dom";
import productService from "../services/productService";
import userService from "../services/userService";
import {useSelector} from "react-redux";
import orderService from "../services/orderService";
const Profile = (props) => {
    const token = useSelector((state)=> state.auth.token)
    const [orderHistory,setOrderHistory] = useState([])
    useEffect(() => {
        orderService.getHistory(token).then((res) => {
            console.log(res.data)
            setOrderHistory(res.data)
            }
        );
    }, [token]);
    return (
        <>
            <div className="page-header single-breadcrums hidden-sm-down" style={{paddingTop: "40px"}}>
                <div className="page-breadcrumbs">
                    <nav data-depth="3" className="breadcrumbs">
                        <ol itemScope="" itemType="http://schema.org/BreadcrumbList">
                            <li itemProp="itemListElement" itemScope="">
                                <Link itemProp="item" to="/">
                                    <span itemProp="name">Trang chủ</span>
                                </Link>
                                <meta itemProp="position" content="1"/>
                                <span className="sep">/</span>
                            </li>
                            <li itemProp="itemListElement" itemScope="">
                                <Link itemProp="item" to="#">
                                    <span itemProp="name">Tài khoản của bạn</span>
                                </Link>
                                <meta itemProp="position" content="2"/>
                                <span className="sep">/</span>
                            </li>
                            <li itemProp="itemListElement" itemScope="">
                                <span itemProp="name" className="last">Thông tin đơn hàng</span>
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
                                <div className="alert alert-warning">
                                    <h6>Đây là các đơn đặt hàng bạn có kể từ khi tạo tài khoản này</h6>
                                </div>

                                <div className="my-account-content table-responsive">
                                    <table className="table table-striped hidden-sm-down">
                                        <thead>
                                        <tr>
                                            <th>Mã đặt hàng</th>
                                            <th>Ngày</th>
                                            <th>Tổng giá</th>
`                                            <th className="hidden-md-down">Trạng thái</th>
                                            <th>&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { orderHistory.map((aOrder, idx) => (
                                            <tr key={idx}>
                                                <td className="text-center">#{aOrder.id}</td>
                                                <td className="text-center">{aOrder.created_at}</td>
                                                <td className="text-center">{Intl.NumberFormat().format(aOrder.real_received_price)}&nbsp;₫</td>
                                                <td className="text-center">
                                                    {
                                                        aOrder.status == 0 ? (
                                                        <span className="label label-pill dark " style={{ backgroundColor: "#721c24" }}>
                                                              Đã hủy
                                                        </span>
                                                        ): aOrder.status == 1 ?(
                                                            <span className="label label-pill " style={{ backgroundColor: "#0c5460" }}>
                                                                  Đã xử lý (Đang chờ giao hàng)
                                                            </span>
                                                        ): aOrder.status == 2 ?(
                                                            <span className="label label-pill " style={{ backgroundColor: "#ff8c00" }}>
                                                              Đang chờ xử lý
                                                            </span>
                                                        ): aOrder.status == 3 ?(
                                                            <span className="label label-pill" style={{ backgroundColor: "#004085" }}>
                                                              Đang giao hàng
                                                            </span>
                                                        ): aOrder.status == 4 ?(
                                                            <span className="label label-pill dark" style={{ backgroundColor: "#155724" }}>
                                                              Đơn hàng đã thành công
                                                            </span>
                                                        ) : null

                                                    }
                                                </td>
                                                <td className="text-center order-actions">
                                                    <Link to={`/order-history/${aOrder.id}`}
                                                       data-link-action="view-order-details">
                                                        Chi tiết
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}

                                        </tbody>
                                    </table>
                                </div>

                                <div className="orders billing-address address-block hidden-md-up">
                                    <ul className="order">
                                        <li className="row">
                                            <div className="col-xs-10">
                                                <a href="https://www.kkfashion.vn/index.php?controller=order-detail&amp;id_order=97941">
                                                    <h3>NRUHIYBFF</h3></a>
                                                <div className="date">06/05/2023</div>
                                                <div className="total">960.000&nbsp;₫</div>
                                                <div className="status">
                            <span className="label label-pill dark" style={{backgroundColor: "#ff8c00"}}>
                                Đơn hàng mới
                            </span>
                                                </div>
                                            </div>
                                            <div className="col-xs-2 text-xs-right">
                                                <div>
                                                    <a href="https://www.kkfashion.vn/index.php?controller=order-detail&amp;id_order=97941"
                                                       data-link-action="view-order-details" title="Chi tiết">
                                                        <i className="fa fa-pencil-square-o fa-3"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="order">
                                        <li className="row">
                                            <div className="col-xs-10">
                                                <a href="https://www.kkfashion.vn/index.php?controller=order-detail&amp;id_order=97940">
                                                    <h3>SDTDKCISS</h3></a>
                                                <div className="date">06/05/2023</div>
                                                <div className="total">300.000&nbsp;₫</div>
                                                <div className="status">
                                            <span className="label label-pill dark" style={{backgroundColor: "#ff8c00"}}>
                                                Đơn hàng mới
                                            </span>
                                                </div>
                                            </div>
                                            <div className="col-xs-2 text-xs-right">
                                                <div>
                                                    <a href="https://www.kkfashion.vn/index.php?controller=order-detail&amp;id_order=97940"
                                                       data-link-action="view-order-details" title="Chi tiết">
                                                        <i className="fa fa-pencil-square-o fa-3"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="order">
                                        <li className="row">
                                            <div className="col-xs-10">
                                                <a href="https://www.kkfashion.vn/index.php?controller=order-detail&amp;id_order=97890">
                                                    <h3>TWHCCEKYD</h3></a>
                                                <div className="date">06/05/2023</div>
                                                <div className="total">1.350.000&nbsp;₫</div>
                                                <div className="status">
                                                <span className="label label-pill dark" style={{backgroundColor: "#ff8c00"}}>
                                                    Đơn hàng mới
                                                </span>
                                                </div>
                                            </div>
                                            <div className="col-xs-2 text-xs-right">
                                                <div>
                                                    <a href="https://www.kkfashion.vn/index.php?controller=order-detail&amp;id_order=97890"
                                                       data-link-action="view-order-details" title="Chi tiết">
                                                        <i className="fa fa-pencil-square-o fa-3"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Profile;
