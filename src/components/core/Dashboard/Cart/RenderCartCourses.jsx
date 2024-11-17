// RenderCartCourses.jsx
import React, { useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import GetAvgRating from "../../../../util/avgRating";

const RenderCartCourses = () => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  const [avgRating, setAvgRating] = React.useState(0);

  // get average rating of the course using memohook
  useEffect(() => {
    cart.map((course) => {
      const avgRating = GetAvgRating(course.ratingAndReview);
      setAvgRating(avgRating);
    });
  }, [cart]);

  return (
    <>
      <div className="flex flex-1 flex-col">
        {cart.map((course, index) => (
          <div
            key={index}
            className={`flex w-full flex-wrap items-start justify-between gap-6 ${
              index !== cart.length - 1 && "border-b border-richblack-400 pb-6"
            } ${index !== 0 && "mt-6"}`}
          >
            <div className="flex flex-1 flex-col gap-4 xl:flex-row">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                loading="lazy"
                className="h-[148px] w-[220px] rounded-lg object-fit"
              />
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-medium text-richblack-5">
                  {course?.courseName.length > 30
                    ? course?.courseName.substring(0, 30) + "..."
                    : course?.courseName}
                </p>

                <p className="text-sm text-richblack-300">
                  Instructor: {course?.instructor?.firstName}{" "}
                  {course?.instructor?.lastName}
                </p>

                <p className="text-sm text-richblack-300">
                  {course?.category?.name}
                </p>
                <div className="flex items-center gap-2 justify-start">
                  <span className="text-yellow-5">
                    {avgRating ? avgRating : 0}
                  </span>

                  <ReactStars
                    count={5}
                    value={avgRating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    filledIcon={<FaStar />}
                  />
                  <span className="text-richblack-400">
                    {course?.ratingAndReview
                      ? course?.ratingAndReview.length
                      : 0}{" "}
                    Ratings
                  </span>
                </div>

                <p className="text-sm text-richblack-300">
                  {course?.studentsEnrolled.length} students Enrolled
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse items-end mt-10">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
              >
                <RiDeleteBin6Line />
              </button>
              <p className="mb-6 text-3xl font-medium text-yellow-100">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RenderCartCourses;
