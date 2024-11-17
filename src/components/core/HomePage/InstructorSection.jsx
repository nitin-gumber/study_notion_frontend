import React from "react";
import instructorImg from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <div
          data-aos="fade-right"
          data-aos-duration="1500"
          className="lg:w-[50%]"
        >
          <img
            src={instructorImg}
            alt="Instructor"
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>
        <div className="lg:w-[50%] flex gap-10 flex-col">
          <h2
            data-aos="fade-right"
            data-aos-duration="1500"
            className="lg:w-[50%] text-4xl font-semibold "
          >
            Become an
            <HighlightText text={"instructor"} />
          </h2>

          <p
            data-aos="fade-up"
            data-aos-duration="1500"
            className="font-medium text-[16px] text-justify w-[90%] text-richblack-300"
          >
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div data-aos="fade-right" data-aos-duration="1500" className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorSection;
