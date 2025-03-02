import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { jobList } from "../Data/JobsData";
import Card from "./Card";
import { getAllJobs } from "../Services/JobService";
import { profile } from "../Data/TalentData";
import { useSelector } from "react-redux";

function JobHistory() {
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);

  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any>([]);
  const [showList, setShowList] = useState<any>([]);
  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res);
        setShowList(
          res.filter((job: any) => {
            let found = false;
            job.applicants?.forEach((applicant: any) => {
              if (
                applicant.applicantId == user.id &&
                applicant.applicantionStatus == "APPLIED"
              ) {
                found = true;
              }
            });
            return found;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleTabChange = (value: string | null) => {
    setActiveTab(value);
    if (value == "SAVED") {
      setShowList(
        jobList.filter((job: any) => profile.savedJobs?.includes(job.id))
      );
    } else {
      setShowList(
        jobList.filter((job: any) => {
          let found = false;
          job.applicants?.forEach((applicant: any) => {
            if (
              applicant.applicantId == user.id &&
              applicant.applicantionStatus == value
            ) {
              found = true;
            }
          });
          return found;
        })
      );
    }
  };
  return (
    <div>
      <div className="text-2xl font-semibold mb-5">Job History</div>
      <div>
        <Tabs
          variant="outline"
          radius="lg"
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tabs.List className="[&_button]:text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value={activeTab}>
            {" "}
            <div className="flex flex-wrap mt-10 gap-5">
              {showList.map((job: any, index: any) => (
                <Card
                  key={index}
                  {...job}
                  {...{ [activeTab.toLowerCase()]: true }}
                ></Card>
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default JobHistory;
