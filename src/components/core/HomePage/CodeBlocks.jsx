import React from "react";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <>
      <div
        className={`flex ${position} flex-col my-12 justify-between lg:gap-10 gap-10 `}
      >
        {/* Section 1 */}
        <div
          data-aos="fade-right"
          data-aos-duration="1500"
          className="w-[100%] lg:w-[50%] flex flex-col gap-8"
        >
          {heading}

          {/* Sub Heading */}
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="text-richblack-300 text-base font-bold w-[85%] -mt-3"
          >
            {subheading}
          </div>

          {/* Button Group */}
          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            className="flex gap-7 mt-7"
          >
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
              <div className="flex gap-2 items-center">
                {ctabtn1.btnText}
                <FaArrowRight />
              </div>
            </CTAButton>

            <div
              data-aos="fade-right"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                {ctabtn2.btnText}
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div
          data-aos="fade-left"
          data-aos-duration="1500"
          className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]"
        >
          {backgroundGradient}

          {/* Indexing */}
          <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>
          <div
            className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
          >
            <TypeAnimation
              sequence={[codeblock, 5000, ""]}
              speed={10}
              repeat={Infinity}
              cursor={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeBlocks;
