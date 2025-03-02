import {
  ActionIcon,
  Avatar,
  Divider,
  FileInput,
  Overlay,
  TagsInput,
  Textarea,
} from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconEdit,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { profile } from "../Data/TalentData";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import { useDispatch } from "react-redux";

import Info from "./Info";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { successNotification } from "../Services/NotificationService";
import { getBase64 } from "../Services/Utilities";

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const { hovered, ref } = useHover();
  const handleFileChange = async (image: any) => {
    let picture: any = await getBase64(image);
    let updatedProfile = { ...profile, picture: picture.split(",")[1] };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Picture Updated Successfully.");
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <div
          ref={ref}
          className="absolute flex items-center justify-center -bottom-1/3 left 3"
        >
          <Avatar
            className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full  "
            src={
              profile.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : "/avatar.png"
            }
            alt=""
          ></Avatar>
          {hovered && (
            <Overlay
              className="!rounded-full"
              color="#000"
              backgroundOpacity={0.75}
            ></Overlay>
          )}
          {hovered && (
            <IconEdit className="absolute z-[300] !w-16 !h-16"></IconEdit>
          )}
          {hovered && (
            <FileInput
              onChange={handleFileChange}
              className="absolute z-[301] [&_*]:!rounded-full [&_*]:!h-full !h-full w-full"
              variant="transparent"
              accept="image/png,image/jpeg"
            ></FileInput>
          )}
        </div>
      </div>
      <div className="px-3 mt-16">
        <Info></Info>
      </div>

      <Divider mx="xs" my="xl"></Divider>
      <About></About>
      <Divider mx="xs" my="xl"></Divider>

      <Skills></Skills>
      <Divider mx="xs" my="xl"></Divider>
      <Experience></Experience>
      <Divider mx="xs" my="xl"></Divider>
      <Certificate></Certificate>
      {/* <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Certifications{" "}
          <div className="flex gap-2">
            <ActionIcon
              onClick={() => setAddCerti(true)}
              variant="subtle"
              color="brightSun.4"
              size="lg"
            >
              <IconPlus className="h-4/5 w-4/5" stroke={1.5}></IconPlus>
            </ActionIcon>
            <ActionIcon
              onClick={() => handleEdit(4)}
              variant="subtle"
              color="brightSun.4"
              size="lg"
            >
              {edit[4] ? (
                <IconDeviceFloppy className="h-4/5 w-4/5"></IconDeviceFloppy>
              ) : (
                <IconPencil className="h-4/5 w-4/5" stroke={1.5}></IconPencil>
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {profile?.certifications?.map((certi: any, index: number) => (
            <CertiCard key={index} edit={edit[4]} {...certi}></CertiCard>
          ))}
          {addCerti && <CertiInput setEdit={setAddCerti}></CertiInput>}
        </div>
      </div> */}
    </div>
  );
}

export default Profile;
