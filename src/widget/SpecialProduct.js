import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../store/auth";
import {Image, Nav} from "react-bootstrap";
import Slider from "react-slick";
import settingService from "../services/settingService";
const SpecialProduct = (props) => {
    const id = 96;
    const [specialProduct,setSpecialProduct] = useState([])
    const settings = {
        slidesToShow: 4,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '8px',
        infinite: true,
        nextArrow: (
            <div>
                <div className="next-slick-arrow"><i className="fa fa-angle-right" aria-hidden="true"></i> </div>
            </div>
        ),
        prevArrow: (
            <div>
                <div className="prev-slick-arrow"><i className="fa fa-angle-left" aria-hidden="true"></i> </div>
            </div>
        ),
    };
    useEffect(() => {
        settingService.getWidget(id).then((res) => {
            setSpecialProduct(res.data)
            }
        );
    }, [id]);
    return (
        <>
            <div className="block productCat">
                <section className="featured-products  mt-3">
                    <div className="container">
                        <div className="block-heading">
                            <h4 className="text-center fontutm block-title">Sản phẩm nổi bật</h4>
                            <div className="block-img-heading text-center"><img src="https://www.kkfashion.vn/themes/kkfashion/assets/img//icon-heading.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="latest-block-list latest-home-block-list" id="flash-sale">
                        <div className="container block-list">
                            <div className="row">
                                <Slider {...settings}
                                >
                                    {
                                        specialProduct.map((aSale, idx) => (

                                            <div className="tb-products-grid " key={idx}>
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <Image className=""
                                                               src={`https://shop.decor.tichhop.pro/storage${aSale.item.image}`}
                                                               alt="Đầm suông đuôi cá cổ yếm" />
                                                        <Link className="gallery"
                                                              to={`/${aSale.item.groups[0].slug}/${aSale.item.slug}`}
                                                        >
                                                            <Image
                                                                src={`https://shop.decor.tichhop.pro/storage${aSale.item.image}`}
                                                                alt="Đầm suông đuôi cá cổ yếm" />

                                                        </Link>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                            <div>
                                                                <span className="amount text-danger" style={{paddingRight: '8px'}}>
                                                            <small>
                                                                <del className="text-danger">{Intl.NumberFormat().format(aSale.item.price_old)}</del>
                                                            </small>
                                                        </span>

                                                                <span className="amount">{Intl.NumberFormat().format(aSale.item.price)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <Link  to={`/${aSale.item.groups[0].slug}/${aSale.item.slug}`}>
                                                                    ${aSale.item.title} <span
                                                                >#{aSale.item.id}</span></Link>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Slider>

                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    );
};

export default SpecialProduct;
