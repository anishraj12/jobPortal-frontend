import React from "react";
import { similar } from "../Data/Company";
import CompanyCard from "./CompanyCard";

function SimilarCompanies() {
  return (
    <div className="w-1/4">
      <div className="tetx-xl font-semibold mb-5">Similar Companies</div>
      <div className="flex flex-col flex-wrap gap-5">
        {similar.map((company, index) => (
          <CompanyCard key={index} {...company}></CompanyCard>
        ))}
      </div>
    </div>
  );
}

export default SimilarCompanies;
