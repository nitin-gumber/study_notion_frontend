import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IoIosStarOutline } from "react-icons/io";
import Rating from "@mui/material/Rating";
import { useQuery } from "@tanstack/react-query";
import { Autoplay, Mousewheel, Keyboard } from "swiper/modules";
import { ratingsEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";

const RatingSlider = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      return response?.data?.data.filter((review) => review.rating > 3);
    },
  });

  return (
    <>
      <div className="px-1 md:px-10 py-6 md:py-10 bg-richblack-900">
        <h2 className="text-2xl font-semibold text-richblack-5 mb-4 text-center">
          Student Reviews
        </h2>
        {isLoading ? (
          <div className="flex justify-center">Loading reviews...</div>
        ) : (
          <Swiper
            mousewheel={{ enabled: true, forceToAxis: true }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            slidesPerView={1}
            loop={true}
            spaceBetween={20}
            pagination={false}
            autoplay={
              // conditionally enable autoplay based on the number of reviews
              reviews.length > 3 && { delay: 5000, disableOnInteraction: false }
            }
            modules={[Mousewheel, Keyboard, Autoplay]}
            className="md:pt-5"
            centeredSlides={true}
            navigation={false}
            breakpoints={{
              300: { slidesPerView: 1.2, spaceBetween: 10 },
              480: { slidesPerView: 1.5, spaceBetween: 15 },
              768: { slidesPerView: 2.3, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1440: { slidesPerView: 3.5, spaceBetween: 30 },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col justify-between gap-3 min-h-[200px] h-full bg-richblack-800 p-4 text-[14px] text-richblack-25 rounded-lg shadow-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={review?.user?.image}
                      alt="user"
                      className="h-10 w-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-richblack-5">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </h3>
                      <p className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25 line-clamp-3">
                    {review?.review.length > 100
                      ? `${review?.review.slice(0, 100)}...`
                      : review?.review}
                  </p>

                  <Rating
                    name="read-only"
                    value={review?.rating}
                    readOnly
                    precision={0.5}
                    emptyIcon={<IoIosStarOutline className="text-yellow-100" />}
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#E7C009",
                      },
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default memo(RatingSlider);
