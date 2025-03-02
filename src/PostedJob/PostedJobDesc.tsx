import { Badge, Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import JobDesc from "../JobDesc/JobDesc";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

function PostedJobDesc(props: any) {
  const [tab, setTab] = useState("overview");
  const [arr, setArr] = useState<any>([]);
  const handleTabChange = (value: any) => {
    setTab(value);
    if (value == "applicants") {
      setArr(
        props.applicants?.filter((x: any) => x.applicantionStatus == "APPLIED")
      );
    } else if (value == "invited") {
      setArr(
        props.applicants?.filter(
          (x: any) => x.applicantionStatus == "INTERVIEWING"
        )
      );
    } else if (value == "rejected") {
      setArr(
        props.applicants?.filter((x: any) => x.applicantionStatus == "REJECTED")
      );
    }
  };
  useEffect(() => {
    handleTabChange("overview");
  }, [props]);

  return (
    <div className="mt-5 w-3/4 px-5">
      {props.jobTitle ? (
        <>
          {" "}
          <div className="text-2xl font-semibold flex items-center ">
            {props.jobTitle}
            <Badge variant="light" color="brightSun.4" ml="sm" size="sm">
              {props.jobStatus}
            </Badge>
          </div>
          <div className="font-medium text-mine-shaft-300 mb-5">
            {props.location}
          </div>
          <div>
            <Tabs
              variant="outline"
              radius="lg"
              value={tab}
              autoContrast
              onChange={handleTabChange}
            >
              <Tabs.List className="[&_button]:text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="invited">Invited</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="overview" className="[&>div]:w-full">
                <JobDesc
                  {...props}
                  edit={true}
                  Closed={props.jobStatus == "CLOSED"}
                ></JobDesc>
              </Tabs.Panel>
              <Tabs.Panel value="applicants">
                <div className="flex flex-wrap mt-10 gap-5 justify-around ">
                  {arr?.length ? (
                    arr.map((talent: any, index: any) => (
                      <TalentCard
                        key={index}
                        {...talent}
                        posted={true}
                      ></TalentCard>
                    ))
                  ) : (
                    <div className="text-2xl font-semibold">No Applicants</div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="invited">
                <div className="flex flex-wrap mt-10 gap-5 justify-around">
                  {arr?.length ? (
                    arr.map(
                      (talent: any, index: any) =>
                        index < 6 && (
                          <TalentCard
                            key={index}
                            {...talent}
                            invited={true}
                          ></TalentCard>
                        )
                    )
                  ) : (
                    <div className="text-2xl font-semibold">
                      No Invited Candidates.
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="offered">
                <div className="flex flex-wrap mt-10 gap-5 justify-around">
                  {arr?.length ? (
                    arr.map(
                      (talent: any, index: any) =>
                        index < 6 && (
                          <TalentCard
                            key={index}
                            {...talent}
                            offered={true}
                          ></TalentCard>
                        )
                    )
                  ) : (
                    <div className="text-2xl font-semibold">
                      No Offered Candidates.
                    </div>
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="rejected">
                <div className="flex flex-wrap mt-10 gap-5 justify-around">
                  {arr?.length ? (
                    arr.map(
                      (talent: any, index: any) =>
                        index < 6 && (
                          <TalentCard
                            key={index}
                            {...talent}
                            rejected={true}
                          ></TalentCard>
                        )
                    )
                  ) : (
                    <div className="text-2xl font-semibold">
                      No Rejected Candidates.
                    </div>
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="text-2xl font-semibold flex justify-center items-center min-h-[70vh]">
          No Job Selected
        </div>
      )}
    </div>
  );
}

export default PostedJobDesc;
