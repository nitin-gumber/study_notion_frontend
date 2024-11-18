import React, { useEffect, useState, useMemo } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { IoIosStarOutline } from "react-icons/io";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { PiDotFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import Rating from "@mui/material/Rating";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formattedDate } from "../util/dateFormatter";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { BuyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../util/avgRating";
import Error from "./Error";
import { decryptId } from "../util/encryptUrl";
import { ACCOUNT_TYPE } from "../util/constant";
import { addToCart } from "../slices/cartSlice";
import { Helmet } from "react-helmet-async";

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);

  // Memoize the decryptedCourseId to ensure stability across renders
  const decryptedCourseId = useMemo(() => decryptId(courseId), [courseId]);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const { data: courseDetails, isError } = useQuery({
    queryKey: ["courseDetails", decryptedCourseId],
    queryFn: () => fetchCourseDetails(decryptedCourseId),
    enabled: !!decryptedCourseId,
  });

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(
      courseDetails?.data?.courseDetails?.ratingAndReview
    );
    setAvgReviewCount(count);
  }, [courseDetails]);

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    );
  };

  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    courseDetails?.data?.courseDetails?.courseContent.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseDetails]);

  if (loading || !courseDetails) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  if (isError) {
    return <Error />;
  }

  const courseData = courseDetails?.data?.courseDetails;
  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReview,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData;

  const benefits = whatYouWillLearn.split("\r\n");

  const handleBuyCourse = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }

    if (token) {
      BuyCourse(token, [decryptedCourseId], user, navigate, dispatch);
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(courseData));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (paymentLoading) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{courseName}</title>
        <meta name="description" content={courseDescription} />
        <meta property="og:title" content={courseName} />
        <meta property="og:description" content={courseDescription} />
        <meta property="og:image" content={thumbnail} />
        <meta
          property="og:url"
          content={`https://studynotion-online.vercel.app/course/${courseId}`}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="relative, w-full bg-richblack-800 mt-14">
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8  lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className=" absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt={courseName}
                loading="lazy"
                className="object-auto w-full h-full rounded-lg"
              />
            </div>
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
              <div>
                <p className="text-2xl font-bold text-richblack-5 sm:text-[42px] sm:leading-snug">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                
                {/* Rating by MUI */}
                <Rating
                  name="read-only"
                  value={avgReviewCount}
                  readOnly
                  precision={0.5}
                  // ICONS  color change
                  emptyIcon={<IoIosStarOutline className="text-yellow-100" />}
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#E7C009",
                    },
                  }}
                />

                <span>{`(${
                  ratingAndReview ? ratingAndReview.length : 0
                } reviews)`}</span>
                <span>{`${
                  studentsEnrolled ? studentsEnrolled.length : 0
                } students enrolled`}</span>
              </div>
              <div>
                <p>
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at{" "}
                  {formattedDate(createdAt, "dd MMM yyyy")} |{" "}
                  {new Date(createdAt).toLocaleTimeString()}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> Hinglish
                </p>
              </div>
            </div>
            <div className="flex  w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button
                className="cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblack-900"
                onClick={handleBuyCourse}
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="cursor-pointer rounded-md bg-richblack-900 lg:bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5"
              >
                Add to Cart
              </button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseDetailsCard
              course={courseDetails?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ul className="flex flex-col items-start gap-4">
                {benefits.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-1 font-[16px]"
                  >
                    <PiDotFill className="text-yellow-50 w-7 h-7 flex-shrink-0 -mt-[0.15rem]" />
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="mx-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent ? courseContent.length : "0"} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{courseDetails?.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button className="text-yellow-25">
                    Callapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Detials Accordion Bar */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`}
                  alt={instructor.firstName}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetials?.about
                  ? instructor?.additionalDetials?.about
                  : "No description"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default CourseDetails;
