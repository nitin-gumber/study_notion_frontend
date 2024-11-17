import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import ConfirmationModal from "../../common/ConfirmationModal";
import { logout } from "../../../services/operations/authAPI";

const ProfileDropDown = ({ setOpen }) => {
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Confirmation modal state
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [showDropDown, setShowDropDown] = useState(false);

  const dropdownRef = useRef(null);

  // Using the custom hook to detect clicks outside the dropdown
  useOnClickOutside(dropdownRef, () => setShowDropDown(false));

  // If user is not logged in, set token to null
  if (!user) return null;

  return (
    <>
      <div className="flex items-center gap-x-4">
        {user && user?.accountType !== "Instructor" && (
          <Link
            to="/dashboard/cart"
            onClick={() => setOpen(false)}
            className="relative"
          >
            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100 animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>
        )}
        <button
          className="relative"
          onClick={() => setShowDropDown((prev) => !prev)}
        >
          <div className="flex items-center gap-x-1">
            {/* User's profile image */}
            <img
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}+${user?.lastName}`}
              alt={`profile-${user?.firstName}`}
              loading="lazy"
              className="aspect-ratio-square w-[30px] object-cover rounded-full text-white"
            />
            <AiOutlineCaretDown className="text-sm text-richblack-100" />
          </div>

          {/* Dropdown menu */}
          {showDropDown && (
            <div
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-[155%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-900 text-richblack-100"
            >
              {/* Link to Dashboard */}
              <Link
                to="dashboard/my-profile"
                onClick={() => {
                  setShowDropDown(false);
                  setOpen(false);
                }}
              >
                <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                  <VscDashboard className="text-lg" />
                  Dashboard
                </div>
              </Link>

              {/* Logout button */}
              <div
                onClick={() => {
                  setConfirmationModal({
                    text1: "Are you sure you want to logout?",
                    text2: "You will be logged out of your account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                  });
                  setShowDropDown(false);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
              >
                <VscSignOut className="text-lg" />
                Logout
              </div>
            </div>
          )}
        </button>

        {/* Confirmation Modal */}
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </>
  );
};

export default ProfileDropDown;
