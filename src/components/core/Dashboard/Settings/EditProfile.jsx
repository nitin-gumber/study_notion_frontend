import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconButton";
import { updateProfile } from "../../../../services/operations/SettingsAPI";

// User gender options for the dropdown menu
const genders = ["Male", "Female", "Non-binary", "Prefer not to say", "Other"];

const EditProfile = () => {
  // React Redux hooks to access the state and dispatch actions to the store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destructuring user and token from the state using useSelector
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  // React Hook Form methods and properties for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to submit the profile form data
  const submitProfileForm = (data) => {
    dispatch(updateProfile(token, data, navigate));
  };

  return (
    <>
      {/* Profile Information Form */}
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 px-6 md:p-8 md:px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* First Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="firstName"
                className="text-[14px] text-richblack-5"
              >
                First Name
              </label>
              <input
                name="firstName"
                id="firstName"
                type="text"
                autoComplete="off"
                {...register("firstName", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "First Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "First Name must not exceed 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "First Name must contain only alphabets",
                  },
                })}
                defaultValue={user?.firstName}
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              />
              {errors.firstName && (
                <span className="text-[12px] text-yellow-100">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="lastName"
                className="text-[14px] text-richblack-5"
              >
                Last Name
              </label>
              <input
                name="lastName"
                id="lastName"
                type="text"
                autoComplete="off"
                placeholder="Enter your last name"
                {...register("lastName", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Last Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Last Name must not exceed 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: "Last Name must contain only alphabets",
                  },
                })}
                defaultValue={user?.lastName}
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              />
              {errors.lastName && (
                <span className="text-[12px] text-yellow-100">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Date of Birth */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="dateOfBirth"
                className="text-[14px] text-richblack-5"
              >
                Date of Birth
              </label>

              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                autoComplete="off"
                {...register("dateOfBirth", {
                  required: true,
                  max: {
                    value: new Date().toISOString().split("T")[0], // Get today's date in the required format
                    message:
                      "Date of Birth must be less than or equal to today's date",
                  },
                })}
                defaultValue={
                  user?.additionalDetials?.dateOfBirth &&
                  user?.additionalDetials?.dateOfBirth.split("T")[0]
                }
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              />
              {errors.dateOfBirth && (
                <span className="text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="text-[14px] text-richblack-5">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                autoComplete="off"
                {...register("gender", {
                  required: true,
                })}
                defaultValue={
                  user?.additionalDetails?.gender &&
                  user?.additionalDetails.gender
                }
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              >
                {genders.map((gender, index) => {
                  return (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="text-[12px] text-yellow-100">
                  {errors.gender.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="contactNumber"
                className="text-[14px] text-richblack-5"
              >
                Contact Number
              </label>

              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                autoComplete="off"
                {...register("contactNumber", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{10}$/i,
                    message: "Invalid phone number",
                  },
                })}
                placeholder="Enter your phone number"
                defaultValue={
                  user?.additionalDetials?.contactNumber &&
                  user?.additionalDetials?.contactNumber
                }
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              />
              {errors.contactNumber && (
                <span className="text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="text-[14px] text-richblack-5">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                {...register("about", {
                  required: true,
                  minLength: {
                    value: 10,
                    message: "About must be at least 10 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "About must not exceed 100 characters",
                  },
                })}
                placeholder="Enter something about yourself"
                defaultValue={
                  user?.additionalDetials?.about &&
                  user?.additionalDetials?.about
                }
                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              />
              {errors.about && (
                <span className="text-[12px] text-yellow-100">
                  {errors.about.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  );
};

export default EditProfile;
