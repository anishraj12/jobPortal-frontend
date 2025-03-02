import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { getProfile } from "../Services/ProfileService";

function Profile(props: any) {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile(id)
      .then((res) => {
        setProfile(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className="w-2/3">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <img
          className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
          src={
            profile.picture
              ? `data:image/jpeg;base64,${profile.picture}`
              : "/avatar.png"
          }
          alt=""
        />
      </div>
      <div className="px-3 mt-16">
        <div className="text-3xl font-semibold flex justify-between">
          {profile?.name}
          <Button color="brightSun.4" variant="light">
            Message
          </Button>
        </div>
        <div className="text-xl flex gap-1 items-center">
          <IconBriefcase className="h-5 w-5" stroke={1.5}></IconBriefcase>
          {profile?.jobTitle}
          &bull; {profile?.company}
        </div>
        <div className=" text-lg flex gsp-1 items-center text-mine-shaft-300">
          <IconMapPin className="h-5 w-5" stroke={1.5}></IconMapPin>
          {profile?.location}
        </div>
        <div className=" text-lg flex gsp-1 items-center text-mine-shaft-300">
          <IconBriefcase className="h-5 w-5" stroke={1.5}></IconBriefcase>
          Experience: {profile?.totalExp} Years
        </div>
      </div>
      <Divider mx="xs" my="xl"></Divider>
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">About </div>
        <div className="text-sm text-mine-shaft-300 text-justify">
          {profile?.about}
        </div>
      </div>
      <Divider mx="xs" my="xl"></Divider>

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Skills </div>
        <div className=" flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, index: any) => (
            <div
              key={index}
              className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <Divider mx="xs" my="xl"></Divider>
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Experience </div>
        <div className="flex flex-col gap-8">
          {profile?.experiences?.map((exp: any, index: any) => (
            <ExpCard key={index} {...exp}></ExpCard>
          ))}
        </div>
      </div>
      <Divider mx="xs" my="xl"></Divider>
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Certifications </div>
        <div className="flex flex-col gap-8">
          {profile?.certifications?.map((certi: any, index: any) => (
            <CertiCard key={index} {...certi}></CertiCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
