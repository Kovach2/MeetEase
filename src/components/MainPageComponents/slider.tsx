import React from "react";
import Slider from "react-slick";
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
    <div className="flex">
      <div className="flex items-center gap-[15px]">
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt="sliderImage"
          className="rounded-[5px]"
        />
        <div>
          <div className="font-robotoBlack mb-[10px]">{title}</div>
          <div className="font-robotoMedium">{subtitle}</div>
        </div>
      </div>
    </div>
  )
}


export default function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="max-w-[450px]">
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