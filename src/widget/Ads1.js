import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../store/auth";
import {Nav} from "react-bootstrap";
import settingService from "../services/settingService";
const Ads1 = (props) => {
    const id = "BANNER_ADS_1";
    const [ads1,setAds1] = useState([])

    useEffect(() => {
        settingService.getAds(id).then((res) => {
            setAds1(res.data)
            }
        );
    }, [id]);
    return (
        <>
            <div className="background-block">
                <div className="latest-block-list latest-home-block-list">
                    <div className="container block-list">
                        <div className="row">
                            <div className="col-md-7 text-right">
                                <div className="video-container">
                                    <div className="blance-video" data-yt-title="SOAK UP THE SUN"
                                         data-yt-url="https://www.youtube.com/embed/7p09GmbTsA8?feature=oembed&autoplay=1">
                                        <img width="100%"
                                             src={`https://shop.decor.tichhop.pro/storage${ads1[0].image}`}
                                             alt="SOAK UP THE SUN"/>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="video-content">
                                    <h2 className="fontutm">{ads1[0].title}</h2>
                                    <p>{ ads1[0].content } </p>
                                </div>
                            </div>
                            <div className="cleafix"></div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Ads1;
