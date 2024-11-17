import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosStarOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router";
import { colors } from "@mui/material";
import { createRating } from "../../../services/operations/courseDetailsAPI";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const [userRating, setUserRating] = useState(0); // State to manage rating

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("userExperience", "");
    setValue("userRating", undefined);
  }, [setValue]);

  const handleRatingChange = (event, newValue) => {
    setUserRating(newValue);
    setValue("userRating", newValue);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseId,
        review: data.userExperience,
        rating: data.userRating,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <>
      <div className=" z-50 my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button>
            <RxCross2
              onClick={() => {
                setReviewModal(false);
              }}
              className=" text-xl text-richblack-25"
            />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-center gap-x-4">
            <img
              className="aspect-square w-[50px] rounded-full object-cover"
              src={user?.image}
              alt={user?.firstName}
              loading="lazy"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <Rating
              name="customized-rating"
              value={userRating}
              onChange={handleRatingChange}
              max={5}
              size="large"
              precision={1}
              emptyIcon={
                <IoIosStarOutline
                  style={{ color: colors.grey[400] }}
                  fontSize="inherit"
                />
              }
            />

            <input
              value={userRating}
              {...register("userRating", { required: true })}
              type="hidden"
            />
            {errors.userRating && (
              <span className="text-pink-200 text-[11px]">
                * Please provide your rating
              </span>
            )}
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                htmlFor="userExperience"
                className="text-sm text-richblack-5"
              >
                Add Your Experience <span className="text-pink-200">*</span>
              </label>
              <textarea
                {...register("userExperience", {
                  required: true,
                  minLength: {
                    value: 10,
                    message: "Experience must be atleast 10 characters long",
                  },
                  maxLength: {
                    value: 500,
                    message: "Experience must be atmost 500 characters long",
                  },
                  pattern: {
                    value: /^[^{}$]+$/,
                    message:
                      "Please avoid using special characters like {} and $",
                  },
                })}
                className="w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 resize-x-none min-h-[130px]"
                placeholder="Write your experience..."
              ></textarea>
              {errors.userExperience && (
                <span className="text-pink-200 text-[11px]">
                  {errors.userExperience.message ||
                    "* Please provide your experience"}
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => {
                  setReviewModal(false);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-richblack-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-medium text-black bg-yellow-100"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm over"></div>
    </>
  );
};

export default CourseReviewModal;
