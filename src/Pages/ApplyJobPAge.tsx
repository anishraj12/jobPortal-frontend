import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";
import { getJob } from "../Services/JobService";

function ApplyJobPAge() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    getJob(id)
      .then((res) => {
        setJob(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-poppins p-4">
      <Button
        my="sm"
        leftSection={<IconArrowLeft size={20}></IconArrowLeft>}
        onClick={() => navigate(-1)}
        color="brightSun.4"
        variant="light"
      >
        Back
      </Button>
      <ApplyJobComp {...job}></ApplyJobComp>
    </div>
  );
}

export default ApplyJobPAge;
