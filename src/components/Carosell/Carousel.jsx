// Carousel.js

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Carousel = ({ children }) => {
  // Swiper configuration options
  const swiperOptions = {
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
  };

  return (
    <Swiper {...swiperOptions}>
      {children.map((child, index) => (
        // Wrap each child in a SwiperSlide component
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
