import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);

  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, chips);
  }, [chips]);

  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === "," || event.key === " ") {
      // Prevent the default behavior of the event
      event.preventDefault();
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim();
      // Check if the input value exists and is not already in the chips array
      if (chipValue && !chips.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newChips = [...chips, chipValue];
        setChips(newChips);
        event.target.value = "";
      }
    }
  };

  // Function to handle deletion of a chip
  const handleDeleteChip = (chipIndex) => {
    // Filter the chips array to remove the chip with the given index
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  // Check if the chips array has any chips and remove the error if it does have chips
  if (chips.length > 0) {
    delete errors[name];
  }

  // Render the component
  return (
    <>
      <div className="flex flex-col space-y-2">
        <label className="text-[14px] text-richblack-5" htmlFor={name}>
          {label} <sup className="text-pink-200">*</sup>
        </label>

        <div className="flex w-full flex-wrap gap-y-2">
          {chips.map((chip, index) => (
            <div
              key={index}
              className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
            >
              {chip}

              <button
                type="button"
                className="ml-2 focus:outline-none"
                onClick={() => handleDeleteChip(index)}
              >
                <MdClose className="text-sm" />
              </button>
            </div>
          ))}

          <input
            id={name}
            name={name}
            type="text"
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg bg-richblack-700 p-3 text-sm text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
          />
        </div>

        {errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )}
      </div>
    </>
  );
}
