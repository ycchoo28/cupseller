import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        {/* <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div> */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          {/* <div className="h-full">
            <ProductsOnSale />
          </div> */}
          <div className="h-full xl:col-span-2">
            <Swiper
              pagination={true}
              navigation={true}
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              style={{
                "--swiper-navigation-color":
                  "#666" /* Change '#666' to any color you want */,
                "--swiper-pagination-color":
                  "#666" /* Change '#666' to any color you want */,
                "user-select": "none", /* Avoid clicking too fast and selecting the image */
              }}
            >
              {productInfo.images &&
                productInfo.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="w-full h-full object-cover"
                      src={image}
                      alt={`Product Image ${index + 1}`}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
