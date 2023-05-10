import React, {useEffect, useState} from "react";
import categoryService from "../services/categoryService";
import {Link, useParams} from "react-router-dom";
import {Image} from "react-bootstrap";
import blogService from "../services/blogService";
const BlogCategory = (props) => {
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

        blogService.list(category,page).then((res) => {
            setItems(res.items_prd.data);
            setCategoryProduct(res.currentCategory);
            setTotalPages(res.items_prd.last_page);
            setCurrentPage(res.items_prd.current_page);
        });
    }, [category,page]);

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

                            {/*List san pham*/}
                            <section id="products">
                                <div className="products-list jws-masonry">
                                    <div className="grid-sizer size-3"></div>

                                    <div id="js-product-list">

                                        <div className="latest-block-list">
                                            <div className="container block-list block-list-add">
                                                <div className="element-grid row">
                                                    {
                                                        items.map((ablog, idx) => (
                                                            <article className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12" key={idx}>
                                                                <div className="blog_post_content_top">
                                                                    <div className="bog-image post_thumbnail">
                                                                        <Link className="hover-img"
                                                                              to={`/${ablog.groups[0].slug}/${ablog.slug}`}>
                                                                            <Image
                                                                                src={`https://shop.decor.tichhop.pro/storage${ablog.image}`}
                                                                                alt={ablog.title} />
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <div className="content-blog">
                                                                    <div className="title">
                                                                        <h3><Link
                                                                            to={`/${ablog.groups[0].slug}/${ablog.slug}`}>
                                                                            {ablog.title}</Link>
                                                                        </h3>
                                                                    </div>

                                                                </div>
                                                            </article>
                                                        ))
                                                    }


                                                </div>
                                            </div>
                                        </div>
                                        <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
                                    </div>

                                    <div id="js-product-list-bottom"></div>
                                </div>
                            </section>

                          
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogCategory;
