import axios from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";
const base_url = "http://localhost:8080/jobs/";

const postJob = async (job: any) => {
  return axiosInstance
    .post(`/jobs/post`, job)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const getAllJobs = async () => {
  return axiosInstance
    .get(`/jobs/getAll`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const getJob = async (id: any) => {
  return axiosInstance
    .get(`/jobs/get/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const applyJob = async (id: any, applicant: any) => {
  return axiosInstance
    .post(`/jobs/apply/${id}`, applicant)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const getJobPostedBy = async (id: any) => {
  return axiosInstance
    .get(`/jobs/postedBy/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const changeAppStatus = async (application: any) => {
  return axiosInstance
    .post(`/jobs/changeAppStatus`, application)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export {
  postJob,
  getAllJobs,
  getJob,
  applyJob,
  getJobPostedBy,
  changeAppStatus,
};
