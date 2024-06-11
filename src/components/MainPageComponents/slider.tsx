import React from "react";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface ISliderItem {
  imageUrl: string
  title: string
  subtitle: string
}

const SliderItem = ({imageUrl, title, subtitle} : ISliderItem) => {
  return(
    <div className="flex sm:pb-[20px]">
      <div className="flex items-center gap-[15px]  sm:flex-col">
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt="sliderImage"
          className="rounded-[5px] sm:w-[150px]"
        />
        <div>
          <div className="font-robotoBlack mb-[10px] sm:text-center">{title}</div>
          <div className="font-robotoMedium sm:text-center">{subtitle}</div>
        </div>
      </div>
    </div>
  )
}


export default function SimpleSlider() {
  var settings : Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };
  return (
    <Slider {...settings} className="max-w-[450px] lg:max-w-[80%]">
      <SliderItem 
        imageUrl={"/images/introSlider/1.jpg"} 
        title={"Совместная работа в реальном времени"} 
        subtitle={"Ускорьте выполнение проектов благодаря эффективной совместной работе в реальном времени"}
      />
      <SliderItem 
        imageUrl={"/images/introSlider/2.jpg"} 
        title={"Глобальное общение"} 
        subtitle={"Расширяйте горизонты и связывайтесь с людьми по всему миру благодаря глобальному общению"}
      />
      <SliderItem 
        imageUrl={"/images/introSlider/3.jpg"} 
        title={"Общение с друзьями"} 
        subtitle={"Оставайтесь на связи и наслаждайтесь общением с друзьями, где бы вы ни находились."}
      />
      <SliderItem 
        imageUrl={"/images/introSlider/4.jpg"} 
        title={"Эффективность работы"} 
        subtitle={"Повышайте свою продуктивность и достигайте целей быстрее с высокой эффективностью работы."}
      />
      <SliderItem 
        imageUrl={"/images/introSlider/5.jpg"} 
        title={"Виртуальные встречи"} 
        subtitle={"Откройте новые возможности общения и сотрудничества с помощью виртуальных встреч."}
      />
    </Slider>
  );
}