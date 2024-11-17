import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearnLanguageSection from "../components/core/HomePage/LearnLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../Components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import AnimationContent from "../components/core/HomePage/AnimationContent";
import ReviewSlider from "../components/common/ReviewSlider";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      {/* Helmet for SEO and Dynamacaly */}

      <Helmet>
        <title>StudyNotion - Home</title>
        <meta
          name="description"
          content="StudyNotion is an online learning platform that offers courses in coding, design, and more. Learn from industry experts and start coding in seconds."
        />
        <meta
          name="keywords"
          content="StudyNotion, online learning, coding, design, courses, industry experts"
        />

        <meta property="og:title" content="StudyNotion - Home" />
        <meta
          property="og:description"
          content="StudyNotion is an online learning platform that offers courses in coding, design, and more. Learn from industry experts and start coding in seconds."
        />
        <meta property="og:image" content="https://www.example.com/image.jpg" />
        <meta property="og:url" content="https://www.example.com" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Section 1 */}
      <div className="mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between gap-8 mt-16">
        {/* Animation Content */}
        <AnimationContent />

        {/* Video Section */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 ">
          <video
            className="shadow-[18px_18px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: "true",
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a>\n<a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: "true",
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
            }}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport { TypeAnimation } from "react-type-animation";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)}\nexport default Home;`}
            codeColor={"text-white"}
            backgroundGradient={<div className="codeblock2 absolute "></div>}
          />
        </div>

        <ExploreMore />
      </div>

      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* Section 2 */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex gap-7 text-white">
              <div data-aos="fade-right" data-aos-duration="1500">
                <CTAButton active={true} linkto={"/signup"}>
                  <div className="flex items-center gap-3">
                    Explore Full Catalog
                    <FaArrowRight />
                  </div>
                </CTAButton>
              </div>

              <div
                data-aos="fade-right"
                data-aos-duration="1500"
                data-aos-delay="500"
              >
                <CTAButton active={false} linkto={"/signup"}>
                  <div className="flex items-center gap-3">Learn More</div>
                </CTAButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8">
          {/* Job that is in Demand - section -1 */}
          <div className="mb-10 mt-10 flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div
              data-aos="fade-right"
              data-aos-duration="1500"
              className="text-4xl font-semibold lg:w-[45%]"
            >
              Get a Skills you need for a
              <HighlightText text={"job that is in demand"} />
            </div>
            <div className="flex flex-col gap-10 lg:w-[40%] items-start">
              <div
                data-aos="fade-up"
                data-aos-duration="1500"
                className="text-[16px] mt-2"
              >
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <div data-aos="fade-right" data-aos-duration="1500">
                <CTAButton active={true} linkto={"/signup"}>
                  <div className="whitespace-nowrap">Learn More</div>
                </CTAButton>
              </div>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearnLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection />
      </div>

      {/* Review Slider */}

      <div className="mx-auto w-11/12 my-12">
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
