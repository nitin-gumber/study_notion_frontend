import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Footer from "../components/common/Footer";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import Course_Slider from "../components/core/Catalog/Course_Slider";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const Catalog = () => {
  const location = useLocation();

  const { catalogName } = useParams();
  const { courseCategories } = useSelector((state) => state.courseCategories);

  const [active, setActive] = useState(1);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    if (courseCategories && catalogName) {
      const filteredCategory = courseCategories.find(
        (ct) =>
          ct?.name
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .toLowerCase() === catalogName
      );
      if (filteredCategory) {
        setCategoryId(filteredCategory._id);
      }
    }
  }, [courseCategories, catalogName]);

  // Use React Query to fetch catalog data
  const { data: catalogPageData } = useQuery({
    queryKey: ["catalogPageData", categoryId],
    queryFn: () => getCatalogPageData(categoryId),

    enabled: !!categoryId, // Fetch only when categoryId exists
  });

  return (
    <>
      <Helmet>
        <title>{`Catalog - ${catalogPageData?.selectedCategory?.name}`}</title>

        <meta
          name="description"
          content={`Catalog - ${catalogPageData?.selectedCategory?.description}`}
        />
        <meta
          name="keywords"
          content={`StudyNotion, Online Course, Course Selling Plateform, Catalog, ${catalogPageData?.selectedCategory?.name}`}
        />

        <meta
          property="og:title"
          content={`Catalog - ${catalogPageData?.selectedCategory?.description}`}
        />
        <meta property="og:description" content={``} />

        {/* for dynamacally icon change */}
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

      {/* Hero Section */}
      <div className="bg-richblack-800 px-4 py-10 mt-10">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
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
      </div>

      {/* Section 1 */}
      <div className="w-full max-w-maxContentTab px-4 py-12 mx-auto lg:max-w-maxContent">
        <div className="text-xl font-bold text-richblack-5 lg:text-3xl">
          Courses to get you started
        </div>
        <div className="my-4 flex border-b border-b-richblack-600 text-xs md:text-sm">
          <p
            className={`px-4 py-2 cursor-pointer ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 cursor-pointer ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div className=" px-12 flex justify-center">
          <Course_Slider Courses={catalogPageData?.selectedCategory?.course} />
        </div>
      </div>

      {/* Section 2 */}
      <div className="mx-auto w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-xl font-bold text-richblack-5 lg:text-3xl">
          Top courses in {catalogPageData?.differentCategory?.name}
        </div>
        <div className="py-8 px-12 flex justify-center">
          <Course_Slider Courses={catalogPageData?.differentCategory?.course} />
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-auto w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-xl font-bold text-richblack-5 lg:text-3xl">
          Frequently Bought
        </div>
      </div>
      <div className="py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {catalogPageData?.mostSellingCourses?.course ? (
            catalogPageData?.mostSellingCourses?.course.map((course, i) => (
              <Course_Card key={i} course={course} />
            ))
          ) : (
            <div className="flex items-center justify-center w-screen">
              <p className="text-xl text-richblack-5">No Course Found</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;
