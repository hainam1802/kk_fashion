import React, {useEffect, useState} from "react";
import majorService from "../services/majorService";
import {json, Link, NavLink, useNavigate, useParams} from "react-router-dom";
import productService from "../services/productService";
import {useFormik} from "formik";
import * as Yup from "yup";
import studentService from "../services/studentService";
import {toast} from "react-toastify";
import Input from "../components/Input";
import {login} from "../store/auth";
import {useDispatch, useSelector} from "react-redux";
import {addcart} from "../store/cart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Product = (props) => {
    const [products, setProducts] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [imageExtension, setImageExtension] = useState([]);
    const [imageExtension2, setImageExtension2] = useState([]);
    const [currentCategory, setCurrentCategory] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const { id,category } = useParams();
    const [isWaiting, setIsWaiting] = useState(false);
    const dispatch = useDispatch();
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);
    const formilk = useFormik({
        initialValues:{
            id: null,
            qty: 1,
            options: null,
            title: null,
            slug: null,
            price: 0,
            price_base: 0,
            image: null,
        },
        validationSchema: Yup.object({
        }),
        onSubmit: ((values => {
            setIsWaiting(true);
            handleSave(values)
        }))
    })
    const cartItem = useSelector((state)=> state.cart.item)
    const handleSave = (data)=>{
        setIsWaiting(false)

        // Tìm kiếm xem giá trị có tồn tại trong mảng không
            // Lấy chuỗi JSON từ local storage
            const cartItemsJson = localStorage.getItem('cartItems');
            // Chuyển đổi chuỗi JSON thành một đối tượng JavaScript
            const cartItems = JSON.parse(cartItemsJson);
            if (cartItems && cartItems.length > 0){
                console.log(22)
                const index = cartItems.findIndex(
                    item =>
                        item.id === data.id && JSON.stringify(item.options) === JSON.stringify(data.options)
                );

                if (index !== -1) {
                    cartItems[index].qty += 1;
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                }else {
                    // Nếu không có giá trị nào trong local storage, khởi tạo một mảng rỗng
                    const cartItemsArray = cartItems ? cartItems : [];
                    // Thêm một phần tử mới vào mảng
                    cartItemsArray.push(data);
                    // Lưu lại mảng vào local storage
                    localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
                }
            }else {
                // Nếu không có giá trị nào trong local storage, khởi tạo một mảng rỗng
                const cartItemsArray = cartItems ? cartItems : [];
                // Thêm một phần tử mới vào mảng
                cartItemsArray.push(data);
                // Lưu lại mảng vào local storage
                localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
            }


        toast.success("Thêm vào giỏ hàng thành công!");

    }
    useEffect(() => {
        productService.get(category,id).then((res) => {
            setProducts(res.data);
            setAttributes(res.data_attribute);
            setCurrentCategory(res.currentCategory);
            setBlogs(res.items_blog);
            setImageExtension(JSON.parse(res.data.image_extension));

            formilk.setFieldValue("id",res.data.id);
            formilk.setFieldValue("title",res.data.title);
            formilk.setFieldValue("slug",res.data.slug);
            formilk.setFieldValue("price",res.data.price);
            formilk.setFieldValue("price_base",res.data.price_old);
            formilk.setFieldValue("image",res.data.image);
                setNav1(slider1);
                setNav2(slider2);
        }
        );
    }, [category,id, navigate]);
    // const settingsMain = {
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     fade: true,
    //     asNavFor: '.slider-nav',
    //     loop: true
    // };
    // const settingsThumbs = {
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     asNavFor: '.slider-for',
    //     // dots: true,
    //     centerMode: true,
    //     swipeToSlide: true,
    //     focusOnSelect: true,
    //     centerPadding: '2px',
    //     infinite: true,
    // };






    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".slider-for",
        swipeToSlide: true,
        focusOnSelect: true,
    };
    const settingsThumbs = {
        infinite: true,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 5,
        lazyLoad: true,
        asNavFor: ".slider-nav",
        focusOnSelect: true,
    };

    const settings = {
        slidesToShow: 4,
        dots: true,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '2px',
        infinite: true,
        nextArrow: (
            <div>
                <div className="next-slick-arrow"> ⫸ </div>
            </div>
        ),
        prevArrow: (
            <div>
                <div className="prev-slick-arrow"> ⫷ </div>
            </div>
        ),
    };
    return (
        <>


            {/*breadcrums*/}
            <div className="page-header single-breadcrums hidden-sm-down" style={{paddingTop: "160px"}}>
                <div className="page-breadcrumbs">
                    <nav data-depth="4" className="breadcrumbs">
                        <ol itemScope="" itemType="http://schema.org/BreadcrumbList">
                            <li itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem">
                                <a itemProp="item" href="https://www.kkfashion.vn/">
                                    <span itemProp="name">Trang chủ</span>
                                </a>
                                <meta itemProp="position" content="1" />
                                <span className="sep">/</span>
                            </li>
                            {
                                currentCategory.title?(
                                    <li itemProp="itemListElement" >
                                        <Link to={`/${currentCategory.slug}`} >
                                            <span >{currentCategory.title}</span>
                                        </Link>
                                        <meta itemProp="position" content="2"  />
                                        <span className="sep">/</span>
                                    </li>
                                ):(
                                    <></>
                                )
                            }
                            {
                                products.title?(
                                    <li itemProp="itemListElement" >
                                        <Link to="#" >
                                            <span >{products.title}</span>
                                        </Link>
                                        <meta itemProp="position" content="2"  />
                                    </li>
                                ):(
                                    <></>
                                )
                            }
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="content">
                <div className="container">
                    <section id="main">
                        <div className="row">
                            <div className="content-product-left col-md-6 col-sm-7 col-xs-12 pl-0" style={{paddingLeft: "0"}}>
                                <section className="page-content" id="content">
                                    <div className="product-images-content" >
                                        <div className="images-container"></div>
                                            <div className="product-cover blance-images">
                                                <a className="trigger-zoom" href="javascript:;"></a>
                                                <Slider
                                                         {...settingsMain}
                                                         asNavFor={nav2}
                                                         ref={slider => (setSlider1(slider))}>

                                                    { imageExtension.map((aImageExtension, idx) => (

                                                            <div
                                                                 className={` gallery__image jws-image-zoom `}
                                                                 key={idx}
                                                                 data-thumb={`https://shop.decor.tichhop.pro/storage${aImageExtension}?w=768`} style={{position: "relative"}}>


                                                                <img
                                                                className="img-responsive "
                                                                src={`https://shop.decor.tichhop.pro/storage${aImageExtension}`}
                                                                alt="Chân váy midi xòe xếp ly họa tiết caro"
                                                                data-src={`https://shop.decor.tichhop.pro/storage${aImageExtension}`}
                                                            />
                                                            </div>
                                                        )
                                                    )}

                                                </Slider >
                                            </div>


                                            <div className="thumbnail-slider-wrap" id="">
                                                <Slider  {...settingsThumbs}
                                                         asNavFor={nav1}
                                                         ref={slider => (setSlider2(slider))}
                                                      >

                                                    { imageExtension.map((aImageExtension, idx) => (
                                                            <div className="" data-id={idx} key={idx}>
                                                                <img
                                                                    className={`thumb js-thumb `}
                                                                    src={`https://shop.decor.tichhop.pro/storage${aImageExtension}?w=150`}
                                                                    alt={products.title}
                                                                    width="78"
                                                                />
                                                            </div>
                                                        )
                                                    )}

                                                </Slider>
                                            </div>
                                    </div>
                                </section>
                            </div>
                            <div className="content-product-right col-md-6 col-sm-5 col-xs-12">
                                <div className="shop-top">
                                    <h1 className="product_title" itemProp="name">
                                        {products.title}

                                    </h1>
                                    <p className="sku"><span className="fontutm">Mã SP : </span><span> {products.id}</span></p>
                                    <div className="product-prices price">
                                        <div className="product-price h5">
                                            <div className="current-price">
                                                <span className="amount text-danger" style={{paddingRight: '8px'}}>
                                                    <small>
                                                        <del className="text-danger">{Intl.NumberFormat().format(products.price_old)}</del>
                                                    </small>
                                                </span>

                                                <span className="amount">{Intl.NumberFormat().format(products.price)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-information">
                                    <div className="product-actions shop-bottom js-product-actions">
                                        <form>

                                            <div className="">

                                                {
                                                    Object.keys(attributes).map((aAttributes,idx) => (
                                                        <div className=" product-variants-item " style={{marginBottom: "12px"}}>
                                                            <div className="" key={idx}>

                                                                <label style={{marginRight: "12px"}}><span>{attributes[aAttributes].title}</span></label>
                                                                {
                                                                    Object.keys(attributes[aAttributes].content).map((aAttributes1,idx1) => (
                                                                        <label className="opt-size">
                                                                            <input
                                                                                   name={`options[${idx}]`}
                                                                                   onChange={formilk.handleChange}
                                                                                   className="opt" type="radio"
                                                                                   value={attributes[aAttributes].content[aAttributes1]}/>
                                                                            <span className="opt-real">{attributes[aAttributes].content[aAttributes1]}</span>
                                                                        </label>



                                                                    ))
                                                                }
                                                            </div>

                                                        </div>

                                                    ))
                                                }
                                            </div>
                                            <section className="product-discounts"></section>
                                            <div className="product-add-to-cart js-product-add-to-cart "
                                                 style={{marginTop: "20px"}}>
                                                <div className="product-quantity clearfix">
                                                    <div className="single_variation_wrap">
                                                        <div className="single_variation"></div>
                                                        {/*<div className="variations_button">*/}
                                                        {/*    <div className="jws-quantity-wrap">*/}
                                                        {/*        <div className="quantity">*/}
                                                        {/*            <div className="jws-qty-minus"></div>*/}
                                                        {/*            <input type="number"*/}
                                                        {/*                   name="qty"*/}
                                                        {/*                   id="quantity_wanted"*/}
                                                        {/*                   defaultValue={1}*/}
                                                        {/*                   className="input-group input-text qty text"*/}
                                                        {/*                   onChange={formilk.handleChange}*/}
                                                        {/*                   min="1" aria-label="Số lượng" size="4" step="1"/>*/}
                                                        {/*            <div className="jws-qty-plus"></div>*/}
                                                        {/*        </div>*/}
                                                        {/*    </div>*/}
                                                        {/*</div>*/}
                                                        <div className="my-size">
                                                            <a className="magnific-image" href="./image/thongsosize.jpg">Bảng
                                                                size</a>
                                                        </div>
                                                    </div>
                                                    <div className="my-magi">
                                                        <div className="my-ship"><span>&nbsp;</span></div>
                                                    </div>
                                                    <div className="add">
                                                        <button className="single_add_to_cart_button"
                                                                onClick={formilk.handleSubmit}
                                                                 type="submit">
                                                            Thêm vào giỏ hàng
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="product-minimal-quantity"></p>
                                            </div>
                                            <div className="product-additional-info"></div>
                                        </form>
                                    </div>
                                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                        <div className="panel panel-default">
                                            <div className="panel-heading" id="headingOne" role="tab">
                                                <h4 className="panel-title">
                                                    <a role="button" data-toggle="collapse" href="#collapseOne"
                                                       data-target="#collapseOne" aria-expanded="true"
                                                       aria-controls="collapseOne">
                                                        <i className="more-less fa fa-plus"></i>
                                                        <span>
                                                <img
                                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3OS4xNTRweCIgaGVpZ2h0PSI0NzkuMTU0cHgiIHZpZXdCb3g9IjAgMCA0NzkuMTU0IDQ3OS4xNTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3OS4xNTQgNDc5LjE1NDsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0zNzIuNTI1LDQ0NC43MTJjNi4yOTYtNC44NDUsMTEuNjI5LTUuMzI2LDE3LjkyNS01LjMyNmM2LjI5MiwwLDkuNjktMy4zOTgsOS42OS0xMC4xNzUNCgkJCWMwLTYuNzg0LDExLjYyMS0wLjQ4OSw3Ljc0Mi05LjY4OWMtMy44NzktOS4yMDEtMTcuNDMzLTM1LjM1OC0yNS4xODMtNTguMTI4Yy03Ljc0Mi0yMi43NjMtMTguODgzLTY3LjMyNS0yOC4wOTItODkuMTEzDQoJCQljLTkuMTk3LTIxLjc5Ny02MC41NC0xMTEuNC02OC4yODMtMTMxLjI2M2MtNy43NS0xOS44NjEsMTAuMzQ4LTU1LjY5NywxMC4zNDgtNTUuNjk3czYuMDQzLTMzLjc4MSw3LjEzNy0zNy45NjQNCgkJCWMwLjQwMS0xLjUzMy0wLjk0MS0zLjIxMi0yLjc4MS00LjczM2MyLjMyNS0xLjQ3NywzLjk2NC0zLjk1NSwzLjk2NC02LjkwOWMwLTEuMTk0LTAuMjc2LTIuMzE4LTAuNzIyLTMuMzM4DQoJCQljMS4wMDYtMS4zNzMsMS43Mi0yLjk4MiwxLjcyLTQuODE3YzAtMC4wMjQtMC4wMTctMC4wNS0wLjAxNy0wLjA3NGM2LjUzMi0wLjM0NCw0LjE2NC0yLjg3MSwxMi45MTYtNy45MTgNCgkJCWM5LjQ0NS01LjQ1MiwwLjcyOS0zLjk5OCwxLjQ1OS05LjgwNmMwLjcyOS01LjgxMS0zLjI2Ny02LjUzOC01LjgxMS05LjA4NWMtMi41NDUtMi41NDEtNS40NSwyLjkwNy01LjQ1LDIuOTA3DQoJCQljLTE0Ljg4OC0wLjczMy0yLjU0MSwxMS4yNTctOS44MDcsMTAuMTk1Yy0zLjQxLTAuNTAxLTQuMzQ4LDIuNTMtMy41NTksNS44NTZjLTMuNjM1LDAuOTItNi4zNzEsNC4wNDYtNi4zNzEsNy45MzkNCgkJCWMwLDEuMTkyLDAuMjc2LDIuMzE2LDAuNzIxLDMuMzM2Yy0xLjAwMiwxLjM3LTEuNzE1LDIuOTgxLTEuNzE1LDQuODIxYzAsMC4wNjIsMC4wMjcsMC4xMDgsMC4wMjcsMC4xNzINCgkJCWMtMS45MTUtMC4xNjUtMy45MTUsMC42MTctNC45OCw0LjE0NGMwLDAtNS41NjYtMy41NTctNy45OTUsMi44MTdjMCwwLTcuOTkxLTAuMzk5LTkuMjAxLDYuNjI4YzAsMC0yMi4wMjQtMC40NTctMjYuNjMzLDUuNzY5DQoJCQljLTQuNjA2LTYuMjI2LTI2LjYzNy01Ljc2OS0yNi42MzctNS43NjljLTEuMjA2LTcuMDI3LTkuMTk5LTYuNjI4LTkuMTk5LTYuNjI4Yy0yLjQyNi02LjM4Mi03Ljk5My0yLjgxNy03Ljk5My0yLjgxNw0KCQkJYy0xLjA2OC0zLjUyNi0zLjA3LTQuMy00Ljk4MS00LjE0NGMwLTAuMDY0LDAuMDMtMC4xMSwwLjAzLTAuMTcyYzAtMS44MzktMC43MTctMy40NDItMS43MjEtNC44MjENCgkJCWMwLjQ1Ny0xLjAyOCwwLjcyNC0yLjE0NCwwLjcyNC0zLjMzNmMwLTMuODkzLTIuNzQ3LTcuMDE5LTYuMzY2LTcuOTIyYzAuNzkzLTMuMzI5LTAuMTQyLTYuMzYtMy41NTktNS44NTMNCgkJCWMtNy4yNTksMS4wNjYsNS4wODctMTAuOTItOS44MDQtMTAuMjAxYzAsMC0yLjkwNS01LjQ0Ni01LjQ0OC0yLjkwNWMtMi41NDUsMi41NDUtNi41MzgsMy4yNjYtNS44MTEsOS4wODUNCgkJCWMwLjczMyw1LjgwNy03Ljk5MSw0LjM1OCwxLjQ1Myw5LjgwNGM4Ljc1Niw1LjA0OSw2LjM5OCw3LjU3NiwxMi45MjIsNy45MmMwLDAuMDIyLTAuMDE0LDAuMDUtMC4wMTQsMC4wNzINCgkJCWMwLDEuODMsMC43MTEsMy40MzgsMS43MTcsNC44MTljLTAuNDUzLDEuMDMtMC43MjEsMi4xNDItMC43MjEsMy4zMzhjMCwyLjk1MiwxLjYzMyw1LjQzMiwzLjk2Myw2LjkwOQ0KCQkJYy0xLjg0MywxLjUyMS0zLjE4NiwzLjItMi43ODcsNC43MzNjMS4xLDQuMTczLDcuMTM3LDM3Ljk2NCw3LjEzNywzNy45NjRzMTguMTA1LDM1Ljg0NCwxMC4zNTMsNTUuNjk5DQoJCQljLTcuNzQ2LDE5Ljg2MS01OS4wODcsMTA5LjQ2NS02OC4yODYsMTMxLjI2MWMtOS4yMDUsMjEuNzg5LTIwLjM0NCw2Ni4zNTktMjguMDksODkuMTEzDQoJCQljLTcuNzQ3LDIyLjc3MS0yMS4zMTMsNDguOTE5LTI1LjE4NSw1OC4xMjhjLTMuODc5LDkuMTk3LDcuNzQ3LDIuOTA1LDcuNzQ3LDkuNjljMCw2Ljc3NiwzLjM5NCwxMC4xNyw5LjY5MSwxMC4xNw0KCQkJYzYuMjk0LDAsMTEuNjI2LDAuNDg1LDE3LjkxOSw1LjMzYzYuMjk4LDQuODQ2LDEyLjEwNiw5LjIwMSwxOS44NjUsNy43NTFjNy43NDctMS40NTUsMzcuMjk1LDYuNzc2LDM5LjcxMiwxMi41ODcNCgkJCWMyLjQxOCw1LjgxMSwyNi42MzUsMjAuMjcsMzcuNzc2LDExLjE0MWM5LjcwNi03Ljk1LDMwLjQxMi0xMC4xMzUsMzUuNjAyLTEwLjU2M2M1LjE4OSwwLjQyOSwyNS44OTYsMi42MTMsMzUuNjAyLDEwLjU2Mw0KCQkJYzExLjE0MSw5LjEyOSwzNS4zNTctNS4zMywzNy43NzQtMTEuMTQxYzIuNDEyLTUuODExLDMxLjk2Ny0xNC4wNDIsMzkuNzE4LTEyLjU4Nw0KCQkJQzM2MC40MTksNDUzLjkyMSwzNjYuMjI5LDQ0OS41NTcsMzcyLjUyNSw0NDQuNzEyeiBNMjk2LjUyMSwyMS44NWMxLjMxMSwyLjc4NywzLjc1OSw1LjIwMiw3LjA2OSw1LjU1OA0KCQkJYzAsMC4wNTQsMC4wNCwwLjEwMSwwLjA0LDAuMTY1YzAsMS4wMTItMC4zMTcsMS45MTQtMC43NywyLjc1M2MtMS41MTktMS43NS0zLjY5NS0yLjkxLTYuMTkxLTIuOTENCgkJCWMtMS43NjQsMC0zLjMxNCwwLjY3NS00LjY2NSwxLjYyNWMtMC4xMi0wLjQ3OS0wLjI5Ny0wLjk0NC0wLjI5Ny0xLjQ2QzI5MS43MDcsMjQuNjkxLDI5My43OTksMjIuMzk5LDI5Ni41MjEsMjEuODV6DQoJCQkgTTMwMS4zMjEsMzIuMTY1Yy0xLjAzLDAuODEtMi4yNDgsMS4zNjUtMy42NTksMS4zNjVjLTEuOTIzLDAtMy41NTUtMC45NzQtNC42NDUtMi4zOTJjMS4wMTktMC44MTIsMi4yNDQtMS4zNjksMy42NTEtMS4zNjkNCgkJCUMyOTguNTg0LDI5Ljc2OSwzMDAuMjI0LDMwLjc0MywzMDEuMzIxLDMyLjE2NXogTTI5MS40NjcsMzIuOTgxYzEuNTI3LDEuNzUzLDMuNzAzLDIuOTEzLDYuMTk1LDIuOTEzDQoJCQljMS43NzEsMCwzLjMxNC0wLjY3Nyw0LjY2OS0xLjYyNWMwLjEyNCwwLjQ3OSwwLjMwMSwwLjk0LDAuMzAxLDEuNDYxYzAsMi40MzgtMS40ODcsNC41MjgtMy41ODcsNS40NDgNCgkJCWMtMi44NjktMS45MTctNS45NTEtMy4zMTItNS45NTEtMy4zMTJzLTAuOTI2LTAuNzMzLTIuMjE2LTEuMzFjLTAuMDQ0LTAuMjg1LTAuMTY4LTAuNTI5LTAuMTY4LTAuODE4DQoJCQlDMjkwLjcxLDM0LjcxNCwyOTEuMDI2LDMzLjgxNCwyOTEuNDY3LDMyLjk4MXogTTE3NS41MjIsMjcuNTczYzAtMC4wNTgsMC4wMzQtMC4xMSwwLjAzNC0wLjE2NQ0KCQkJYzMuMzA2LTAuMzY0LDUuNzYzLTIuNzcxLDcuMDczLTUuNTU4YzIuNzEzLDAuNTQ5LDQuODExLDIuODQxLDQuODExLDUuNzIzYzAsMC41MTktMC4xNzIsMC45ODItMC4yOTksMS40Ng0KCQkJYy0xLjM1MS0wLjk0MS0yLjg5Ni0xLjYyNS00LjY2My0xLjYyNWMtMi40OTUsMC00LjY3MiwxLjE2My02LjE5MywyLjkxQzE3NS44NDUsMjkuNDg2LDE3NS41MjIsMjguNTg1LDE3NS41MjIsMjcuNTczeg0KCQkJIE0xODYuMTMsMzEuMTM4Yy0xLjA5LDEuNDE4LTIuNzIzLDIuMzkyLTQuNjQ2LDIuMzkyYy0xLjM5OSwwLTIuNjI5LTAuNTU1LTMuNjUzLTEuMzY1YzEuMDkyLTEuNDIyLDIuNzI1LTIuMzk2LDQuNjQ4LTIuMzk2DQoJCQlDMTgzLjg4NCwyOS43NjksMTg1LjExOCwzMC4zMjYsMTg2LjEzLDMxLjEzOHogTTE4OC4yNzEsMzYuNTU2Yy0xLjI4OCwwLjU4NS0yLjIyLDEuMzEtMi4yMiwxLjMxcy0zLjA3OCwxLjM5NS01Ljk0NSwzLjMxMg0KCQkJYy0yLjEtMC45MTktMy41ODYtMy4wMDktMy41ODYtNS40NDhjMC0wLjUyMSwwLjE3Ni0wLjk4MiwwLjI5OC0xLjQ2MWMxLjM1MywwLjk0LDIuODk3LDEuNjI1LDQuNjY1LDEuNjI1DQoJCQljMi40OTQsMCw0LjY2OC0xLjE2LDYuMTk1LTIuOTEzYzAuNDQzLDAuODMzLDAuNzU3LDEuNzQ1LDAuNzU3LDIuNzU3QzE4OC40MzYsMzYuMDE5LDE4OC4zMTQsMzYuMjcxLDE4OC4yNzEsMzYuNTU2eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                                                    alt=""
                                                />
                                                Mô tả sản phẩm
                                            </span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div className="panel-collapse collapse" id="collapseOne" role="tabpanel"
                                                 aria-labelledby="headingOne">
                                                <div className="panel-body">
                                                    <section className="product-features">
                                                        <ul className="data-sheet">
                                                            <li data-attr="Chất liệu">- Chất liệu: Cotton lụa liberty</li>
                                                            <li data-attr="Màu sắc">- Màu sắc: Caro xanh</li>
                                                            <li className="hidden" data-attr="Đối tượng">- Đối tượng:
                                                                25-34
                                                            </li>
                                                            <li className="hidden" data-attr="Kiểu dáng">- Kiểu dáng: Xòe
                                                            </li>
                                                        </ul>
                                                    </section>

                                                    <div className="description">
                                                        Chân midi dáng xòe CV05-17 sẽ giúp nàng chinh phục được vẻ ngoài dịu
                                                        dàng một cách nhanh chóng. Chân váy được may dáng xòe xếp ly tạo đồ
                                                        bồng bềnh khiến mỗi bước đi trở nên uyển chuyển và thướt
                                                        tha hơn. Bên cạnh đó, chiều dài váy được thiết kế midi qua gối phù
                                                        hợp với những cô nàng yêu thích phong cách kín đáo, thanh lịch hay
                                                        đơn giản là che đi những điểm chưa đẹp của đôi chân. Với mùa
                                                        hè oi ả như hiện nay, gam màu xanh lá chủ đạo của chân váy xòe này
                                                        sẽ giúp xua tan đi cái nóng cũng như đem đến cho chị em cảm giác
                                                        tươi mát cùng chất vải cotton lụa liberty cao cấp có độ thấm hút
                                                        tốt và thoáng mát. Không cần vải suy nghĩ nhiều về khoản
                                                        mix&amp;match, chân váy CV05-17 dễ dàng mặc đẹp cùng áo sơ mi, áo
                                                        kiểu, ví như ASM12-30 của K&amp;K Fashion là đã có ngay outfit đa
                                                        năng để
                                                        đi làm hay đi chơi cùng bạn.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading" id="headingTwo" role="tab">
                                                <h4 className="panel-title">
                                                    <a role="button" data-toggle="collapse" href="#collapseTwo"
                                                       aria-expanded="false" aria-controls="collapseTwo">
                                                        <i className="more-less fa fa-plus"></i><span> <i
                                                        className="fa fa-refresh"></i>Quy định đổi hàng</span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div className="panel-collapse collapse" id="collapseTwo" role="tabpanel"
                                                 aria-labelledby="headingTwo">
                                                <div className="panel-body">
                                                    <ul>
                                                        <li>Sản phẩm còn nguyên tem, mạc, hóa đơn, không bị dơ bẩn, hư hỏng,
                                                            chưa qua sử dụng hoặc giặt tẩy.
                                                        </li>
                                                        <li>Khách hàng tại Tp.HCM có thể đến bất kì cửa hàng nào để đổi
                                                            hàng. Hoặc K&K Fashion hỗ trợ đổi hàng tận nơi phí vận chuyển
                                                            35.000đ
                                                        </li>
                                                        <li>Thời gian đổi hàng - Trong vòng 7 ngày kể từ ngày nhận hàng.
                                                        </li>
                                                    </ul>
                                                    <p>* Các chính sách có thể thay đổi tùy theo chương trình khuyến
                                                        mãi.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <footer className="page-footer">
                        </footer>
                    </section>
                </div>

                <div className="block productCat">
                    <section className="featured-products  mt-3">
                        <div className="container">
                            <div className="block-heading">
                                <h4 className="text-center fontutm block-title">Sản phẩm cùng danh mục</h4>
                                <div className="block-img-heading text-center"><img src="./image/icon-heading.png" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="latest-block-list latest-home-block-list">
                            <div className="container block-list">
                                <div className="row">
                                    <Slider {...settings}


                                    >
                                        <div className="tb-products-grid ">
                                            <div className="product-item">
                                                <div className="product-thumb">
                                                    <img className=""
                                                         src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                         alt="Đầm suông đuôi cá cổ yếm" />
                                                    <a className="gallery"
                                                       href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                        <img
                                                            src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                            alt="Đầm suông đuôi cá cổ yếm" />
                                                        <div className="kk-size hidden-xs hidden-sm">
                                                            <div className="size">
                                                                <span className="pull-left">Size</span>
                                                                <div className="pull-right">
                                                                    <ul>
                                                                        <li>
                                                                            S
                                                                        </li>
                                                                        <li>
                                                                            M
                                                                        </li>
                                                                        <li>
                                                                            L
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="product-content">
                                                    <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                    </div>
                                                    <div className="item-top">
                                                        <h3 className="product-title text-left">
                                                            <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                suông đuôi cá cổ yếm <span
                                                                    className="f12">HL24-01</span></a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tb-products-grid ">
                                            <div className="product-item">
                                                <div className="product-thumb">
                                                    <img className=""
                                                         src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                         alt="Đầm suông đuôi cá cổ yếm" />
                                                    <a className="gallery"
                                                       href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                        <img
                                                            src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                            alt="Đầm suông đuôi cá cổ yếm" />
                                                        <div className="kk-size hidden-xs hidden-sm">
                                                            <div className="size">
                                                                <span className="pull-left">Size</span>
                                                                <div className="pull-right">
                                                                    <ul>
                                                                        <li>
                                                                            S
                                                                        </li>
                                                                        <li>
                                                                            M
                                                                        </li>
                                                                        <li>
                                                                            L
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="product-content">
                                                    <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                    </div>
                                                    <div className="item-top">
                                                        <h3 className="product-title text-left">
                                                            <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                suông đuôi cá cổ yếm <span
                                                                    className="f12">HL24-01</span></a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tb-products-grid ">
                                            <div className="product-item">
                                                <div className="product-thumb">
                                                    <img className=""
                                                         src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                         alt="Đầm suông đuôi cá cổ yếm" />
                                                    <a className="gallery"
                                                       href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                        <img
                                                            src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                            alt="Đầm suông đuôi cá cổ yếm" />
                                                        <div className="kk-size hidden-xs hidden-sm">
                                                            <div className="size">
                                                                <span className="pull-left">Size</span>
                                                                <div className="pull-right">
                                                                    <ul>
                                                                        <li>
                                                                            S
                                                                        </li>
                                                                        <li>
                                                                            M
                                                                        </li>
                                                                        <li>
                                                                            L
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="product-content">
                                                    <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                    </div>
                                                    <div className="item-top">
                                                        <h3 className="product-title text-left">
                                                            <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                suông đuôi cá cổ yếm <span
                                                                    className="f12">HL24-01</span></a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tb-products-grid ">
                                            <div className="product-item">
                                                <div className="product-thumb">
                                                    <img className=""
                                                         src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                         alt="Đầm suông đuôi cá cổ yếm" />
                                                    <a className="gallery"
                                                       href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                        <img
                                                            src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                            alt="Đầm suông đuôi cá cổ yếm" />
                                                        <div className="kk-size hidden-xs hidden-sm">
                                                            <div className="size">
                                                                <span className="pull-left">Size</span>
                                                                <div className="pull-right">
                                                                    <ul>
                                                                        <li>
                                                                            S
                                                                        </li>
                                                                        <li>
                                                                            M
                                                                        </li>
                                                                        <li>
                                                                            L
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="product-content">
                                                    <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                    </div>
                                                    <div className="item-top">
                                                        <h3 className="product-title text-left">
                                                            <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                suông đuôi cá cổ yếm <span
                                                                    className="f12">HL24-01</span></a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tb-products-grid ">
                                            <div className="product-item">
                                                <div className="product-thumb">
                                                    <img className=""
                                                         src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                         alt="Đầm suông đuôi cá cổ yếm" />
                                                    <a className="gallery"
                                                       href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                        <img
                                                            src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                            alt="Đầm suông đuôi cá cổ yếm" />
                                                        <div className="kk-size hidden-xs hidden-sm">
                                                            <div className="size">
                                                                <span className="pull-left">Size</span>
                                                                <div className="pull-right">
                                                                    <ul>
                                                                        <li>
                                                                            S
                                                                        </li>
                                                                        <li>
                                                                            M
                                                                        </li>
                                                                        <li>
                                                                            L
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="product-content">
                                                    <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                    </div>
                                                    <div className="item-top">
                                                        <h3 className="product-title text-left">
                                                            <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                suông đuôi cá cổ yếm <span
                                                                    className="f12">HL24-01</span></a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tb-products-grid ">
                                            <div className="product-item">
                                                <div className="product-thumb">
                                                    <img className=""
                                                         src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                         alt="Đầm suông đuôi cá cổ yếm" />
                                                    <a className="gallery"
                                                       href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                        <img
                                                            src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                            alt="Đầm suông đuôi cá cổ yếm" />
                                                        <div className="kk-size hidden-xs hidden-sm">
                                                            <div className="size">
                                                                <span className="pull-left">Size</span>
                                                                <div className="pull-right">
                                                                    <ul>
                                                                        <li>
                                                                            S
                                                                        </li>
                                                                        <li>
                                                                            M
                                                                        </li>
                                                                        <li>
                                                                            L
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="product-content">
                                                    <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                    </div>
                                                    <div className="item-top">
                                                        <h3 className="product-title text-left">
                                                            <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                suông đuôi cá cổ yếm <span
                                                                    className="f12">HL24-01</span></a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tb-products-grid ">
                                            <div className="product-item">
                                                <div className="product-thumb">
                                                    <img className=""
                                                         src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                         alt="Đầm suông đuôi cá cổ yếm" />
                                                    <a className="gallery"
                                                       href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                        <img
                                                            src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                            alt="Đầm suông đuôi cá cổ yếm" />
                                                        <div className="kk-size hidden-xs hidden-sm">
                                                            <div className="size">
                                                                <span className="pull-left">Size</span>
                                                                <div className="pull-right">
                                                                    <ul>
                                                                        <li>
                                                                            S
                                                                        </li>
                                                                        <li>
                                                                            M
                                                                        </li>
                                                                        <li>
                                                                            L
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="product-content">
                                                    <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                    </div>
                                                    <div className="item-top">
                                                        <h3 className="product-title text-left">
                                                            <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                suông đuôi cá cổ yếm <span
                                                                    className="f12">HL24-01</span></a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tb-products-grid ">
                                            <div className="product-item">
                                                <div className="product-thumb">
                                                    <img className=""
                                                         src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                         alt="Đầm suông đuôi cá cổ yếm" />
                                                    <a className="gallery"
                                                       href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                        <img
                                                            src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                            alt="Đầm suông đuôi cá cổ yếm" />
                                                        <div className="kk-size hidden-xs hidden-sm">
                                                            <div className="size">
                                                                <span className="pull-left">Size</span>
                                                                <div className="pull-right">
                                                                    <ul>
                                                                        <li>
                                                                            S
                                                                        </li>
                                                                        <li>
                                                                            M
                                                                        </li>
                                                                        <li>
                                                                            L
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="product-content">
                                                    <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                    </div>
                                                    <div className="item-top">
                                                        <h3 className="product-title text-left">
                                                            <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                suông đuôi cá cổ yếm <span
                                                                    className="f12">HL24-01</span></a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tb-products-grid ">
                                            <div className="product-item">
                                                <div className="product-thumb">
                                                    <img className=""
                                                         src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                         alt="Đầm suông đuôi cá cổ yếm" />
                                                    <a className="gallery"
                                                       href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                        <img
                                                            src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                            alt="Đầm suông đuôi cá cổ yếm" />
                                                        <div className="kk-size hidden-xs hidden-sm">
                                                            <div className="size">
                                                                <span className="pull-left">Size</span>
                                                                <div className="pull-right">
                                                                    <ul>
                                                                        <li>
                                                                            S
                                                                        </li>
                                                                        <li>
                                                                            M
                                                                        </li>
                                                                        <li>
                                                                            L
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="product-content">
                                                    <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                    </div>
                                                    <div className="item-top">
                                                        <h3 className="product-title text-left">
                                                            <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                suông đuôi cá cổ yếm <span
                                                                    className="f12">HL24-01</span></a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tb-products-grid ">
                                            <div className="product-item">
                                                <div className="product-thumb">
                                                    <img className=""
                                                         src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                         alt="Đầm suông đuôi cá cổ yếm" />
                                                    <a className="gallery"
                                                       href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                        <img
                                                            src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                            alt="Đầm suông đuôi cá cổ yếm" />
                                                        <div className="kk-size hidden-xs hidden-sm">
                                                            <div className="size">
                                                                <span className="pull-left">Size</span>
                                                                <div className="pull-right">
                                                                    <ul>
                                                                        <li>
                                                                            S
                                                                        </li>
                                                                        <li>
                                                                            M
                                                                        </li>
                                                                        <li>
                                                                            L
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="product-content">
                                                    <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                    </div>
                                                    <div className="item-top">
                                                        <h3 className="product-title text-left">
                                                            <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                suông đuôi cá cổ yếm <span
                                                                    className="f12">HL24-01</span></a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </Slider>
                                    <div className="element-grid slider-slick">
                                        <div className="item-slick">

                                            <div data-position="1" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <img className=""
                                                             src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                             alt="Đầm suông đuôi cá cổ yếm" />
                                                        <a className="gallery"
                                                           href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                            <img
                                                                src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                                alt="Đầm suông đuôi cá cổ yếm" />
                                                            <div className="kk-size hidden-xs hidden-sm">
                                                                <div className="size">
                                                                    <span className="pull-left">Size</span>
                                                                    <div className="pull-right">
                                                                        <ul>
                                                                            <li>
                                                                                S
                                                                            </li>
                                                                            <li>
                                                                                M
                                                                            </li>
                                                                            <li>
                                                                                L
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                    suông đuôi cá cổ yếm <span
                                                                        className="f12">HL24-01</span></a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-position="2" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <img className=""
                                                             src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                             alt="Đầm suông đuôi cá cổ yếm" />
                                                        <a className="gallery"
                                                           href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                            <img
                                                                src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                                alt="Đầm suông đuôi cá cổ yếm" />
                                                            <div className="kk-size hidden-xs hidden-sm">
                                                                <div className="size">
                                                                    <span className="pull-left">Size</span>
                                                                    <div className="pull-right">
                                                                        <ul>
                                                                            <li>
                                                                                S
                                                                            </li>
                                                                            <li>
                                                                                M
                                                                            </li>
                                                                            <li>
                                                                                L
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                    suông đuôi cá cổ yếm <span
                                                                        className="f12">HL24-01</span></a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-position="3" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <img className=""
                                                             src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                             alt="Đầm suông đuôi cá cổ yếm" />
                                                        <a className="gallery"
                                                           href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                            <img
                                                                src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                                alt="Đầm suông đuôi cá cổ yếm" />
                                                            <div className="kk-size hidden-xs hidden-sm">
                                                                <div className="size">
                                                                    <span className="pull-left">Size</span>
                                                                    <div className="pull-right">
                                                                        <ul>
                                                                            <li>
                                                                                S
                                                                            </li>
                                                                            <li>
                                                                                M
                                                                            </li>
                                                                            <li>
                                                                                L
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                    suông đuôi cá cổ yếm <span
                                                                        className="f12">HL24-01</span></a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-position="4" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <img className=""
                                                             src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                             alt="Đầm suông đuôi cá cổ yếm" />
                                                        <a className="gallery"
                                                           href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                            <img
                                                                src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                                alt="Đầm suông đuôi cá cổ yếm" />
                                                            <div className="kk-size hidden-xs hidden-sm">
                                                                <div className="size">
                                                                    <span className="pull-left">Size</span>
                                                                    <div className="pull-right">
                                                                        <ul>
                                                                            <li>
                                                                                S
                                                                            </li>
                                                                            <li>
                                                                                M
                                                                            </li>
                                                                            <li>
                                                                                L
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                    suông đuôi cá cổ yếm <span
                                                                        className="f12">HL24-01</span></a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-slick">
                                            <div data-position="5" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <img className=""
                                                             src="https://cdn.kkfashion.vn/21866-large_default/ao-so-mi-nu-cong-so-co-phoi-no-tay-dai-asm13-10.jpg"
                                                             alt="Đầm suông đuôi cá cổ yếm" />
                                                        <a className="gallery"
                                                           href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                            <img
                                                                src="https://cdn.kkfashion.vn/21866-large_default/ao-so-mi-nu-cong-so-co-phoi-no-tay-dai-asm13-10.jpg"
                                                                alt="Đầm suông đuôi cá cổ yếm" />
                                                            <div className="kk-size hidden-xs hidden-sm">
                                                                <div className="size">
                                                                    <span className="pull-left">Size</span>
                                                                    <div className="pull-right">
                                                                        <ul>
                                                                            <li>
                                                                                S
                                                                            </li>
                                                                            <li>
                                                                                M
                                                                            </li>
                                                                            <li>
                                                                                L
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                    suông đuôi cá cổ yếm <span
                                                                        className="f12">HL24-01</span></a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="block block-viewed mgt50">
                    <section className="featured-products clearfix mt-3">
                        <div className="container">
                            <div className="block-heading">
                                <h4 className="text-center fontutm block-title">Sản phẩm đã xem</h4>
                                <div className="block-img-heading text-center"><img src="./image/icon-heading.png" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="latest-block-list ">
                            <div className="container block-list">
                                <div className="row">
                                    <div className="element-grid slider-slick">
                                        <div className="item-slick">
                                            <div data-position="1" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <img className=""
                                                             src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                             alt="Đầm suông đuôi cá cổ yếm" />
                                                        <a className="gallery"
                                                           href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                            <img
                                                                src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                                alt="Đầm suông đuôi cá cổ yếm" />
                                                            <div className="kk-size hidden-xs hidden-sm">
                                                                <div className="size">
                                                                    <span className="pull-left">Size</span>
                                                                    <div className="pull-right">
                                                                        <ul>
                                                                            <li>
                                                                                S
                                                                            </li>
                                                                            <li>
                                                                                M
                                                                            </li>
                                                                            <li>
                                                                                L
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                    suông đuôi cá cổ yếm <span
                                                                        className="f12">HL24-01</span></a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-position="2" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <img className=""
                                                             src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                             alt="Đầm suông đuôi cá cổ yếm" />
                                                        <a className="gallery"
                                                           href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                            <img
                                                                src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                                alt="Đầm suông đuôi cá cổ yếm" />
                                                            <div className="kk-size hidden-xs hidden-sm">
                                                                <div className="size">
                                                                    <span className="pull-left">Size</span>
                                                                    <div className="pull-right">
                                                                        <ul>
                                                                            <li>
                                                                                S
                                                                            </li>
                                                                            <li>
                                                                                M
                                                                            </li>
                                                                            <li>
                                                                                L
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                    suông đuôi cá cổ yếm <span
                                                                        className="f12">HL24-01</span></a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-position="3" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <img className=""
                                                             src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                             alt="Đầm suông đuôi cá cổ yếm" />
                                                        <a className="gallery"
                                                           href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                            <img
                                                                src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                                alt="Đầm suông đuôi cá cổ yếm" />
                                                            <div className="kk-size hidden-xs hidden-sm">
                                                                <div className="size">
                                                                    <span className="pull-left">Size</span>
                                                                    <div className="pull-right">
                                                                        <ul>
                                                                            <li>
                                                                                S
                                                                            </li>
                                                                            <li>
                                                                                M
                                                                            </li>
                                                                            <li>
                                                                                L
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                    suông đuôi cá cổ yếm <span
                                                                        className="f12">HL24-01</span></a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-position="4" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <img className=""
                                                             src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                             alt="Đầm suông đuôi cá cổ yếm" />
                                                        <a className="gallery"
                                                           href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                            <img
                                                                src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                                alt="Đầm suông đuôi cá cổ yếm" />
                                                            <div className="kk-size hidden-xs hidden-sm">
                                                                <div className="size">
                                                                    <span className="pull-left">Size</span>
                                                                    <div className="pull-right">
                                                                        <ul>
                                                                            <li>
                                                                                S
                                                                            </li>
                                                                            <li>
                                                                                M
                                                                            </li>
                                                                            <li>
                                                                                L
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                    suông đuôi cá cổ yếm <span
                                                                        className="f12">HL24-01</span></a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-slick">
                                            <div data-position="5" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <img className=""
                                                             src="https://cdn.kkfashion.vn/21866-large_default/ao-so-mi-nu-cong-so-co-phoi-no-tay-dai-asm13-10.jpg"
                                                             alt="Đầm suông đuôi cá cổ yếm" />
                                                        <a className="gallery"
                                                           href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                            <img
                                                                src="https://cdn.kkfashion.vn/21866-large_default/ao-so-mi-nu-cong-so-co-phoi-no-tay-dai-asm13-10.jpg"
                                                                alt="Đầm suông đuôi cá cổ yếm" />
                                                            <div className="kk-size hidden-xs hidden-sm">
                                                                <div className="size">
                                                                    <span className="pull-left">Size</span>
                                                                    <div className="pull-right">
                                                                        <ul>
                                                                            <li>
                                                                                S
                                                                            </li>
                                                                            <li>
                                                                                M
                                                                            </li>
                                                                            <li>
                                                                                L
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div className="product-content">
                                                        <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                        </div>
                                                        <div className="item-top">
                                                            <h3 className="product-title text-left">
                                                                <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                                    suông đuôi cá cổ yếm <span
                                                                        className="f12">HL24-01</span></a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="block pfeatures">
                <div className="container">
                    <div className="block-heading">
                        <h2 className="text-center fontutm block-title"><a href="https://www.kkfashion.vn/vay-dam-cong-so">Sản
                            phẩm nổi bật</a></h2>
                        <div className="block-img-heading text-center"><img src="./image/icon-heading.png" alt=""/></div>
                    </div>
                </div>
                <div className="latest-block-list latest-home-block-list">
                    <div className="container block-list">
                        <div className="row">
                            <div className="element-grid slider-slick">
                                <div className="item-slick">
                                    <div data-position="1" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                        <div className="product-item">
                                            <div className="product-thumb">
                                                <img className=""
                                                     src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                     alt="Đầm suông đuôi cá cổ yếm"/>
                                                <a className="gallery"
                                                   href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                    <img
                                                        src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                        alt="Đầm suông đuôi cá cổ yếm"/>
                                                    <div className="kk-size hidden-xs hidden-sm">
                                                        <div className="size">
                                                            <span className="pull-left">Size</span>
                                                            <div className="pull-right">
                                                                <ul>
                                                                    <li>
                                                                        S
                                                                    </li>
                                                                    <li>
                                                                        M
                                                                    </li>
                                                                    <li>
                                                                        L
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="product-content">
                                                <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                </div>
                                                <div className="item-top">
                                                    <h3 className="product-title text-left">
                                                        <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                            suông đuôi cá cổ yếm <span className="f12">HL24-01</span></a>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-position="2" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                        <div className="product-item">
                                            <div className="product-thumb">
                                                <img className=""
                                                     src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                     alt="Đầm suông đuôi cá cổ yếm"/>
                                                <a className="gallery"
                                                   href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                    <img
                                                        src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                        alt="Đầm suông đuôi cá cổ yếm"/>
                                                    <div className="kk-size hidden-xs hidden-sm">
                                                        <div className="size">
                                                            <span className="pull-left">Size</span>
                                                            <div className="pull-right">
                                                                <ul>
                                                                    <li>
                                                                        S
                                                                    </li>
                                                                    <li>
                                                                        M
                                                                    </li>
                                                                    <li>
                                                                        L
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="product-content">
                                                <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                </div>
                                                <div className="item-top">
                                                    <h3 className="product-title text-left">
                                                        <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                            suông đuôi cá cổ yếm <span className="f12">HL24-01</span></a>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-position="3" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                        <div className="product-item">
                                            <div className="product-thumb">
                                                <img className=""
                                                     src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                     alt="Đầm suông đuôi cá cổ yếm"/>
                                                <a className="gallery"
                                                   href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                    <img
                                                        src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                        alt="Đầm suông đuôi cá cổ yếm"/>
                                                    <div className="kk-size hidden-xs hidden-sm">
                                                        <div className="size">
                                                            <span className="pull-left">Size</span>
                                                            <div className="pull-right">
                                                                <ul>
                                                                    <li>
                                                                        S
                                                                    </li>
                                                                    <li>
                                                                        M
                                                                    </li>
                                                                    <li>
                                                                        L
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="product-content">
                                                <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                </div>
                                                <div className="item-top">
                                                    <h3 className="product-title text-left">
                                                        <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                            suông đuôi cá cổ yếm <span className="f12">HL24-01</span></a>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-position="4" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                        <div className="product-item">
                                            <div className="product-thumb">
                                                <img className=""
                                                     src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                     alt="Đầm suông đuôi cá cổ yếm"/>
                                                <a className="gallery"
                                                   href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                    <img
                                                        src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                        alt="Đầm suông đuôi cá cổ yếm"/>
                                                    <div className="kk-size hidden-xs hidden-sm">
                                                        <div className="size">
                                                            <span className="pull-left">Size</span>
                                                            <div className="pull-right">
                                                                <ul>
                                                                    <li>
                                                                        S
                                                                    </li>
                                                                    <li>
                                                                        M
                                                                    </li>
                                                                    <li>
                                                                        L
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="product-content">
                                                <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                </div>
                                                <div className="item-top">
                                                    <h3 className="product-title text-left">
                                                        <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                            suông đuôi cá cổ yếm <span className="f12">HL24-01</span></a>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="item-slick">
                                    <div data-position="5" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                        <div className="product-item">
                                            <div className="product-thumb">
                                                <img className=""
                                                     src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                     alt="Đầm suông đuôi cá cổ yếm"/>
                                                <a className="gallery"
                                                   href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                    <img
                                                        src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                        alt="Đầm suông đuôi cá cổ yếm"/>
                                                    <div className="kk-size hidden-xs hidden-sm">
                                                        <div className="size">
                                                            <span className="pull-left">Size</span>
                                                            <div className="pull-right">
                                                                <ul>
                                                                    <li>
                                                                        S
                                                                    </li>
                                                                    <li>
                                                                        M
                                                                    </li>
                                                                    <li>
                                                                        L
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="product-content">
                                                <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                </div>
                                                <div className="item-top">
                                                    <h3 className="product-title text-left">
                                                        <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                            suông đuôi cá cổ yếm <span className="f12">HL24-01</span></a>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-position="6" className="tb-products-grid col-md-3 col-sm-6 col-xs-6 ">
                                        <div className="product-item">
                                            <div className="product-thumb">
                                                <img className=""
                                                     src="https://cdn.kkfashion.vn/21846-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                     alt="Đầm suông đuôi cá cổ yếm"/>
                                                <a className="gallery"
                                                   href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">
                                                    <img
                                                        src="https://cdn.kkfashion.vn/21847-large_default/dam-suong-duoi-ca-co-yem-hl24-01.jpg"
                                                        alt="Đầm suông đuôi cá cổ yếm"/>
                                                    <div className="kk-size hidden-xs hidden-sm">
                                                        <div className="size">
                                                            <span className="pull-left">Size</span>
                                                            <div className="pull-right">
                                                                <ul>
                                                                    <li>
                                                                        S
                                                                    </li>
                                                                    <li>
                                                                        M
                                                                    </li>
                                                                    <li>
                                                                        L
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="product-content">
                                                <div className="item-top">
                                                <span className="price">
                                                    <span>490.000 ₫</span>
                                                 </span>
                                                </div>
                                                <div className="item-top">
                                                    <h3 className="product-title text-left">
                                                        <a href="https://www.kkfashion.vn/dam-suong-duoi-ca-co-yem-hl24-01">Đầm
                                                            suông đuôi cá cổ yếm <span className="f12">HL24-01</span></a>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="pswp__bg"></div>
                <div className="pswp__scroll-wrap">
                    <div className="pswp__container">
                        <div className="pswp__item"></div>
                        <div className="pswp__item"></div>
                        <div className="pswp__item"></div>
                    </div>
                    <div className="pswp__ui pswp__ui--hidden">
                        <div className="pswp__top-bar">
                            <div className="pswp__counter"></div>
                            <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
                            <button className="pswp__button pswp__button--share" title="Share"></button>
                            <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                            <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                            <div className="pswp__preloader">
                                <div className="pswp__preloader__icn">
                                    <div className="pswp__preloader__cut">
                                        <div className="pswp__preloader__donut"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                            <div className="pswp__share-tooltip"></div>
                        </div>
                        <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                        <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                        <div className="pswp__caption">
                            <div className="pswp__caption__center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
