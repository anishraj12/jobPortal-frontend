import React, { useEffect, useState } from "react";
import Sort from "../Findjobs/Sort";
import TalentCard from "./TalentCard";
import { talents } from "../Data/TalentData";
import { getAllProfiles } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";

function Talents() {
  const dispatch = useDispatch();
  const sort = useSelector((state: any) => state.sort);

  const [talents, setTalents] = useState<any>([]);
  const filter = useSelector((state: any) => state.filter);
  const [filteredTalents, setFilteredTalents] = useState<any>([]);
  useEffect(() => {
    if (sort == "Experience: Low to High") {
      setTalents(
        [...talents].sort((a: any, b: any) => a.totalExp - b.totalExp)
      );
    } else if (sort == "Experience: High to Low") {
      setTalents(
        [...talents].sort((a: any, b: any) => b.totalExp - a.totalExp)
      );
    }
  }, [sort]);
  useEffect(() => {
    let filtereTalent = talents;
    if (filter.name) {
      filtereTalent = filtereTalent.filter((talent: any) =>
        talent.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filtereTalent = filtereTalent.filter((talent: any) =>
        filter["Job Title"]?.some((title: any) =>
          talent.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );
    }
    if (filter.Locaction && filter.Locaction.length > 0) {
      filtereTalent = filtereTalent.filter((talent: any) =>
        filter.Location?.some((location: any) =>
          talent.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    if (filter.Skills && filter.Skills.length > 0) {
      filtereTalent = filtereTalent.filter((talent: any) =>
        filter.Skills?.some((skill: any) =>
          talent.skills?.some((talentSkill: any) =>
            talentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    if (filter.exp && filter.exp.length > 0) {
      filtereTalent = filtereTalent.filter(
        (talent: any) =>
          filter.exp[0] <= talent.totalExp && talent.totalExp <= filter.exp[1]
      );
    }
    setFilteredTalents(filtereTalent);
  }, [filter, talents]);
  useEffect(() => {
    dispatch(resetFilter());

    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Talents</div>
        <Sort></Sort>
      </div>
      <div className="flex flex-wrap mt-10 gap-5 justify-between">
        {filteredTalents?.length ? (
          filteredTalents.map((talent: any, index: any) => (
            <TalentCard key={index} {...talent}></TalentCard>
          ))
        ) : (
          <div className="text-xl font-semibold">No Talents Found.</div>
        )}
      </div>
    </div>
  );
}

export default Talents;
