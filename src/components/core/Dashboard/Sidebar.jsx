import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-[3.5rem] flex min-h-[calc(100vh-3.5rem)] relative">
        <div className="hidden md:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
          <div className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;

              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              );
            })}
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700"></div>
          <div className="flex flex-col gap-2 ">
            <SidebarLink
              link={{ name: "Settings", path: "dashboard/settings" }}
              iconName={"VscSettingsGear"}
            />

            <button
              onClick={() => {
                setConfirmationModal({
                  text1: "Are you sure you want to logout?",
                  text2: "You will be logged out of your account",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                });
              }}
              className="px-8 py-2 text-sm font-medium text-richblack-300"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>

        {/* mobile sidebar */}
        <div className="md:hidden flex fixed  bottom-0 justify-between items-center  py-1 bg-richblack-800 z-10 w-full">
          <div className="flex flex-row w-full items-center justify-between">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
              );
            })}
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
            />
          </div>
        </div>

        {/* Confirmation Modal */}
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </>
  );
};

export default Sidebar;
