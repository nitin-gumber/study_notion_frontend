import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import Course_Card from "./Course_Card";
import PropTypes from "prop-types";

const Course_Slider = ({ Courses = [] }) => {
  if (!Courses.length) {
    return <p className="text-xl text-richblack-5">No Course Found</p>;
  }

  const swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 1,
    loop: Courses.length > 4, // Only enable loop if there are more than 2 slides
    modules: [FreeMode, Pagination, Autoplay, Navigation],
    navigation: false,
    autoplay: { delay: 2500, disableOnInteraction: false },
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: Math.min(2, Courses.length), spaceBetween: 40 },
      1024: { slidesPerView: Math.min(3, Courses.length), spaceBetween: 50 },
    },
    className: "max-h-[30rem]",
  };

  return (
    <Swiper {...swiperConfig}>
      {Courses.map((course, i) => (
        <SwiperSlide key={i}>
          <Course_Card course={course} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

Course_Slider.propTypes = {
  Courses: PropTypes.array,
};

export default memo(Course_Slider);
