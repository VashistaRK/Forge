import axios from "axios";
import type { AxiosInstance } from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// const axiosClient: AxiosInstance = axios.create({
//   baseURL: "http://localhost:1337/api",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${API_KEY}`,
//   },
// });

const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${API_KEY}`;
  }
  return config;
});

interface ResumeData {
  data: Record<string, unknown>; // Accepts dynamic fields like name, phone, etc.
}

const CreateNewResume = (data: ResumeData) =>
  axiosClient.post("/user-resumes", data);

const GetUserResumes = (userEmail: string) =>
  axiosClient.get(
    `/user-resumes?filters[userEmail][$eq]=${encodeURIComponent(userEmail)}`
  );

const UpdateResumeDetails = (id: string, data: ResumeData) => {
  console.log("Updating resume ID:", id, "with data:", data);
  return axiosClient.put(`/user-resumes/${id}`, data);
};

const GetResumeById = (id: string) =>
  axiosClient.get(`/user-resumes/${id}?populate=*`);

const GetOther = (id: string) =>
  axiosClient.get(`/user-resumes/${id}?populate[skills][populate][other]=*`);

// axiosClient.get(`/user-resumes/${id}?populate=deep,5`);

const DeleteResumeById = (id: string) =>
  axiosClient.delete(`/user-resumes/${id}`);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetails,
  GetResumeById,
  GetOther,
  DeleteResumeById,
};
