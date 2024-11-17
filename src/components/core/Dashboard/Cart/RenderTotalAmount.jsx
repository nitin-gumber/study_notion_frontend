import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI";

const RenderTotalAmount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const handleBuyCourse = () => {
    const course = cart.map((item) => item._id);
    if (token) {
      BuyCourse(token, course, user, navigate, dispatch);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 sticky top-20">
        <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
        <p className=" mb-1 text-3xl font-medium text-yellow-100">₹ {total}</p>
        <p className="text-sm font-medium text-richblack-300">
          Total Courses: {cart.length}
        </p>

        {/* GST Included */}
        <p className="mb-6 text-sm font-medium text-richblack-300">
          GST Included
        </p>
        <button
          onClick={handleBuyCourse}
          className="w-full py-3 text-lg font-medium text-richblack-900 bg-yellow-50 rounded-md"
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

export default RenderTotalAmount;
