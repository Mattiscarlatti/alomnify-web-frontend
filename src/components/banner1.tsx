"use client";

import Image from "next/image";
import bannerone from "@/images/bannerone.png";
import bannertwo from "@/images/bannertwo.png";
import bannerthree from "@/images/bannerthree.png";
import bannerfour from "@/images/bannerfour.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/app/css/styles.css';

const Banner1 = () => (
  <Swiper spaceBetween={50} slidesPerView={1} centeredSlides={true} navigation={false} modules={[Autoplay, Navigation]} autoplay={{ delay: 4000, }} loop={true}>
    <SwiperSlide><Image src={bannerone} alt="Slide 1" /></SwiperSlide>
    <SwiperSlide><Image src={bannertwo} alt="Slide 2" /></SwiperSlide>
    <SwiperSlide><Image src={bannerthree} alt="Slide 3" /></SwiperSlide>
    <SwiperSlide><Image src={bannerfour} alt="Slide 4" /></SwiperSlide>
  </Swiper>
);

export default Banner1;