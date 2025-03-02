import React from "react";
import JobHistory from "../JobHistory/JobHistory";

function JobHistoryPage() {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-poppins px-4">
      <div className="flex gap-5 ">
        <JobHistory></JobHistory>
      </div>
    </div>
  );
}

export default JobHistoryPage;
