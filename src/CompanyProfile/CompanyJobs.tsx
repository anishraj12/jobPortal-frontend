import React from "react";
import { jobList } from "../Data/JobsData";
import JobCard from "../Findjobs/JobCard";

function CompanyJobs() {
  return (
    <div className="flex flex-wrap mt-10 gap-3">
      {jobList.map((job, index) => (
        <JobCard key={index} {...job}></JobCard>
      ))}
    </div>
  );
}

export default CompanyJobs;
