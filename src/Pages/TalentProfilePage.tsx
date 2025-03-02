import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendedTalent from "../TalentProfile/RecommendedTalent";
import { getAllProfiles } from "../Services/ProfileService";

function TalentProfilePage() {
  const navigate = useNavigate();
  const [talents, setTalents] = useState<any[]>([]);
  useEffect(() => {
    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-poppins p-4">
      <Button
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={20}></IconArrowLeft>}
        color="brightSun.4"
        variant="light"
        my="sm"
      >
        Back
      </Button>
      <div className="flex gap-5">
        <Profile></Profile>
        <RecommendedTalent talents={talents}></RecommendedTalent>
      </div>
    </div>
  );
}

export default TalentProfilePage;
