"use client";

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/app/css/styles.css';

interface BannerProps {
    plantendata0: { 
         aantalPlantenSoorten: number;
         aantalInheemseSoorten: number;
         aantalBoomSoorten: number; 
         aantalBoomSoorten25: number; 
         aantalEetbareSoorten: number; 
         aantalGroenblijvendeSoorten: number; 
         aantalGevoeligeSoorten: number;
         aantalKwetsbareSoorten: number;
         aantalBedreigdeSoorten: number;
         aantalErnstigBedreigdeSoorten: number;
         biodiversiteitsScore: number;
        };
  }

  const Banner2: React.FC<BannerProps> = ({ plantendata0 }) => {
    const { aantalPlantenSoorten, aantalInheemseSoorten, aantalBoomSoorten, aantalBoomSoorten25, aantalEetbareSoorten, aantalGroenblijvendeSoorten, aantalGevoeligeSoorten, aantalKwetsbareSoorten, aantalBedreigdeSoorten, aantalErnstigBedreigdeSoorten } = plantendata0;
  return (
    <>
        <Swiper
        centeredSlides={true}
        navigation={false}  
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        autoplay={{
            delay: 4000,
        }}
        loop={true}
        >
        <SwiperSlide>
            <h1 className="text-3xl">biodiversiteitsscore: <span className="text-red-500">{plantendata0.biodiversiteitsScore}</span></h1>
        </SwiperSlide>
        <SwiperSlide>
            <h1 className="text-3xl">aantal plantensoorten: <span className="text-red-500">{plantendata0.aantalPlantenSoorten}</span></h1>
        </SwiperSlide>
        <SwiperSlide>
            <h1 className="text-3xl">aantal inheemse soorten: <span className="text-red-500">{plantendata0.aantalInheemseSoorten}</span></h1>
        </SwiperSlide>
        <SwiperSlide>
            <h1 className="text-3xl">aantal (ernstig) bedreigde soorten: <span className="text-red-500">{plantendata0.aantalBedreigdeSoorten + plantendata0.aantalErnstigBedreigdeSoorten}</span></h1>
        </SwiperSlide>
        <SwiperSlide>
            <h1 className="text-3xl">aantal eetbare soorten: <span className="text-red-500">{plantendata0.aantalEetbareSoorten}</span></h1>
        </SwiperSlide>
        <SwiperSlide>
            <h1 className="text-3xl">aantal boomsoorten met exemplaar ouder dan 25jaar: <span className="text-red-500">{plantendata0.aantalBoomSoorten25}</span></h1>
        </SwiperSlide>
        </Swiper>
    </>
  );
};

export default Banner2;