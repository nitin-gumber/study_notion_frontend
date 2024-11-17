import React from "react";
import HighlightText from "../HomePage/HighlightText";
import Button from "../HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "StudyNotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "StudyNotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "StudyNotion will provide you with a certificate after you have completed the course. This certificate will be a proof of your skills and knowledge.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "StudyNotion will automatically grade your assignments and quizzes, so you can focus on learning.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "After completing the course, you will be ready to work in the field of your choice.",
  },
];

const LearningGrid = () => {
  return (
    <>
      <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
        {LearningGridArray.map((card, index) => {
          return (
            <div
              key={index}
              className={`${index === 0 && "xl:col-span-2 xl:h-[294px]"}  ${
                card.order % 2 === 1
                  ? "bg-richblack-700 h-[294px]"
                  : card.order % 2 === 0
                  ? "bg-richblack-800 h-[294px]"
                  : "bg-transparent"
              } ${card.order === 3 && "xl:col-start-2"}  `}
            >
              {card.order < 0 ? (
                <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                  <div
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    className="text-4xl font-semibold"
                  >
                    {card.heading} <HighlightText text={card.highlightText} />
                  </div>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    className="text-richblack-300 font-medium"
                  >
                    {card.description}
                  </p>

                  <div
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    className="w-fit mt-2"
                  >
                    <Button active={true} linkto={card.BtnLink}>
                      {card.BtnText}
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  className="p-8 flex flex-col gap-8"
                >
                  <h2 className="text-richblack-5 text-lg">{card.heading}</h2>

                  <p className="text-richblack-300 font-medium">
                    {card.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LearningGrid;
