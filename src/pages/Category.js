import React, {useEffect, useState} from "react";
import categoryService from "../services/categoryService";
import {Link, useParams} from "react-router-dom";
import {Image} from "react-bootstrap";
const Category = (props) => {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {

        categoryService.list(category,page,id,title,price).then((res) => {
            setItems(res.items_prd.data);
            setCategoryProduct(res.data);
            setTotalPages(res.items_prd.last_page);
            setCurrentPage(res.items_prd.current_page);
        });
    }, [category,page,id,title,price]);

    function handlePageChange(newPage) {
        setPage(newPage);
    }

    function Pagination({ totalPages, currentPage, onPageChange }) {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={i === currentPage ? 'active' : ''}>
                    <a href="#" onClick={() => onPageChange(i)}>
                        {i}
                    </a>
                </li>
            );
        }

        return (
            <nav className="pagination-number">
                <div className="text-center mgt20">
                    <ul className="page-list clearfix text-sm-center page-numbers">
                        {pages}
                    </ul>
                </div>
            </nav>
        )
    }
    return (
        <>
            {/*breadcrums*/}
            <div className="page-header single-breadcrums hidden-sm-down" style={{paddingTop: "40px"}} >
                <div className="page-breadcrumbs">
                    <nav data-depth="4" className="breadcrumbs">
                        <ol itemScope="" itemType="http://schema.org/BreadcrumbList">
                            <li itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem">
                                <Link itemProp="item" to="https://www.kkfashion.vn/">
                                    <span itemProp="name">Trang chủ</span>
                                </Link>
                                <meta itemProp="position" content="1" />
                                    <span className="sep">/</span>
                            </li>
                            <li itemProp="itemListElement" itemScope="" itemType="http://schema.org/ListItem">
                                <Link itemProp="item" href="#">
                                    <span itemProp="name">{categoryProduct.title}</span>
                                </Link>
                                <meta itemProp="position" content="2" />
                                    <span className="sep">/</span>
                            </li>

                        </ol>
                    </nav>
                </div>
            </div>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="product-items col-sm-12">
                            {/*Tên danh mục*/}
                            <div className="text-center headTitle">
                                <h1 className="category-title">{categoryProduct.title}</h1>
                            </div>
                            <section className="form-fields">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-control-label ">
                                                Giá
                                            </label>
                                            <select className="form-control "
                                                    name="price"
                                                    value={price}
                                                    onChange={(e) => {
                                                        // eslint-disable-next-line no-unused-expressions
                                                        setPrice(e.target.value),
                                                            setPage(1)
                                                        }
                                                    }

                                            >
                                                <option value="">Chọn mức giá</option>
                                                <option
                                                    value="0-500000">
                                                    Dưới 500.000
                                                </option>
                                                <option value="500000-1000000" >
                                                   Từ 500.000 đến 1.000.000
                                                </option>
                                                <option value="1000000-1500000" >
                                                    Từ 1.000.000 đến 1.500.000
                                                </option>
                                                <option value="1500000-2000000" >
                                                    Từ 1.500.000 đến 2.000.000
                                                </option>
                                                <option value="2000000-2500000" >
                                                    Từ 2.000.000 đến 2.500.000
                                                </option>

                                                <option value="2500000-3000000" >
                                                    Từ 2.500.000 đến 3.000.000
                                                </option>

                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-control-label ">
                                                Tên sản phẩm
                                            </label>
                                            <input className="form-control"
                                                   name="title"
                                                   type="text"
                                                   value={title}
                                                   placeholder="Nhập tên sản phẩm"
                                                   onChange={(e) =>
                                                       {
                                                           // eslint-disable-next-line no-unused-expressions
                                                           setTitle(e.target.value),
                                                           setPage(1)
                                                       }
                                                   }

                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-control-label ">
                                                Mã sản phẩm
                                            </label>
                                            <input className="form-control"
                                                   name="id"
                                                   type="text"
                                                   value={id}
                                                   placeholder="Nhập mã sản phẩm"
                                                   onChange={(e) =>
                                                       {
                                                           // eslint-disable-next-line no-unused-expressions
                                                           setId(e.target.value),
                                                           setPage(1)
                                                       }
                                                    }
                                            />
                                        </div>
                                    </div>

                                </div>


                            </section>
                            {/*List san pham*/}
                            <section id="products">
                                <div className="products-list jws-masonry">
                                    <div className="grid-sizer size-3"></div>

                                    <div id="js-product-list">
                                        <div className="products">
                                            { items.map((item, idx) => (
                                                <div className="tb-products-grid col-md-3 col-sm-6 col-xs-6">
                                                    <div className="product-item">
                                                        <div className="product-thumb">
                                                            <Image
                                                                sizes="(min-width: 64rem) 33.33vw, (min-width: 0rem) 50vw"
                                                                src={`https://shop.decor.tichhop.pro/storage${item.image}`}

                                                                alt={item.title}
                                                            />
                                                            <Link className="gallery"
                                                               to={`/${categoryProduct.slug}/${item.slug}`}>
                                                                <Image
                                                                    sizes="(min-width: 64rem) 33.33vw, (min-width: 0rem) 50vw"
                                                                    src={`https://shop.decor.tichhop.pro/storage${item.image}`}
                                                                    alt="Áo kiểu cổ tròn sát nách dáng rộng"
                                                                />
                                                                {/*<div className="kk-size hidden-xs hidden-sm">*/}
                                                                {/*    <div className="size">*/}
                                                                {/*        <span className="pull-left">Size</span>*/}
                                                                {/*        <div className="pull-right">*/}
                                                                {/*            <ul>*/}
                                                                {/*                <li>*/}
                                                                {/*                    S*/}
                                                                {/*                </li>*/}
                                                                {/*                <li>*/}
                                                                {/*                    M*/}
                                                                {/*                </li>*/}
                                                                {/*                <li>*/}
                                                                {/*                    L*/}
                                                                {/*                </li>*/}
                                                                {/*            </ul>*/}
                                                                {/*        </div>*/}
                                                                {/*    </div>*/}
                                                                {/*</div>*/}
                                                            </Link>
                                                        </div>
                                                        <div className="product-content">
                                                            <div className="item-top">
                                                                <p className="code-title fontutm"><Link
                                                                    to={`/${categoryProduct.slug}/${item.slug}`}>>#{item.id}</Link>
                                                                </p>
                                                                <span className="price">
                                                                    <span>{Intl.NumberFormat().format(item.price)} ₫</span>
                                                                </span>
                                                            </div>
                                                            <div className="item-top">
                                                                <h3 className="product-title text-left">
                                                                    <Link  to={`/${categoryProduct.slug}/${item.slug}`}>>Áo
                                                                        {item.title}
                                                                    </Link>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            )}

                                        </div>
                                        <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
                                    </div>

                                    <div id="js-product-list-bottom"></div>
                                </div>
                            </section>
                            {/*Mô tả*/}
                            <div className="category-description text-muted">
                                <div className="description">
                                    <p className="MsoNormal">
                                        <strong>Áo</strong> - Một trong những item thời trang không thể thiếu trong tủ
                                        đồ của hầu hết tất cả các cô gái, dù nàng đang ở độ tuổi nào hay theo đuổi phong
                                        cách gì đi chăng nữa. Vậy nên, trong những bộ sưu
                                        tập thời trang của <a href="https://www.kkfashion.vn/" target="_blank"
                                                              rel="nofollow noreferrer noopener">K&amp;K Fashion</a> các
                                        NTK luôn cập nhật thật đa dạng các mẫu mã, màu sắc, kiểu dáng để nàng có thể dễ
                                        dàng mix match với nhiều món đồ khác nhau. Sản phẩm áo của K&amp;K Fashion có
                                        thể tự tin đáp ứng đủ mọi tiêu chí của nàng từ mẫu mã đến chất lượng và cả giá
                                        thành phải chăng, vô cùng hợp lý.
                                    </p>
                                    <p className="MsoNormal"></p>
                                    <p className="MsoNormal">
                                        - <strong>Áo sơ mi</strong>: Kiểu dáng thanh lịch và nhã nhặn vô cùng thích hợp
                                        để đi làm, đi học, không chỉ thế với một chiếc áo sơ mi nữ basic nàng có lại có
                                        thể kết hợp cùng nhiều loại trang phục khác nhau
                                        như: quần, chân váy, hay khoác ngoài… Hợp thời trang và không bao giờ lỗi mốt
                                        chính là những ưu điểm để miêu tả kiểu áo sơ mi huyền thoại đi cùng năm tháng
                                        này. Kiểu sơ mi nữ Hàn Quốc với gam màu nhẹ nhàng, thanh
                                        lịch luôn được chị em yêu thích nhất, bên cạnh đó, sơ mi họa tiết ấn tượng và
                                        nổi bật luôn giúp nàng bắt trọn mọi ánh nhìn. Khi chọn áo sơ mi hãy quan tâm đến
                                        việc phối hợp màu sắc, họa tiết đối lập giữa phần
                                        trên và phần chân váy hoặc quần để set đồ luôn thật đặc sắc.
                                    </p>
                                    <p className="MsoNormal">
                                        - <strong>Áo kiểu</strong>: Nhàm chán với áo sơ mi nữ đơn điệu, nàng có thể chọn
                                        cho mình những chiếc áo kiểu đẹp như: áo blouse, áo babydoll, áo kiểu hàn quốc,
                                        áo sát nách, áo kiểu công sở ... Để thăng hạng
                                        phong cách chắc chắn sẽ không bỏ qua những chiếc áo kiểu nữ nổi bật với các
                                        thiết kế độc lạ, phá cách thu hút mọi ánh nhìn xung quanh.
                                    </p>
                                    <p className="MsoNormal">
                                        - <strong>Áo cropTop</strong>: Nhắc đến các mẫu kiểu áo đẹp được vô vàn các cô
                                        gái yêu mến, thì thật thiếu sót nếu bỏ qua croptop – mẫu áo ngắn mát mẻ, năng
                                        động mà vô cùng nữ tính, khoe được các đường cong mềm
                                        mại của cơ thể.
                                    </p>
                                    <p className="MsoNormal">
                                        - <strong>Áo peplum</strong>: Một thiết kế áo kiểu công sở đẹp hack dáng cho
                                        nàng, dù nàng béo hay nàng gầy, với item này nàng nào diện lên cũng xinh ngất.
                                        Thiết kế che khuyết điểm bụng mỡ eo to là điểm nhấn giúp
                                        kiểu áo peplum luôn ghi điểm và luôn được săn đón suốt nhiều năm qua.
                                    </p>
                                    <p className="MsoNormal">
                                        - <strong>Áo thun</strong>: Một trong những must have item, với chất liệu thoáng
                                        mát, thoải mái, dễ dàng phối đồ với nhiều phong cách đa dạng khác nhau, lại có
                                        thể ứng dụng được trong nhiều trường hợp như: đi
                                        làm, đi chơi mà vẫn mang lại cảm giác thoải mái cho người diện,đây là một trong
                                        vô vàn lý do vì sao mọi cô nàng đều sở hữu ít nhất một chiếc áo thun cho riêng
                                        bản thân mình.
                                    </p>
                                    <p className="MsoNormal">
                                        Ở mỗi mùa thời trang, áo sơ mi, áo kiểu công sở... tại K&amp;K Fashion lại được
                                        update, cải tiến về kiểu dáng, chất liệu, màu sắc và họa tiết để phù hợp hơn với
                                        nhu cầu phối đồ đi làm, đi chơi và mặc đẹp của các
                                        quý cô.
                                    </p>
                                    <p className="MsoNormal">Đừng đóng mình trong những bộ trang phục cứng nhắc và nhàm
                                        chán của quá khứ. Cùng trổ tài phối đồ thật thời trang và phong cách với những
                                        mẫu áo mới từ K&amp;K Fashion nàng nhé!</p>
                                </div>
                                <div className="see-more hidden">
                                    <button type="button" name="see-more">Xem thêm</button>
                                </div>
                            </div>
                            {/*Bài viết nổi bật*/}
                            <div className="block pb-100">
                                <div className="container">
                                    <div className="block-heading">
                                        <h2 className="text-center fontutm block-title">
                                            <a href="https://www.kkfashion.vn/blog"> Blog </a>
                                        </h2>
                                        <div className="block-img-heading text-center"><img
                                            src="/themes/kkfashion/assets/img//icon-heading.png" alt=""/></div>
                                    </div>
                                </div>
                                <div className="latest-block-list">
                                    <div className="container block-list">
                                        <div className="element-grid related-post-slick row">
                                            <article
                                                className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <div className="blog_post_content_top">
                                                    <div className="bog-image post_thumbnail">
                                                        <a className="hover-img"
                                                           href="https://www.kkfashion.vn/blog/diem-danh-mau-ao-kieu-dep-tuoi-30-sang-trong-quy-phai">
                                                            <img
                                                                className="lozad"
                                                                data-src="https://cdn.kkfashion.vn/blog-img/home_default-sl1-175329.jpg"
                                                                src="/img/transparent.png"
                                                                width="370"
                                                                height="240"
                                                                alt="Điểm danh mẫu áo kiểu đẹp tuổi 30 sang trọng, quý phái"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="content-blog">
                                                    <div className="title">
                                                        <h3><a
                                                            href="https://www.kkfashion.vn/blog/diem-danh-mau-ao-kieu-dep-tuoi-30-sang-trong-quy-phai">Điểm
                                                            danh mẫu áo kiểu đẹp tuổi 30 sang trọng, quý phái</a></h3>
                                                    </div>
                                                    <div className="blog-innfo">
                                                        Áo kiểu đẹp luôn là sự lựa chọn tối ưu nhất đối với những quý cô
                                                        tuổi 30 vừa thanh lịch lại sang trọng. Cùng K&K Fashion tìm hiểu
                                                        ...
                                                        <a className="readmore"
                                                           href="https://www.kkfashion.vn/blog/diem-danh-mau-ao-kieu-dep-tuoi-30-sang-trong-quy-phai">Xem
                                                            thêm</a>
                                                    </div>
                                                </div>
                                            </article>
                                            <article
                                                className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <div className="blog_post_content_top">
                                                    <div className="bog-image post_thumbnail">
                                                        <a className="hover-img"
                                                           href="https://www.kkfashion.vn/blog/menh-kim-hop-mau-gi-mang-do-gi-cho-thoi-trang">
                                                            <img
                                                                className="lozad"
                                                                data-src="https://cdn.kkfashion.vn/blog-img/home_default-6-175328.jpg"
                                                                src="/img/transparent.png"
                                                                width="370"
                                                                height="240"
                                                                alt="Mệnh kim hợp màu gì? Mang đồ gì cho thời trang?"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="content-blog">
                                                    <div className="title">
                                                        <h3><a
                                                            href="https://www.kkfashion.vn/blog/menh-kim-hop-mau-gi-mang-do-gi-cho-thoi-trang">Mệnh
                                                            kim hợp màu gì? Mang đồ gì cho thời trang?</a></h3>
                                                    </div>
                                                    <div className="blog-innfo">
                                                        K&K Fashion sẽ giải đáp thắc mắc của các nàng về mệnh kim hợp
                                                        màu gì giúp các nàng mệnh kim chọn được trang phục vừa thời
                                                        trang, ...
                                                        <a className="readmore"
                                                           href="https://www.kkfashion.vn/blog/menh-kim-hop-mau-gi-mang-do-gi-cho-thoi-trang">Xem
                                                            thêm</a>
                                                    </div>
                                                </div>
                                            </article>
                                            <article
                                                className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <div className="blog_post_content_top">
                                                    <div className="bog-image post_thumbnail">
                                                        <a className="hover-img"
                                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">
                                                            <img
                                                                className="lozad"
                                                                data-src="https://cdn.kkfashion.vn/blog-img/home_default-1200x628-copy-175326.jpg"
                                                                src="/img/transparent.png"
                                                                width="370"
                                                                height="240"
                                                                alt="Bộ sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="content-blog">
                                                    <div className="title">
                                                        <h3>
                                                            <a href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">
                                                                Bộ sưu tập tháng 5 “Soak Up the Sun” - trang phục mới
                                                                cho những ngày nắng hè
                                                            </a>
                                                        </h3>
                                                    </div>
                                                    <div className="blog-innfo">
                                                        BST “Soak Up the Sun” của K&K Fashion sẽ mang nàng đến một khung
                                                        cảnh thiên nhiên rộng lớn hơn, bao la hơn cùng những thiết kế
                                                        bay ...
                                                        <a className="readmore"
                                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Xem
                                                            thêm</a>
                                                    </div>
                                                </div>
                                            </article>
                                            <article
                                                className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <div className="blog_post_content_top">
                                                    <div className="bog-image post_thumbnail">
                                                        <a className="hover-img"
                                                           href="https://www.kkfashion.vn/blog/kham-pha-dam-du-tiec-sang-trong-quy-phai-cua-kk-fashion">
                                                            <img
                                                                className="lozad"
                                                                data-src="https://cdn.kkfashion.vn/blog-img/home_default-22-7-175325.jpg"
                                                                src="/img/transparent.png"
                                                                width="370"
                                                                height="240"
                                                                alt="Khám phá đầm dự tiệc sang trọng quý phái của K&amp;K Fashion"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="content-blog">
                                                    <div className="title">
                                                        <h3><a
                                                            href="https://www.kkfashion.vn/blog/kham-pha-dam-du-tiec-sang-trong-quy-phai-cua-kk-fashion">Khám
                                                            phá đầm dự tiệc sang trọng quý phái của K&amp;K Fashion</a>
                                                        </h3>
                                                    </div>
                                                    <div className="blog-innfo">
                                                        Nếu các quý cô vẫn đang không biết mặc gì vào bữa tiệc sắp tới
                                                        thì tham khảo ngay bài viết của K&K Fashion để tìm ra đầm dự
                                                        tiệc ...
                                                        <a className="readmore"
                                                           href="https://www.kkfashion.vn/blog/kham-pha-dam-du-tiec-sang-trong-quy-phai-cua-kk-fashion">Xem
                                                            thêm</a>
                                                    </div>
                                                </div>
                                            </article>
                                            <article
                                                className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <div className="blog_post_content_top">
                                                    <div className="bog-image post_thumbnail">
                                                        <a className="hover-img"
                                                           href="https://www.kkfashion.vn/blog/tips-chon-vay-di-bien-cho-nguoi-bap-tay-to">
                                                            <img
                                                                className="lozad"
                                                                data-src="https://cdn.kkfashion.vn/blog-img/home_default-tips-chon-vay-dam-di-bien-dep-cho-nguoi-bap-tay-to-175324.jpg"
                                                                src="/img/transparent.png"
                                                                width="370"
                                                                height="240"
                                                                alt="Tips chọn váy đi biển cho người bắp tay to"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="content-blog">
                                                    <div className="title">
                                                        <h3><a
                                                            href="https://www.kkfashion.vn/blog/tips-chon-vay-di-bien-cho-nguoi-bap-tay-to">Tips
                                                            chọn váy đi biển cho người bắp tay to</a></h3>
                                                    </div>
                                                    <div className="blog-innfo">
                                                        Hè đến cũng là lúc các cô nàng bắp tay to không biết chọn váy đi
                                                        biển như thế nào cho phù hợp. Hãy để K&K Fashion chia sẻ cho bạn
                                                        ...
                                                        <a className="readmore"
                                                           href="https://www.kkfashion.vn/blog/tips-chon-vay-di-bien-cho-nguoi-bap-tay-to">Xem
                                                            thêm</a>
                                                    </div>
                                                </div>
                                            </article>
                                            <article
                                                className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                <div className="blog_post_content_top">
                                                    <div className="bog-image post_thumbnail">
                                                        <a className="hover-img"
                                                           href="https://www.kkfashion.vn/blog/bst-have-love-will-travel-kk-fashion-se-mang-den-nang-tinh-yeu-dac-biet-danh-cho-nhng-chuyen-di-">
                                                            <img
                                                                className="lozad"
                                                                data-src="https://cdn.kkfashion.vn/blog-img/home_default-1200x628-copy-175322.jpg"
                                                                src="/img/transparent.png"
                                                                width="370"
                                                                height="240"
                                                                alt="BST “Have Love, Will Travel” - K&amp;K Fashion sẽ mang đến nàng tình yêu đặc biệt dành cho những chuyến đi "
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="content-blog">
                                                    <div className="title">
                                                        <h3>
                                                            <a href="https://www.kkfashion.vn/blog/bst-have-love-will-travel-kk-fashion-se-mang-den-nang-tinh-yeu-dac-biet-danh-cho-nhng-chuyen-di-">
                                                                BST “Have Love, Will Travel” - K&amp;K Fashion sẽ mang
                                                                đến nàng tình yêu đặc biệt dành cho những chuyến đi
                                                            </a>
                                                        </h3>
                                                    </div>
                                                    <div className="blog-innfo">
                                                        Bộ sưu tập “Have Love, Will Travel” của K&K Fashion ra mắt với
                                                        mong muốn sẽ đồng hành cùng nàng trong suốt kỳ nghỉ lễ sắp đến,
                                                        cho ...
                                                        <a className="readmore"
                                                           href="https://www.kkfashion.vn/blog/bst-have-love-will-travel-kk-fashion-se-mang-den-nang-tinh-yeu-dac-biet-danh-cho-nhng-chuyen-di-">Xem
                                                            thêm</a>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
