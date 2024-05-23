import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="max-w-[400px]">
      <div className="flex">
        <div className="flex items-center gap-[15px]">
            <img src="/images/images.jpg" alt="img" className="block"/>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, reprehenderit!</div>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center gap-[15px]">
            <img src="/images/images.jpg" alt="img" className="block"/>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, reprehenderit!</div>
        </div>
      </div>      <div className="flex">
        <div className="flex items-center gap-[15px]">
            <img src="/images/images.jpg" alt="img" className="block"/>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, reprehenderit!</div>
        </div>
      </div>      <div className="flex">
        <div className="flex items-center gap-[15px]">
            <img src="/images/images.jpg" alt="img" className="block"/>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, reprehenderit!</div>
        </div>
      </div>      <div className="flex">
        <div className="flex items-center gap-[15px]">
            <img src="/images/images.jpg" alt="img" className="block"/>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, reprehenderit!</div>
        </div>
      </div>      <div className="flex">
        <div className="flex items-center gap-[15px]">
            <img src="/images/images.jpg" alt="img" className="block"/>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, reprehenderit!</div>
        </div>
      </div>      <div className="flex">
        <div className="flex items-center gap-[15px]">
            <img src="/images/images.jpg" alt="img" className="block"/>
            <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, reprehenderit!</div>
        </div>
      </div>
    </Slider>
  );
}