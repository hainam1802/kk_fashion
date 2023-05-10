import React from "react";
import SlideBanner from "../widget/SlideBanner";
import FlashSale from "../widget/FlashSale";
import SpecialProduct from "../widget/SpecialProduct";
import AdsSale from "../widget/AdsSale";
import Ads1 from "../widget/Ads1";
import SuggestProduct from "../widget/SuggestProduct";
import Blog from "../widget/Blog";
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
            <Blog />
        </>
    );
};

export default Home;
