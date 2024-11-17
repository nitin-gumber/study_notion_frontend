// Helper function to convert total seconds to the duration format
function convertSecondsToDuration(totalSeconds) {
    // Check if the input is a valid number and is non-negative
   
    // total second is not a number or negative number firstly convert it to number
    totalSeconds = Number(totalSeconds);
  
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 3600) % 60);
  
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }
  
  export { convertSecondsToDuration };
  