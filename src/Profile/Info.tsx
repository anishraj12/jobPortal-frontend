import React, { useState } from "react";
import fields from "../Data/Profile";
import { ActionIcon, NumberInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import {
  IconBriefcase,
  IconCheck,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

function Info() {
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExp: profile.totalExp,
      });
    } else {
      setEdit(false);
    }
  };
  const form = useForm({
    mode: "controlled",
    initialValues: { jobTitle: "", company: "", location: "", totalExp: 1 },
  });
  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Updated Successfully");
  };
  return (
    <>
      <div className="text-3xl font-semibold flex justify-between">
        {user.name}
        <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              variant="subtle"
              color="green.8"
              size="lg"
            >
              <IconCheck className="h-4/5 w-4/5" stroke={1.5}></IconCheck>
            </ActionIcon>
          )}
          <ActionIcon
            onClick={handleClick}
            variant="subtle"
            color={edit ? "red.8" : "brightSun.4"}
            size="lg"
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5"></IconX>
            ) : (
              <IconPencil className="h-4/5 w-4/5" stroke={1.5}></IconPencil>
            )}
          </ActionIcon>
        </div>
      </div>
      {edit ? (
        <>
          {" "}
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput
              form={form}
              name="jobTitle"
              {...select[0]}
            ></SelectInput>
            <SelectInput
              form={form}
              name="company"
              {...select[1]}
            ></SelectInput>
          </div>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput
              form={form}
              name="location"
              {...select[2]}
            ></SelectInput>
            <NumberInput
              label="Experience"
              hideControls
              clampBehavior="strict"
              min={1}
              max={50}
              withAsterisk
              {...form.getInputProps("totalExp")}
            ></NumberInput>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="text-xl flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5}></IconBriefcase>
            {profile.jobTitle} &bull; {profile.company}
          </div>
          <div className=" text-lg flex gsp-1 items-center text-mine-shaft-300">
            <IconMapPin className="h-5 w-5" stroke={1.5}></IconMapPin>
            {profile.location}
          </div>
          <div className=" text-lg flex gsp-1 items-center text-mine-shaft-300">
            <IconBriefcase className="h-5 w-5" stroke={1.5}></IconBriefcase>
            Experience: {profile.totalExp} Years
          </div>
        </>
      )}
    </>
  );
}

export default Info;
