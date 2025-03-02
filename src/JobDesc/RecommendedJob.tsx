import React, { useEffect, useState } from "react";

import JobCard from "../Findjobs/JobCard";
import { jobList } from "../Data/JobsData";
import { useParams } from "react-router-dom";
import { getAllJobs } from "../Services/JobService";

function RecommendedJob() {
  const { id } = useParams();
  const [jobList, setJobList] = useState<any>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      <div className="tetx-xl font-semibold mb-5">Recommended Jobs</div>
      <div className="flex flex-col flex-wrap gap-5 justify-around">
        {jobList?.map(
          (job: any, index: number) =>
            index < 6 && id != job.id && <JobCard key={index} {...job} />
        )}
      </div>
    </div>
  );
}

export default RecommendedJob;
