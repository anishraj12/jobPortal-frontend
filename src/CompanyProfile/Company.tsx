import { Avatar, AvatarGroup, Button, Divider, Tabs } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import React from "react";
import AboutComp from "./AboutComp";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";

function Company() {
  return (
    <div className="w-3/4">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <img
          className="rounded-3xl w-36 h-36 -bottom-1/4 absolute left-5 p-2 bg-mine-shaft-950 border-mine-shaft-950 border-8"
          src="/Icons/Google.png"
          alt=""
        />
      </div>
      <div className="px-3 mt-12">
        <div className="text-3xl font-semibold flex justify-between">
          Google
          <AvatarGroup>
            <Avatar src="avatar.png"></Avatar>
            <Avatar src="avatar1.png"></Avatar>
            <Avatar src="avatar2.png"></Avatar>
            <Avatar>+10k</Avatar>
          </AvatarGroup>
        </div>

        <div className=" text-lg flex gsp-1 items-center text-mine-shaft-300">
          <IconMapPin className="h-5 w-5" stroke={1.5}></IconMapPin>
          Banglore
        </div>
      </div>
      <Divider mx="xs" my="xl"></Divider>
      <div>
        <Tabs variant="outline" radius="lg" defaultValue="about">
          <Tabs.List className="[&_button]:text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="about">About</Tabs.Tab>
            <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
            <Tabs.Tab value="employees">Employees</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="about">
            <AboutComp></AboutComp>
          </Tabs.Panel>
          <Tabs.Panel value="jobs">
            <CompanyJobs></CompanyJobs>
          </Tabs.Panel>
          <Tabs.Panel value="employees">
            <CompanyEmployees></CompanyEmployees>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default Company;
