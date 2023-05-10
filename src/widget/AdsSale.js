import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../store/auth";
import {Nav} from "react-bootstrap";
import settingService from "../services/settingService";
const AdsSale = (props) => {
    const id = "BANNER_SALES";
    const [adsSale,setAdsSale] = useState([])

    useEffect(() => {
        settingService.getAds(id).then((res) => {
            setAdsSale(res.data)
            }
        );
    }, [id]);
    return (
        <>
            <div className="block lookbook">
                <div className="container">
                    <div className="block-heading">
                        <h2 className="text-center fontutm block-title">
                            <a href="https://www.kkfashion.vn/lookbook">Lookbook</a>
                        </h2>
                        <div className="block-img-heading text-center">
                            <img src="https://www.kkfashion.vn/themes/kkfashion/assets/img//icon-heading.png" alt="" /></div>
                    </div>
                </div>
                <div className="latest-block-list latest-home-block-list">
                    <div className="container block-list">
                        <div className="row">
                            {
                                adsSale.map((aAds, idx) => (
                                    <div className="col-sm-4 col-xs-6">
                                        <div className="lookbook-item">
                                            <Link className="hover-img" to="#">
                                                <img alt="HAVE LOVE WILL TRAVEL"
                                                     src={`https://shop.decor.tichhop.pro/storage${aAds.image}`} />
                                            </Link>
                                            <div className="lookbook-content">
                                                <div className="item-top">
                                                    <h3 className="item-title text-center">
                                                        <Link to="#">{aAds.title}</Link>
                                                    </h3>
                                                    <p className="text-center">#lookbook</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AdsSale;
