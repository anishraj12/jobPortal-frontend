import { Divider } from "@mantine/core";
import React from "react";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";

function FindTalentPAge() {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-poppins ">
      <SearchBar></SearchBar>
      <Divider size="xs" mx="md"></Divider>
      <Talents></Talents>
    </div>
  );
}

export default FindTalentPAge;
