import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import { Divider } from "@mantine/core";
import Findjobs from "./Findjobs";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import JobHistoryPage from "./JobHistoryPage";
import PostedJobPage from "./PostedJobPage";
import CompanyPage from "./CompanyPage";
import PostJobPage from "./PostJobPage";
import ApplyJobPAge from "./ApplyJobPAge";
import JobDescPage from "./JobDescPage";
import FindTalentPAge from "./FindTalentPAge";
import TalentProfilePage from "./TalentProfilePage";
import HomePage from "./HomePage";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import ProtectedRoute from "../Services/ProtectedRoute";
import PublicRoute from "../Services/PublicRoute";

function AppRoutes() {
  const user = useSelector((state: any) => state.user);
  return (
    <BrowserRouter>
      <div className="relative">
        <Header></Header>
        <Divider size="xs"></Divider>

        <Routes>
          <Route path="/find-jobs" element={<Findjobs></Findjobs>}></Route>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage></SignUpPage>
              </PublicRoute>
            }
          ></Route>
          <Route path="/login" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
          <Route
            path="/job-history"
            element={
              <ProtectedRoute allowedRoles={["APPLICANT"]}>
                <JobHistoryPage></JobHistoryPage>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/posted-jobs/:id"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostedJobPage></PostedJobPage>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/company/:name"
            element={<CompanyPage></CompanyPage>}
          ></Route>
          <Route
            path="/post-job/:id"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostJobPage></PostJobPage>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/apply-job/:id"
            element={<ApplyJobPAge></ApplyJobPAge>}
          ></Route>
          <Route path="/jobs/:id" element={<JobDescPage></JobDescPage>}></Route>
          <Route
            path="/find-talent"
            element={<FindTalentPAge></FindTalentPAge>}
          ></Route>
          <Route
            path="/talent-profile/:id"
            element={<TalentProfilePage></TalentProfilePage>}
          ></Route>
          <Route path="*" element={<HomePage></HomePage>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
