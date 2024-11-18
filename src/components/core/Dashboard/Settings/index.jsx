import React from "react";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

const Settings = () => {
  return (
    <>
      <h2 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h2>

      {/* Edit Profile */}
      <EditProfile />

      {/* Password */}
      <ChangePassword />

      {/* Delete Account */}
      {/* <DeleteAccount />  */} // This feature is not implemented yet so it is commented out
    </>
  );
};

export default Settings;
