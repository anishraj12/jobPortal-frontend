import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";

function Skills() {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [skills, setSkills] = useState<string[]>([]);
  const profile = useSelector((state: any) => state.profile);
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile.skills);
    } else {
      setEdit(false);
    }
  };
  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, skills: skills };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Skills Updated Successfully");
  };
  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills{" "}
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
        <TagsInput
          value={skills}
          onChange={setSkills}
          placeholder="Add skill"
          splitChars={[",", " ", "|"]}
        ></TagsInput>
      ) : (
        <div className=" flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, index: number) => (
            <div
              key={index}
              className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;
