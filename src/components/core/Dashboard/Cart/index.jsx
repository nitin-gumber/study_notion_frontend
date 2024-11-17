import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <h2 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h2>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400 ">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col items-center md:items-start gap-x-10 gap-y-10 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your Cart is empty
        </p>
      )}
    </>
  );
};

export default Cart;
