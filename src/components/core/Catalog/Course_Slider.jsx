import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import Course_Card from "./Course_Card";
import PropTypes from "prop-types";

const Course_Slider = ({ Courses = [] }) => {
  // Return early if no courses exist
  if (!Courses || Courses.length === 0) {
    return (
      <p className="text-xl text-center text-richblack-5 mt-4">
        No Course Found
      </p>
    );
  }

  // Swiper configuration with navigation disabled and slidesPerView 3 for desktop
  const swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: Courses.length > 3, // Enable loop only for meaningful slide numbers
    modules: [FreeMode, Pagination, Autoplay],
    autoplay: { delay: 3000, disableOnInteraction: false },
    // pagination: { clickable: true }, // Enable pagination for navigation
    navigation: false, // Navigation explicitly disabled
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 }, // For smaller screens
      1024: { slidesPerView: 3, spaceBetween: 30 }, // For desktop screens
    },
  };

  return (
    <div className="w-full">
      <Swiper {...swiperConfig}>
        {Courses.map((course) => (
          <SwiperSlide key={course._id}>
            <Course_Card course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

Course_Slider.propTypes = {
  Courses: PropTypes.arrayOf(PropTypes.object),
};

export default memo(Course_Slider);
