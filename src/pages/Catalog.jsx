import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Footer from "../components/common/Footer";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import Course_Slider from "../components/core/Catalog/Course_Slider";
import { Helmet } from "react-helmet-async";

const Catalog = () => {
  const { catalogName } = useParams();
  const location = useLocation();
  const { courseCategories } = useSelector((state) => state.courseCategories);

  const [active, setActive] = useState(1);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    if (courseCategories?.length && catalogName) {
      const filteredCategory = courseCategories.find(
        (ct) =>
          ct?.name
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "") === catalogName
      );
      setCategoryId(filteredCategory?._id || null);
    }
  }, [courseCategories, catalogName]);

  const { data: catalogPageData, isLoading } = useQuery({
    queryKey: ["catalogPageData", categoryId],
    queryFn: () => getCatalogPageData(categoryId),
    enabled: Boolean(categoryId),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  return (
    <>
      <Helmet>
        <title>
          Catalog - {catalogPageData?.selectedCategory?.name || "Loading"}
        </title>
        <meta
          name="description"
          content={
            catalogPageData?.selectedCategory?.description ||
            "Explore our courses."
          }
        />
        <meta
          name="keywords"
          content={`StudyNotion, Online Course, Catalog, ${catalogPageData?.selectedCategory?.name}`}
        />
        <meta
          property="og:title"
          content={`Catalog - ${catalogPageData?.selectedCategory?.description}`}
        />
        <meta
          property="og:image"
          content="../assets/Logo/Logo-Full-Light.png"
        />
        <meta
          property="og:url"
          content={`https://studynotion-online.vercel.app${location.pathname}`}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <section className="bg-richblack-800 px-4 py-10 mt-10">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
              <p className="text-sm text-richblack-300">
                Home / Catalog /{" "}
                <span className="text-yellow-25">
                  {catalogPageData?.selectedCategory?.name}
                </span>
              </p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl text-richblack-5">
                {catalogPageData?.selectedCategory?.name}
              </h1>
              <p className="max-w-[1200px] text-richblack-200 text-sm sm:text-base md:text-lg">
                {catalogPageData?.selectedCategory?.description}
              </p>
            </div>
          </section>

          {[
            {
              title: "Courses to get you started",
              courses: catalogPageData?.selectedCategory?.course,
            },
            {
              title: `Top courses in ${catalogPageData?.differentCategory?.name}`,
              courses: catalogPageData?.differentCategory?.course,
            },
            {
              title: "Frequently Bought",
              courses: catalogPageData?.mostSellingCourses?.course,
            },
          ].map(({ title, courses }, index) => (
            <section
              key={index}
              className="w-full max-w-maxContentTab px-4 py-12 mx-auto lg:max-w-maxContent"
            >
              <h2 className="text-xl font-bold text-richblack-5 lg:text-3xl">
                {title}
              </h2>
              <div className="py-8 px-12 flex justify-center">
                {Array.isArray(courses) && courses.length > 0 ? (
                  index === 2 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {courses.map((course, i) => (
                        <Course_Card key={i} course={course} />
                      ))}
                    </div>
                  ) : (
                    <Course_Slider Courses={courses} />
                  )
                ) : (
                  <p className="text-xl text-richblack-5 text-center">
                    No Courses Found
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Catalog;
