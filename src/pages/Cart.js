import React, {useEffect, useState} from "react";
import majorService from "../services/majorService";
import {json, Link, NavLink, useNavigate, useParams} from "react-router-dom";


const Cart = (props) => {
    const [items, setItems] = useState([]);
    // Lấy chuỗi JSON từ local storage
    const cartItemsJson = localStorage.getItem('cartItems');
    const [qty, setQty] = useState(1);
    const [total, setTotal] = useState(1);
    // Chuyển đổi chuỗi JSON thành một đối tượng JavaScript
    const cartItems = JSON.parse(cartItemsJson);
    const cartDispatch = (action,id) => {
        // localStorage.setItem('cartItems', JSON.stringify(items));
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const index = cartItems.findIndex(
            item =>
                item.id === id
        );
        if (index !== -1) {
            if (action == 'add') {
                cartItems[index].qty += 1;
            }else {
                if (cartItems[index].qty == 1) {
                    // setItems(cartItems.filter((item) => item.id !== id))
                } else {
                    cartItems[index].qty -= 1;
                }
            }
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        Total();
    }
    const Total =() =>{
        setItems(cartItems)
        setTotal(items.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.qty, 0))
    }
    const updateQty = (action, id) => {
        if (action == 'add') {
            cartDispatch(action,id)
        } else {
            cartDispatch(action,id)
        }
    }

    useEffect(() => {
        setItems(cartItems)
    },  []);

    return (
        <>
            <div className="content">
                <div className="container">
                    <section id="main">
                        <div className="cart-grid row">
                            <div className="cart-grid-body cart-block">
                                <div className="card cart-container">
                                    <div className="cart-overview js-cart table-responsive"
                                         data-refresh-url="//www.kkfashion.vn/cart?ajax=1&amp;action=refresh">
                                        <table className="shop-table">
                                            <thead>
                                            <tr>
                                                <th className="product-remove">&nbsp;</th>
                                                <th className="product-thumbnail">&nbsp;</th>
                                                <th className="product-name">Sản phẩm</th>
                                                <th className="product-price">Giá</th>
                                                <th className="product-quantity">Số lượng</th>
                                                <th className="product-subtotal">Tổng cộng</th>
                                            </tr>
                                            </thead>
                                            <tbody className="cart-items">
                                            {items && items.length > 0 ?

                                                    items.map((aItems,idx) => (
                                                        <tr className="cart-item inStock" key={idx}>
                                                            <td className="product-remove">
                                                                <a
                                                                    className="remove remove-from-cart"
                                                                    rel="nofollow"

                                                                >
                                                                    <i className="material-icons float-xs-left">Xóa</i>
                                                                </a>
                                                            </td>
                                                            <td className="product-thumbnail">
                                                                <Link to="#">
                                                                <span className="product-image media-middle">
                                                                    <img width="auto"
                                                                         src={`https://shop.decor.tichhop.pro/storage${aItems.image}?w=480`}
                                                                         alt={aItems.title}/>
                                                                </span>
                                                                </Link>
                                                            </td>
                                                            <td className="product-name product-line-info">
                                                                <Link data-id_customization="0"
                                                                      to="#">
                                                                    {aItems.title}
                                                                    <div className="product-line-info">
                                                                        <span className="value"> {aItems.options.join(", ")}</span>
                                                                    </div>

                                                                </Link>
                                                            </td>
                                                            <td className="product-price">
                                                                <div className="current-price">
                                                                    <span className="amount">{Intl.NumberFormat().format(aItems.price)}&nbsp;₫</span>
                                                                </div>
                                                            </td>
                                                            <td className="product-quantity qty">
                                                                <div className="jws-quantity-wrap">
                                                                    <div className="quantity">
                                                                        <div className="jws-qty-minus" onClick={() => { updateQty("remove", aItems.id) }}></div>
                                                                        <input
                                                                            autoComplete="off"
                                                                            className="js-cart-line-product-quantity input-text qty text"
                                                                            type="number"
                                                                            step="1"
                                                                            min="1"
                                                                            max=""
                                                                            name="product-quantity-spin"
                                                                            value={aItems.qty}
                                                                            size="4"
                                                                            pattern="[0-9]*"
                                                                        />
                                                                        <div className="jws-qty-plus" onClick={() => { updateQty("add", aItems.id) }}></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="product-subtotal">
                                                        <span className="amount">
                                                            {
                                                                Intl.NumberFormat().format(aItems.price*aItems.qty)

                                                            }&nbsp;₫
                                                        </span>
                                                            </td>
                                                        </tr>
                                                    ))

                                            :(
                                                <></>
                                                )
                                            }



                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                            <div >
                                {items && items.length > 0 ?(
                                    <div className="card cart-summary">
                                        <div className="cart-detailed-totals cart-collaterals">
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="block-promo">
                                                        <div className="cart-voucher cart-actions cart_totals">
                                                            <div className="coupon-header">

                                                                <div className="promo-code collapse" id="promo-code">
                                                                    <div className="alert alert-danger js-error"
                                                                         role="alert">
                                                                        <span className="ml-1 js-error-text"></span>
                                                                    </div>

                                                                    <form action="https://www.kkfashion.vn/cart"
                                                                          data-link-action="add-voucher" method="post"
                                                                          className="row">
                                                                        <input type="hidden" name="token"
                                                                               value="835acac5685788a8960ebc94aa75607f"/>
                                                                        <input type="hidden" name="addDiscount" value="1"/>
                                                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                                                            <div className="coupon">
                                                                                <input className="input-text promo-input"
                                                                                       type="text" name="discount_name"
                                                                                       value="" placeholder="Mã giảm giá"/>
                                                                                <button type="submit" className="button"
                                                                                        name="update_cart">
                                                                                    <span>Áp dụng</span></button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="cartShippingFee">
                                                        <p>
                                                            - Phí vận chuyển: <span
                                                            className="text-danger"><strong>MIỄN PHÍ</strong></span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="cart_totals col-md-5">
                                                    <div className="table-responsive">
                                                        <table className="shop_table shop_table_responsive" cellSpacing="0">
                                                            <tbody>
                                                            <tr className="cart-summary-line order-total"
                                                                id="cart-subtotal-products">
                                                                <td>
                                                        <span className="js-subtotal">
                                                            {items.length} sản phẩm
                                                        </span>
                                                                </td>
                                                                <td>
                                                                    <span className="value"> {Intl.NumberFormat().format(items.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.qty, 0)) }&nbsp;₫</span>
                                                                </td>
                                                            </tr>
                                                            <tr className="order-total">
                                                                <td>Tổng cộng:</td>
                                                                <td>
                                                                    <strong className="fontutm">
                                                                    <span className="amount">

                                                                    {Intl.NumberFormat().format(items.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.qty, 0)) }&nbsp;₫
                                                                </span></strong>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="to-checkout">
                                                        <div className="checkout cart-detailed-actions card-block">
                                                            <div className="text-sm-center">
                                                                <Link to="/order-review"
                                                                      className="checkout-button uppercase">Thanh toán <i
                                                                    className="fa fa-long-arrow-right"></i></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ):(
                                    <></>
                                    )
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Cart;
