import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";

function CompanyPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-poppins p-4">
      <Button
        my="md"
        onClick={() => navigate(-1)}
        leftSection={<IconArrowLeft size={20}></IconArrowLeft>}
        color="brightSun.4"
        variant="light"
      >
        Back
      </Button>

      <div className="flex gap-5 justify-between">
        <Company></Company>
        <SimilarCompanies></SimilarCompanies>
      </div>
    </div>
  );
}

export default CompanyPage;
