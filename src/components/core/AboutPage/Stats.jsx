import React from "react";
import CountUp from "react-countup";

const stats = [
  { count: "5000", ending: "+", label: "Active Students" },
  { count: "10", ending: "+", label: "Mentors" },
  { count: "200+", ending: "+", label: "Courses" },
  { count: "50", ending: "+", label: "Awards" },
];

const Stats = () => {
  return (
    <>
      <div className="bg-richblack-700">
        <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col py-10">
                <h2 className="text-[30px] font-bold text-richblack-5">
                  <CountUp
                    end={parseInt(stat.count)}
                    delay={1}
                    duration={10}
                    redraw={true}
                    suffix={stat.ending}
                    className="text-4xl font-semibold"
                  />
                </h2>
                <h2 className="font-semibold text-[16px] text-richblack-200">
                  {stat.label}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
