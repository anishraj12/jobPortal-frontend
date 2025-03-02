import React from "react";

import DreamJob from "../LandingPage/DreamJob";
import Companies from "../LandingPage/Companies";
import JobCategory from "../LandingPage/JobCategory";
import Working from "../LandingPage/Working";
import Testimonials from "../LandingPage/Testimonials";
import Subscribe from "../LandingPage/Subscribe";

function HomePage() {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-poppins ">
      <DreamJob></DreamJob>
      <Companies></Companies>
      <JobCategory></JobCategory>
      <Working></Working>
      <Testimonials></Testimonials>
      <Subscribe></Subscribe>
    </div>
  );
}

export default HomePage;
