import { useEffect } from "react";

// This hook detects clicks outside of the specified component and calls the provided handler function
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    // Define the listener function to be called on click and touch events
    const listener = (event) => {
      // Do nothing if the event was triggered by a click inside the component
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Call the handler function if the event was triggered outside of the component
      handler(event);
    };

    // Add the event listener for mousedown and touchstart
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener, { passive: true }); // Make touchstart passive

    // Remove the event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Run this effect when ref or handler changes
};

export default useOnClickOutside;
