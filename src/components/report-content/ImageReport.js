/* eslint-disable import/no-unresolved */
import {  useState } from "react";
import PropTypes from 'prop-types'
// Import Swiper React components
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// mui components
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'


ImageReport.propTypes = {
  images:PropTypes.arrayOf(PropTypes.string).isRequired,
  overview: PropTypes.string.isRequired
}

export default function ImageReport({images, overview}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={0}
        // navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mainSlider"
      >
        {images?.map((img, index) => <SwiperSlide key={img + index}>
          <img alt={img} src={img}  />
        </SwiperSlide>)}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView={10}
        freeMode
        navigation
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="thunbnailSlider"
      >
        {images?.map((img, index) => <SwiperSlide key={img + index}>
          <img alt={img} src={img} />
        </SwiperSlide>)}
      </Swiper>
      <Box sx={{my:2}}>
          <Paper square sx={{bgcolor:'primary.main', p:1, color:'white'}}>
            <h1 style={{textAlign:'center', margin:'10px 0'}}>Quick Overview</h1>
            <p style={{fontSize:'14px'}}>{overview}</p>
          </Paper>
      </Box>
    </>
  )
}