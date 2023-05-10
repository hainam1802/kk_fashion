import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../store/auth";
import {Image, Nav} from "react-bootstrap";
import settingService from "../services/settingService";
import blogService from "../services/blogService";
const Blog = (props) => {
    const [blogs,setBlogs] = useState([])

    useEffect(() => {
        blogService.getIndex().then((res) => {
            console.log(res.data.data)
            setBlogs(res.data.data)
            }
        );
    }, []);
    return (
        <>
            <div className="block pb-100">
                <div className="container">
                    <div className="block-heading">
                        <h2 className="text-center fontutm block-title">
                            <Link to="/blog">
                                Blog
                            </Link>
                        </h2>
                        <div className="block-img-heading text-center">
                            <img src="https://www.kkfashion.vn/themes/kkfashion/assets/img//icon-heading.png" alt="" /></div>
                    </div>
                </div>
                <div className="latest-block-list">
                    <div className="container block-list block-list-add">
                        <div className="element-grid row">
                            {
                                blogs.map((ablog, idx) => (
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
            </div>

        </>
    );
};

export default Blog;
