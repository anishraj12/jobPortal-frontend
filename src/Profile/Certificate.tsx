import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";

function Certificate() {
  const [addCerti, setAddCerti] = useState(false);
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const handleClick = (index: any) => {
    setEdit(!edit);
  };
  return (
    <div className="px-3">
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
      <div className="flex flex-col gap-8">
        {profile?.certifications?.map((certi: any, index: number) => (
          <CertiCard
            key={index}
            index={index}
            edit={edit}
            {...certi}
          ></CertiCard>
        ))}
        {addCerti && <CertiInput setEdit={setAddCerti}></CertiInput>}
      </div>
    </div>
  );
}

export default Certificate;
