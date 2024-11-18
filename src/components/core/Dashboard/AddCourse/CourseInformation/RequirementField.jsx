import React, { useEffect, useState } from "react";

function RequirementField({ name, label, register, errors, setValue }) {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  // Register the field with validation
  useEffect(() => {
    register(name, {
      required: "Please add at least one requirement",
      validate: (value) => value.length > 0,
    });
  }, [register, name]);

  // Update form value when the list changes
  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList, setValue, name]);

  // Add a requirement to the list
  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirementList([...requirementList, requirement.trim()]);
      setRequirement(""); // Clear the input after adding
    }
  };

  // Remove a requirement from the list
  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = requirementList.filter(
      (_, i) => i !== index
    );
    setRequirementList(updatedRequirementList);
  };

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <label htmlFor={name} className="text-[14px] text-richblack-5">
          {label} <sup className="text-pink-200">*</sup>
        </label>
        <div className="flex flex-col items-start gap-y-2">
          <input
            type="text"
            name={name}
            id={name}
            autoComplete="off"
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="Enter your requirement"
            className="w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
          />
          <button
            type="button"
            onClick={handleAddRequirement}
            className="font-semibold text-yellow-50"
          >
            Add
          </button>
        </div>

        {/* Display the requirements if the list has items */}
        {requirementList.length > 0 && (
          <ul className="mt-2 list-inside list-disc">
            {requirementList.map((req, index) => (
              <li key={index} className="flex items-center text-richblack-5">
                <span>{req}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className="ml-2 text-xs text-pure-greys-300"
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Show validation error if required */}
        {errors[name] && (
          <span className="text-[12px] text-pink-200">
            {errors[name].message}
          </span>
        )}
      </div>
    </>
  );
}

export default RequirementField;
