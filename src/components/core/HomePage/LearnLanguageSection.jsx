import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../../../components/core/HomePage/Button";

const LearnLanguageSection = () => {
  return (
    <>
      <div className="text-4xl font-semibold text-center my-10">
        <div data-aos="fade-right" data-aos-duration="1500">
          Your swiss knife for
          <HighlightText text={"learning any language"} />
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3"
        >
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
          <img
            data-aos="fade-right"
            data-aos-duration="1500"
            src={know_your_progress}
            alt="Know your progress"
            className="object-contain lg:-mr-32 "
          />
          <img
            data-aos="fade-left"
            data-aos-duration="1500"
            src={compare_with_others}
            alt="Compare with others"
            className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
          />
          <img
            data-aos="fade-right"
            data-aos-duration="1500"
            src={plan_your_lesson}
            alt="Plan your lesson"
            className="object-contain lg:-ml-36 lg:-mt-5 -mt-16"
          />
        </div>
      </div>

      <div
        data-aos="fade-right"
        data-aos-duration="1500"
        className="w-fit mx-auto lg:mb-20 mb-8 -mt-5"
      >
        <CTAButton active={true} linkto={"/signup"}>
          Learn More
        </CTAButton>
      </div>
    </>
  );
};

export default LearnLanguageSection;
