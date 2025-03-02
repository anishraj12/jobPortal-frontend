import React from "react";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

function CompanyEmployees() {
  return (
    <div className="flex flex-wrap mt-10 gap-10">
      {talents.map(
        (job, index) =>
          index < 6 && <TalentCard key={index} {...job}></TalentCard>
      )}
    </div>
  );
}

export default CompanyEmployees;
