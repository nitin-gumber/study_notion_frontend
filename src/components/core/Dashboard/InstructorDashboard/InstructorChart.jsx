import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const InstructorChart = ({ details, currentChart }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const randomColor = (num) => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`
      );
    }
    return colors;
  };

  const StudentsData = {
    labels: details?.map((course) => course?.courseName),
    datasets: [
      {
        label: "# of Students",
        data: details?.map((course) => course?.totalStudents),
        backgroundColor: randomColor(details?.length),
        borderColor: randomColor(),
        borderWidth: 1,
      },
    ],
  };

  const totalEarnings = details?.reduce(
    (acc, course) => acc + course?.totalRevenue,
    0
  );

  const RevenueData = {
    labels: details?.map((course) => course?.courseName),
    datasets: [
      {
        label: "# of ₹",
        data: details?.map((course) => course?.totalRevenue),
        backgroundColor: randomColor(details?.length),
        borderColor: randomColor(),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {totalEarnings ? (
        <div className="mt-8 ">
          {/* change label position extreme right and increase gap and change chart size */}
          {currentChart === "revenue" ? (
            <Pie
              data={RevenueData}
              options={{
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      boxWidth: 10,
                      boxHeight: 10,
                      padding: 20,
                      font: {
                        size: 12,
                      },
                    },
                  },
                },
                aspectRatio: 2,
              }}
            />
          ) : (
            <Pie data={StudentsData} />
          )}
        </div>
      ) : (
        <div>
          <h2 className="py-10 text-center text-2xl font-medium text-richblack-100">
            Data Not Available
          </h2>
        </div>
      )}
    </>
  );
};

export { InstructorChart };
