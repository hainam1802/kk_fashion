import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import settingService from "../services/settingService";
import {Image} from "react-bootstrap";
const SlideBanner = (props) => {
    const id = "Slide";
    const [slideBanner,setSlideBanner] = useState([])
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
    };
    useEffect(() => {
        console.log(id)
        settingService.getAds(id).then((res) => {
            setSlideBanner(res.data)
            }
        );
    }, [id]);
    return (
        <>
            <div style={{marginTop: "120px"}}>
                <Slider {...settings}>
                    {
                         slideBanner.map((aSlide, idx) => (
                             <div key={idx}>
                                 <Image

                                     src={`https://shop.decor.tichhop.pro/storage${aSlide.image}`}
                                     alt={aSlide.title}
                                     style={{width: "100%"}}
                                 />

                             </div>
                         ))
                    }

                </Slider>
            </div>
        </>
    );
};

export default SlideBanner;
