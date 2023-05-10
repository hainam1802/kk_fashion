import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../store/auth";
import {Image, Nav} from "react-bootstrap";
import Slider from "react-slick";
import settingService from "../services/settingService";
const SuggestProduct = (props) => {
    const id = 97;
    const [suggestProduct,setSuggestProduct] = useState([])
    const settings1 = {
        slidesToShow: 6,
        swipeToSlide: true,
        focusOnSelect: true,
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
                console.log(res.data)
            setSuggestProduct(res.data)
        }
        );
    }, [id]);
    return (
        <>
            <div className="block productCat">
                <section className="featured-products  mt-3">
                    <div className="latest-block-list latest-home-block-list" id="flash-sale">
                        <div className="container block-list">
                            <div className="row">

                                <div className="element-grid ">
                                    <div  className="tb-products-grid ">
                                        <Slider {...settings1} >
                                            {
                                                suggestProduct.map((aSale, idx) => (
                                                    <div className="product-suggest product-item" style={{padding: "8px"}}>
                                                        <Link className="gallery"
                                                           to={`/${aSale.item.groups[0].slug}/${aSale.item.slug}`}
                                                           tabIndex="0">
                                                            <Image width="90%"
                                                                   src={`https://shop.decor.tichhop.pro/storage${aSale.item.image}`}
                                                                 alt="Đầm hoa dáng xòe xếp tầng tay dài" /></Link>
                                                        <div className="product-content">
                                                            <div className="">
                                                                <span className="code-title ">
                                                                    <Link
                                                                        to={`/${aSale.item.groups[0].slug}/${aSale.item.slug}`}
                                                                        tabIndex="0">#{aSale.item.id}</Link>
                                                                </span>
                                                                <br/>
                                                                <span
                                                                className="price"><span>{Intl.NumberFormat().format(aSale.item.price)} đ</span></span></div>
                                                            <div className="item-top"><h3 className="product-title text-left">
                                                                <Link
                                                                    to={`/${aSale.item.groups[0].slug}/${aSale.item.slug}`}
                                                                tabIndex="0">${aSale.item.title}</Link></h3></div>
                                                        </div>
                                                    </div>
                                                ))
                                            }


                                        </Slider>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    );
};

export default SuggestProduct;
