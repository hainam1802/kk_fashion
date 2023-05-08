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
    const cartItemsJson = localStorage.getItem('cartItems');
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
                    <div className="row">
                        <div className="col-md-6">
                            <div className="cart-block payment-block">
                                <h3>Giỏ hàng của bạn</h3>
                                <div className="cart-body">
                                    <section >
                                        <div className="card-block">
                                            <div className="cart-summary-products">
                                                <p className="pdt10">1 sản phẩm</p>
                                                {
                                                    items.map((aItems,idx) => (
                                                        <div className="collapse in" id="cart-summary-product-list">
                                                            <div className="row-item">
                                                                <div className="row-item-left">
                                                                    <Link to="#"
                                                                       title={aItems.title}
                                                                       className="product-img">
                                                                        <img className="media-object thumbnail-img"
                                                                             src={`https://shop.decor.tichhop.pro/storage${aItems.image}?w=480`}
                                                                             alt={aItems.title}/>
                                                                    </Link>
                                                                    <a className="title-Product"
                                                                       href="https://www.kkfashion.vn/ao-kieu-dang-croptop-co-dan-tong-asm13-14#/66-size-m">
                                                                        <strong>{aItems.title}</strong> <br/>
                                                                        <span>Thông tin: {aItems.options.join(", ")}</span>
                                                                        <br/>
                                                                        <span>Số lượng x {aItems.qty}</span><br/>
                                                                        <span className="price-product">{Intl.NumberFormat().format(aItems.price*aItems.qty)}&nbsp;₫</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </div>

                                            <div className="cart-summary-items-subtotal clearfix" id="items-subtotal">
                                                <div className="row-footer cart-summary-line cart-summary-subtotals"
                                                     id="cart-subtotal-products">
                                                    <span>Thành tiền</span>
                                                    <span>
                                                        {Intl.NumberFormat().format(items.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.qty, 0)) }&nbsp;₫
                                                       </span>
                                                </div>
                                                <div className="row-footer cart-summary-line cart-summary-subtotals"
                                                     id="cart-subtotal-shipping">
                                                    <span>Vận chuyển</span>
                                                    <span>Miễn phí!</span>
                                                </div>
                                            </div>

                                            <div className="card-block cart-summary-totals">
                                                <div className="cart-summary-line cart-total row-footer">
                                                    <span>Tổng cộng:</span>
                                                    <span>{Intl.NumberFormat().format(items.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.qty, 0)) }&nbsp;₫

                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div className="block-promo">
                                <div className="cart-voucher cart-actions cart_totals">
                                    <div className="coupon-header">
                                        <div className="promo-code collapse" id="promo-code">
                                            <div className="alert alert-danger js-error" role="alert">
                                                <span className="ml-1 js-error-text"></span>
                                            </div>
                                            <form action="https://www.kkfashion.vn/cart" data-link-action="add-voucher"
                                                  method="post" className="row">
                                                <input type="hidden" name="token"
                                                       value="835acac5685788a8960ebc94aa75607f"/>
                                                <input type="hidden" name="addDiscount" value="1"/>
                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                    <div className="coupon">
                                                        <input className="input-text promo-input" type="text"
                                                               name="discount_name" value="" placeholder="Mã giảm giá"/>
                                                        <button type="submit" className="button" name="update_cart">
                                                            <span>Áp dụng</span></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <form >
                                <div className="billing-block payment-block js-address-form">
                                    <h3>Thông tin mua hàng</h3>
                                    <div id="delivery-address">
                                        <div className="form-wrap">
                                            <section className="form-fields">

                                                <div className="form-group">
                                                    <label className="form-control-label required">
                                                        Họ Tên
                                                    </label>
                                                    <input className="form-control"
                                                           name="fullname"
                                                           type="text"
                                                           onChange={formilk.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label required">
                                                        Điện thoại
                                                    </label>
                                                    <input className="form-control"
                                                           name="phone"
                                                           type="number"
                                                           minLength="10"
                                                           maxLength="10"
                                                           onChange={formilk.handleChange}
                                                           required=""
                                                    />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label required">
                                                                Tỉnh / Thành phố
                                                            </label>
                                                            <select className="form-control "
                                                                name="provinces"
                                                                onChange={formilk.handleChange}
                                                            >
                                                                <option value="">Chọn Tỉnh / Thành phố</option>
                                                                <option
                                                                    value="Thành phố Cần Thơ">
                                                                    Thành phố Cần Thơ
                                                                </option>
                                                                <option value="Thành phố Đà Nẵng" >
                                                                    Thành phố Đà Nẵng
                                                                </option>

                                                            </select>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-control-label required">
                                                                Quận / Huyện
                                                            </label>
                                                            <select
                                                                className="form-control"
                                                                onChange={formilk.handleChange}
                                                                name="districts">
                                                                <option value="Chọn Quận / Huyện">Chọn Quận /
                                                                    Huyện
                                                                </option>
                                                                <option  value="Quận Liên Chiểu">Quận Liên
                                                                    Chiểu
                                                                </option>
                                                                <option value="Quận Thanh Khê">Quận Thanh
                                                                    Khê
                                                                </option>
                                                                <option value="Quận Hải Châu">Quận Hải Châu
                                                                </option>
                                                                <option value="Quận Ngũ Hành Sơn">Quận Ngũ
                                                                    Hành Sơn
                                                                </option>
                                                                <option value="Quận Cẩm Lệ">Quận Cẩm Lệ
                                                                </option>
                                                                <option  value="Huyện Hòa Vang">Huyện Hòa
                                                                    Vang
                                                                </option>
                                                                <option value="Quận Sơn Trà">Quận Sơn Trà
                                                                </option>

                                                            </select>


                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">

                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="form-control-label required">
                                                                Địa chỉ
                                                            </label>
                                                            <input className="form-control"
                                                                   name="address"
                                                                   onChange={formilk.handleChange}
                                                                   type="text"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-payment p-0">
                                    <div id="payment-confirmation">
                                        <div className="ps-shown-by-js">
                                            <button type="submit" className="btn btn-dark btn-fw" onClick={formilk.handleSubmit}>
                                                Hoàn tất đặt hàng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>


                            <div id="cart-points-summary">
                                <div className="card" style={{padding: "15px"}} >
                                    Cảm ơn đã mua hàng!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderReview;
