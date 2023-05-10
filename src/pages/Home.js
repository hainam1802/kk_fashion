import React from "react";
import SlideBanner from "../widget/SlideBanner";
import FlashSale from "../widget/FlashSale";
import SpecialProduct from "../widget/SpecialProduct";
import AdsSale from "../widget/AdsSale";
import Ads1 from "../widget/Ads1";
import SuggestProduct from "../widget/SuggestProduct";
const Home = (props) => {
    return (
        <>
            <SlideBanner/>
            {/*flash sale*/}
            <FlashSale />
            <SuggestProduct />
            {/*sản phẩm nổi bật*/}
            <SpecialProduct />

            {/*ADS sale*/}
            <AdsSale />

            {/*block*/}
            <Ads1 />


            {/*blog*/}
            <div className="block pb-100">
                <div className="container">
                    <div className="block-heading">
                        <h2 className="text-center fontutm block-title">
                            <a href="https://www.kkfashion.vn/blog">
                                Blog
                            </a>
                        </h2>
                        <div className="block-img-heading text-center"><img src="https://www.kkfashion.vn/themes/kkfashion/assets/img//icon-heading.png" alt="" /></div>
                    </div>
                </div>
                <div className="latest-block-list">
                    <div className="container block-list">
                        <div className="element-grid related-post-slick row">
                            <article className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="blog_post_content_top">
                                    <div className="bog-image post_thumbnail">
                                        <a className="hover-img"
                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">
                                            <img
                                                src="https://cdn.kkfashion.vn/blog-img/home_default-1200x628-copy-175326.jpg"
                                                alt="Bộ sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè" />
                                        </a>
                                    </div>
                                </div>
                                <div className="content-blog">
                                    <div className="title">
                                        <h3><a
                                            href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Bộ
                                            sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè</a>
                                        </h3>
                                    </div>
                                    <div className="blog-innfo">
                                        BST “Soak Up the Sun” của K&K Fashion sẽ mang nàng đến một khung cảnh thiên nhiên
                                        rộng lớn hơn, bao la hơn cùng những thiết kế bay ...
                                        <a className="readmore"
                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Xem
                                            thêm</a>
                                    </div>
                                </div>
                            </article>
                            <article className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="blog_post_content_top">
                                    <div className="bog-image post_thumbnail">
                                        <a className="hover-img"
                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">
                                            <img
                                                src="https://cdn.kkfashion.vn/blog-img/home_default-1200x628-copy-175326.jpg"
                                                alt="Bộ sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè" />
                                        </a>
                                    </div>
                                </div>
                                <div className="content-blog">
                                    <div className="title">
                                        <h3><a
                                            href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Bộ
                                            sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè</a>
                                        </h3>
                                    </div>
                                    <div className="blog-innfo">
                                        BST “Soak Up the Sun” của K&K Fashion sẽ mang nàng đến một khung cảnh thiên nhiên
                                        rộng lớn hơn, bao la hơn cùng những thiết kế bay ...
                                        <a className="readmore"
                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Xem
                                            thêm</a>
                                    </div>
                                </div>
                            </article>
                            <article className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="blog_post_content_top">
                                    <div className="bog-image post_thumbnail">
                                        <a className="hover-img"
                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">
                                            <img
                                                src="https://cdn.kkfashion.vn/blog-img/home_default-1200x628-copy-175326.jpg"
                                                alt="Bộ sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè" />
                                        </a>
                                    </div>
                                </div>
                                <div className="content-blog">
                                    <div className="title">
                                        <h3><a
                                            href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Bộ
                                            sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè</a>
                                        </h3>
                                    </div>
                                    <div className="blog-innfo">
                                        BST “Soak Up the Sun” của K&K Fashion sẽ mang nàng đến một khung cảnh thiên nhiên
                                        rộng lớn hơn, bao la hơn cùng những thiết kế bay ...
                                        <a className="readmore"
                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Xem
                                            thêm</a>
                                    </div>
                                </div>
                            </article>
                            <article className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="blog_post_content_top">
                                    <div className="bog-image post_thumbnail">
                                        <a className="hover-img"
                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">
                                            <img
                                                src="https://cdn.kkfashion.vn/blog-img/home_default-1200x628-copy-175326.jpg"
                                                alt="Bộ sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè" />
                                        </a>
                                    </div>
                                </div>
                                <div className="content-blog">
                                    <div className="title">
                                        <h3><a
                                            href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Bộ
                                            sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè</a>
                                        </h3>
                                    </div>
                                    <div className="blog-innfo">
                                        BST “Soak Up the Sun” của K&K Fashion sẽ mang nàng đến một khung cảnh thiên nhiên
                                        rộng lớn hơn, bao la hơn cùng những thiết kế bay ...
                                        <a className="readmore"
                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Xem
                                            thêm</a>
                                    </div>
                                </div>
                            </article>
                            <article className="blog_post post-item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div className="blog_post_content_top">
                                    <div className="bog-image post_thumbnail">
                                        <a className="hover-img"
                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">
                                            <img
                                                src="https://cdn.kkfashion.vn/blog-img/home_default-1200x628-copy-175326.jpg"
                                                alt="Bộ sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè" />
                                        </a>
                                    </div>
                                </div>
                                <div className="content-blog">
                                    <div className="title">
                                        <h3><a
                                            href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Bộ
                                            sưu tập tháng 5 “Soak Up the Sun” - trang phục mới cho những ngày nắng hè</a>
                                        </h3>
                                    </div>
                                    <div className="blog-innfo">
                                        BST “Soak Up the Sun” của K&K Fashion sẽ mang nàng đến một khung cảnh thiên nhiên
                                        rộng lớn hơn, bao la hơn cùng những thiết kế bay ...
                                        <a className="readmore"
                                           href="https://www.kkfashion.vn/blog/bo-suu-tap-thang-5-soak-up-the-sun-trang-phuc-moi-cho-nhung-ngay-nang-he">Xem
                                            thêm</a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
