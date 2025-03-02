import { ActionIcon } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpInput from "./ExpInput";
import ExpCard from "./ExpCard";

function Experience() {
  const profile = useSelector((state: any) => state.profile);

  const [edit, setEdit] = useState(false);
  const [addExp, setAddExp] = useState(false);
  const handleClick = () => {
    setEdit(!edit);
  };
  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Experience{" "}
        <div className="flex gap-2">
          <ActionIcon
            onClick={() => setAddExp(true)}
            variant="subtle"
            color="brightSun.4"
            size="lg"
          >
            <IconPlus className="h-4/5 w-4/5" stroke={1.5}></IconPlus>
          </ActionIcon>
          <ActionIcon
            color={edit ? "red.8" : "brightSun.4"}
            onClick={handleClick}
            variant="subtle"
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
      <div className="flex flex-col gap-8">
        {profile?.experiences?.map((exp: any, index: number) => (
          <ExpCard key={index} index={index} {...exp} edit={edit}></ExpCard>
        ))}
        {addExp && <ExpInput add setEdit={setAddExp}></ExpInput>}
      </div>
    </div>
  );
}

export default Experience;
