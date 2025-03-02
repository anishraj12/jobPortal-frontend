import React, { useEffect, useState } from "react";
import Sort from "./Sort";
import JobCard from "./JobCard";
import { jobList } from "../Data/JobsData";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

function Jobs() {
  const dispatch = useDispatch();
  const sort = useSelector((state: any) => state.sort);

  const [jobList, setJobList] = useState([{}]);
  const filter = useSelector((state: any) => state.filter);
  const [filteredJobs, setFilteredJobs] = useState<any>([]);
  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());

    getAllJobs()
      .then((res) => {
        setJobList(res.filter((job: any) => job.jobStatus == "ACTIVE"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    let filtereTalent = jobList;

    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filtereTalent = filtereTalent.filter((job: any) =>
        filter["Job Title"]?.some((title: any) =>
          job.jobTitle?.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Locaction && filter.Locaction.length > 0) {
      filtereTalent = filtereTalent.filter((job: any) =>
        filter.Location?.some((location: any) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter.Experience && filter.Experience.length > 0) {
      filtereTalent = filtereTalent.filter((job: any) =>
        filter.Experience?.some((x: any) =>
          job.experience?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }
    if (filter["Job Type"] && filter["Job Title"].length > 0) {
      filtereTalent = filtereTalent.filter((job: any) =>
        filter["Job Type"]?.some((x: any) =>
          job.jobType?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }
    if (filter.salary && filter.salary.length > 0) {
      filtereTalent = filtereTalent.filter(
        (jobs: any) =>
          filter.salary[0] <= jobs.packageOffered &&
          jobs.packageOffered <= filter.salary[1]
      );
    }

    setFilteredJobs(filtereTalent);
  }, [filter, jobList]);
  useEffect(() => {
    if (sort == "Most Recent") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) =>
            new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
        )
      );
    } else if (sort == "Salary: Low to High") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) => a.packageOffered - b.packageOffered
        )
      );
    } else if (sort == "Salary: High to Low") {
      setJobList(
        [...jobList].sort(
          (a: any, b: any) => b.packageOffered - a.packageOffered
        )
      );
    }
  }, [sort]);
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort sort="job"></Sort>
      </div>
      <div className="flex flex-wrap mt-10 gap-5">
        {filteredJobs.map((job: any, index: any) => (
          <JobCard key={index} {...job}></JobCard>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
