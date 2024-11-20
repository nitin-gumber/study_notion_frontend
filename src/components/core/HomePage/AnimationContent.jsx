import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import RoomGirlImg from "../../../assets/Images/Room Girl Working Copy@3-1536x695 (1).png";

const AnimationContent = () => {
  // Cache the Spline component to improve performance
  const splineScene = useMemo(
    () => (
      <img
        data-aos="zoom-in"
        data-aos-duration="1500"
        data-aos-delay="100"
        src={RoomGirlImg}
        alt="HeroImg"
        loading="lazy"
        className="w-[80=%] h-[80%] object-cover"
      />
    ),
    []
  );

  return (
    <>
      <div className="lg:flex lg:gap-5 lg:h-screen lg:w-full">
        <div className="lg:w-1/2 lg:mx-auto flex flex-col gap-10 mt-8 lg:mt-20 items-start">
          {/* Heading */}
          <h1
            data-aos="fade-right"
            data-aos-duration="1500"
            className="text-start text-4xl md:text-5xl font-semibold"
          >
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
          </h1>

          {/* SubHeading */}
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="-mt-2 w-[90%] text-start text-lg md:text-lg font-bold text-richblack-300"
          >
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>

          <Link to={"/signup"}>
            <div
              data-aos="fade-right"
              data-aos-duration="1500"
              className="group p-1 mx-auto rounded-full bg-richblack-800 font-bold transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] text-start"
            >
              <div className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                <p>Become an Instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>

          {/* CTA Buttons */}
          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            className="mt-2 lg:mt-8 flex gap-7"
          >
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>

            <div
              data-aos="fade-right"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              <CTAButton active={false} linkto={"/login"}>
                Book a Demo
              </CTAButton>
            </div>
          </div>
        </div>
        <div className="hidden lg:block md:w-1/2 mt-10">
          {/* Hide spline logo */}
          {splineScene}
        </div>
      </div>
    </>
  );
};

export default AnimationContent;
