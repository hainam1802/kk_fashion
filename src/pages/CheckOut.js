import React, {useEffect, useState} from "react";
import majorService from "../services/majorService";
import {json, Link, NavLink, useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import studentService from "../services/studentService";
import orderService from "../services/orderService";
import {Navigate} from "react-router";


const OrderReview = (props) => {
    const [items, setItems] = useState([]);
    // Lấy chuỗi JSON từ local storage
    const cartItemsJson = localStorage.getItem('orderItems');
    const [qty, setQty] = useState(1);
    const [total, setTotal] = useState(1);
    const cartItems = JSON.parse(cartItemsJson);
    const [isWaiting, setIsWaiting] = useState(false);
    const token = useSelector((state)=> state.auth.token)
    const userInfo = useSelector((state)=> state.auth.userInfo)
    const navigate = useNavigate();
    const formilk = useFormik({
        initialValues:{
            fullname: null,
            phone: null,
            provinces: null,
            districts: null,
            address: null,
            cart: null,
            token: null,
            userid: null
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required(),
            phone: Yup.number().required(),
            provinces: Yup.string().required(),
            districts: Yup.string().required(),
            address: Yup.string().required(),
        }),
        onSubmit: ((values => {

            setIsWaiting(true);
            handleSave(values)
        }))
    })
    const handleSave = (data)=>{
        orderService.add(data).then((res) => {
            setIsWaiting(false)
            if (res.status === 1) {
                navigate('/checkout')
                localStorage.setItem('orderItems', JSON.stringify(cartItems));
                localStorage.removeItem('cartItems');
            } else {
                toast.error(res.errorCode);
            }
        });

    }
    useEffect(() => {
        setItems(cartItems)
        formilk.setFieldValue("cart",cartItems);
        formilk.setFieldValue("token",token);
        formilk.setFieldValue("userid",userInfo.id);
    },  []);

    return (
        <>
            <div className="content">
                <div className="container">
                    <section id="main">
                        <section id="content-hook_order_confirmation" className=" pb60">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-md-8 col-md-push-2">
                                        <div className="thankyou">
                                            Xin cám ơn. Bạn đã đặt hàng thành công ! K&amp;K Fashion sẽ liên hệ bạn
                                            trong vòng 72h
                                        </div>

                                        <p className="text-center">
                                            Chúng tôi đã gửi email đến địa chỉ email của bạn: admin@admin.com. Bạn cũng
                                            có thể <a
                                            href="https://www.kkfashion.vn/index.php?controller=pdf-invoice&amp;id_order=97941">tải
                                            về hóa đơn của bạn</a>
                                        </p>



                                        <section id="content" className="page-content page-order-confirmation ">
                                            <div className="card-block">
                                                <div id="order-items">
                                                    <div className="order-confirmation-table order-detail cart-block">
                                                        <h3 className="card-title h3">CHI TIẾT ĐƠN HÀNG</h3>

                                                        <div className="cart-body" id="cart-summary-product-list">
                                                            {
                                                                items.map((aItems,idx) => (
                                                                    <div className="order-line row-item">
                                                                        <div className="row-item-left">
                                                                            <Link className="thumbnail-img product-img"
                                                                               to="#">
                                                                                <img className="img-responsive"
                                                                                     src={`https://shop.decor.tichhop.pro/storage${aItems.image}`}

                                                                                     alt={aItems.title}/>
                                                                            </Link>
                                                                            <Link className="title-Product"
                                                                               to="#">
                                                                                {aItems.title} (Thông tin: {aItems.options.join(", ")})
                                                                                | <span>{aItems.price} x {aItems.qty}</span>
                                                                                <span
                                                                                    className="fright hidden-xs">{Intl.NumberFormat().format(aItems.price*aItems.qty)}&nbsp;₫</span>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }

                                                            <div className="row-footer">
                                                                <span>Thành tiền</span>
                                                                <span>
                                                                    {Intl.NumberFormat().format(items.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.qty, 0)) }&nbsp;₫
                                                                </span>
                                                            </div>
                                                            <div className="row-footer">
                                                                <span>Phí vận chuyển</span><span>Miễn phí vận chuyển!</span>
                                                            </div>

                                                            <div className="row-footer"><span className="color-black">Tổng cộng:</span><span>       {Intl.NumberFormat().format(items.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.qty, 0)) }&nbsp;₫                                                    </span>
                                                            </div>
                                                            <div className="row-footer">
                                                                <span>Ghi chú:</span><span></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>


                                    </div>
                                </div>
                            </div>
                        </section>


                        <footer className="page-footer">
                        </footer>
                    </section>
                </div>
            </div>
        </>
    );
};

export default OrderReview;
