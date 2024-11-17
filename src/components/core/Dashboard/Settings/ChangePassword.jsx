import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconButton";
import { changePassword } from "../../../../services/operations/SettingsAPI";

const ChangePassword = () => {
  // Redux Hooks definations for dispatch and selectors to get token
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get token from redux store to authenticate user for password change
  const { token } = useSelector((state) => state.auth);

  // Local state to toggle password visibility for old password and new password fields
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // React hook form methods for form validation and submission
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission and dispatch change password action to change password
  const submitPasswordForm = (data) => {
    // dispatch change password action to change password and navigate to my profile page
    dispatch(changePassword(token, data, navigate));
  };

  return (
    <>
      {/* Form to change password */}
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-richblack-700 bg-richblack-800 p-4 px-6 md:p-8 md:px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

          {/* Hidden username field for accessibility */}
          <div className="hidden">
            <label htmlFor="username" className="text-richblack-5 text-[14px]">
              Username
            </label>
            <input
              name="username"
              id="username"
              type="text"
              {...register("username")}
              placeholder="Enter your username"
              aria-hidden="true"
              autoComplete="username"
            />
          </div>

          {/* Old Password and New Password fields */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className=" relative flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="oldPassword"
                className="text-richblack-5 text-[14px]"
              >
                Current Password
              </label>
              <input
                name="oldPassword"
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                autoComplete="off"
                {...register("oldPassword", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      "Password should contain atleast 1 uppercase, 1 lowercase, 1 number and should be atleast 8 characters long",
                  },
                })}
                placeholder="Enter your current password"
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[40px] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEye className="text-richblack-100 text-[1.5rem]" />
                ) : (
                  <AiOutlineEyeInvisible className="text-richblack-100 text-[1.5rem]" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="text-[12px] text-yellow-100">
                  {errors.oldPassword.message}
                </span>
              )}
            </div>

            {/* New Password field */}
            <div className=" relative flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="newPassword"
                className="text-richblack-5 text-[14px]"
              >
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                autoComplete="new-password"
                {...register("newPassword", {
                  required: true,
                  validate: {
                    notSameAsOld: (value) =>
                      value !== document.getElementById("oldPassword").value ||
                      "New password should not be same as old password",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      "Password should contain atleast 1 uppercase, 1 lowercase, 1 number and should be atleast 8 characters long",
                  },
                })}
                placeholder="Enter your new password"
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[40px] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEye className="text-richblack-100 text-[1.5rem]" />
                ) : (
                  <AiOutlineEyeInvisible className="text-richblack-100 text-[1.5rem]" />
                )}
              </span>

              {errors.newPassword && (
                <span className="text-[12px] text-yellow-100">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Submit and Cancel buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
