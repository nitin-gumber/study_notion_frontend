import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>StudyNotion - Dashboard</title>
        <meta name="description" content="Dashboard - StudyNotion" />
        <meta
          name="keywords"
          content="StudyNotion, Online Course, Course Selling Plateform, Dashboard"
        />
      </Helmet>

      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-auto w-11/12 max-w-[1000px] py-10 mt-16">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
