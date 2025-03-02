import { Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { activeJobs } from "../Data/PostedJob";
import PostedJobCard from "./PostedJobCard";

function PostedJob(props: any) {
  const [activeTab, setActiveTab] = useState<string | null>("ACTIVE");
  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
  }, [props.job]);
  return (
    <div className="w-1/5 mt-5">
      <div className="text-2xl font-semibold mb-5 ">Jobs</div>
      <div>
        <Tabs
          autoContrast
          variant="pills"
          value={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="ACTIVE">
              Active [
              {
                props.jobList?.filter((job: any) => job?.jobStatus == "ACTIVE")
                  .length
              }
              ]
            </Tabs.Tab>
            <Tabs.Tab value="DRAFT">
              Drafts [
              {
                props.jobList?.filter((job: any) => job?.jobStatus == "DRAFT")
                  .length
              }
              ]
            </Tabs.Tab>
            <Tabs.Tab value="CLOSED">
              Closed [
              {
                props.jobList?.filter((job: any) => job?.jobStatus == "CLOSED")
                  .length
              }
              ]
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <div className="flex flex-col gap-5 mt-5">
          {props.jobList
            ?.filter((job: any) => job?.jobStatus == activeTab)
            .map((item: any, index: any) => (
              <PostedJobCard key={index} {...item}></PostedJobCard>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PostedJob;
