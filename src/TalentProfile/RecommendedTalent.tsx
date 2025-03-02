import React from "react";
import TalentCard from "../FindTalent/TalentCard";
import { useParams } from "react-router-dom";

function RecommendedTalent(props: any) {
  const { id } = useParams();
  return (
    <div>
      <div className="tetx-xl font-semibold mb-5">Recommended Talent</div>
      <div className="flex flex-col flex-wrap gap-5">
        {props?.talents?.map(
          (talent: any, index: any) =>
            index < 4 &&
            id != talent.id && <TalentCard key={index} {...talent} />
        )}
      </div>
    </div>
  );
}

export default RecommendedTalent;
