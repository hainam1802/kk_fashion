import React, {useEffect, useState} from "react";
import categoryService from "../services/categoryService";
import {Link, useParams} from "react-router-dom";
import {Image} from "react-bootstrap";
import Blog from "../widget/Blog";
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
            <div className="page-header single-breadcrums hidden-sm-down" style={{marginTop: "160px"}} >
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
                                                                    <Link  to={`/${categoryProduct.slug}/${item.slug}`}>
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
                            {/*blog*/}
                            <Blog />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
